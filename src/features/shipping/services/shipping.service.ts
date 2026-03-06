/**
 * Shipping Service — shipment creation and tracking updates.
 */
import { prisma } from '@/src/lib/db/prisma';
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { logger } from '@/src/lib/services/logger';
import { updateOrderStatus } from '@/src/features/orders/order.service';
import { queue } from '@/src/lib/queue/queueClient';
import { OrderStatus } from '@prisma/client';

export async function createShipment(data: {
  orderId: string; carrier: string; tracking?: string;
}) {
  const existing = await prisma.shipment.findUnique({ where: { orderId: data.orderId } });
  if (existing) throw new AppError('Shipment already exists for this order', 409);

  const shipment = await prisma.shipment.create({
    data: { orderId: data.orderId, carrier: data.carrier, tracking: data.tracking, status: 'PROCESSING' },
  });
  await updateOrderStatus(data.orderId, OrderStatus.PACKED);
  logger.info('Shipment created', { shipmentId: shipment.id, orderId: data.orderId });
  return shipment;
}

export async function updateTracking(shipmentId: string, status: string, location?: string) {
  const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } });
  if (!shipment) throw new NotFoundError('Shipment');

  await prisma.$transaction(async (tx) => {
    await tx.shipment.update({ where: { id: shipmentId }, data: { status } });
    await tx.shipmentTracking.create({ data: { shipmentId, status, location } });
  });

  // Notify user via email when shipped or delivered
  if (status === 'SHIPPED' || status === 'DELIVERED') {
    await queue.enqueue('send-shipment-update', { orderId: shipment.orderId, status });
    if (status === 'SHIPPED') await updateOrderStatus(shipment.orderId, OrderStatus.SHIPPED);
    if (status === 'DELIVERED') await updateOrderStatus(shipment.orderId, OrderStatus.DELIVERED);
  }

  return prisma.shipment.findUnique({ where: { id: shipmentId }, include: { trackingEvents: true } });
}

export async function getShipmentByOrder(orderId: string) {
  const shipment = await prisma.shipment.findUnique({
    where: { orderId },
    include: { trackingEvents: { orderBy: { createdAt: 'desc' } } },
  });
  if (!shipment) throw new NotFoundError('Shipment');
  return shipment;
}
