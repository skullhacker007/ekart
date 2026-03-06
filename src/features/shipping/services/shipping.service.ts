/**
 * Shipping Service — business logic for shipment lifecycle.
 * Called automatically on payment capture and by admin shipment update routes.
 */
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { logger } from '@/src/lib/services/logger';
import { queue } from '@/src/lib/queue/queueClient';
import { updateOrderStatus } from '@/src/features/orders/order.service';
import { OrderStatus } from '@prisma/client';
import {
  dbCreateShipment,
  dbGetShipmentByOrder,
  dbGetShipmentById,
  dbUpdateShipmentStatus,
  dbAddTrackingEvent,
} from './shipping.repository';

const VALID_STATUSES = [
  'PENDING', 'PACKED', 'PICKED_UP', 'IN_TRANSIT',
  'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'RETURNED',
];

/** Called automatically when payment is captured — idempotent. */
export async function createShipment(orderId: string, carrier = 'TBD', tracking?: string) {
  const existing = await dbGetShipmentByOrder(orderId);
  if (existing) return existing; // safe to return — idempotent

  const shipment = await dbCreateShipment(orderId, carrier, tracking);
  logger.info('Shipment created', { shipmentId: shipment.id, orderId });
  return shipment;
}

/** Fetch shipment + full tracking timeline for a given order (user-facing). */
export async function getShipmentByOrder(orderId: string) {
  const shipment = await dbGetShipmentByOrder(orderId);
  if (!shipment) throw new NotFoundError('Shipment');
  return shipment;
}

/** Fetch shipment by ID (admin use). */
export async function getShipmentById(shipmentId: string) {
  const shipment = await dbGetShipmentById(shipmentId);
  if (!shipment) throw new NotFoundError('Shipment');
  return shipment;
}

/**
 * Admin: update shipment status, optionally set tracking number, and append a timeline event.
 * Also syncs the parent order status for key milestones (SHIPPED, DELIVERED).
 */
export async function updateTracking(
  shipmentId: string,
  status: string,
  tracking?: string,
  location?: string
) {
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError(`Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`, 400);
  }

  const shipment = await dbGetShipmentById(shipmentId);
  if (!shipment) throw new NotFoundError('Shipment');

  await dbUpdateShipmentStatus(shipmentId, status, tracking);
  const event = await dbAddTrackingEvent(shipmentId, status, location);

  // Sync order-level status for key milestones
  if (status === 'SHIPPED') {
    await updateOrderStatus(shipment.orderId, OrderStatus.SHIPPED);
    await queue.enqueue('send-shipment-update', { shipmentId, orderId: shipment.orderId, status });
  }

  if (status === 'DELIVERED') {
    await updateOrderStatus(shipment.orderId, OrderStatus.DELIVERED);
    await queue.enqueue('send-shipment-update', { shipmentId, orderId: shipment.orderId, status });
  }

  logger.info('Shipment tracking updated', { shipmentId, status, location });
  return { shipmentId, status, tracking, event };
}
