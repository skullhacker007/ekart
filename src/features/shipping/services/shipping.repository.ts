/**
 * Shipping Repository — Prisma queries for Shipment and ShipmentTracking.
 */
import { prisma } from '@/src/lib/db/prisma';

export async function dbCreateShipment(
  orderId: string,
  carrier: string,
  tracking?: string
) {
  return prisma.shipment.create({
    data: {
      orderId,
      carrier,
      tracking: tracking ?? null,
      status: 'PENDING',
    },
    include: { trackingEvents: true },
  });
}

export async function dbGetShipmentByOrder(orderId: string) {
  return prisma.shipment.findUnique({
    where: { orderId },
    include: {
      trackingEvents: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

export async function dbGetShipmentById(shipmentId: string) {
  return prisma.shipment.findUnique({
    where: { id: shipmentId },
    include: {
      trackingEvents: { orderBy: { createdAt: 'asc' } },
      order: { select: { userId: true, status: true } },
    },
  });
}

export async function dbUpdateShipmentStatus(
  shipmentId: string,
  status: string,
  tracking?: string
) {
  return prisma.shipment.update({
    where: { id: shipmentId },
    data: {
      status,
      ...(tracking ? { tracking } : {}),
    },
  });
}

export async function dbAddTrackingEvent(
  shipmentId: string,
  status: string,
  location?: string
) {
  return prisma.shipmentTracking.create({
    data: { shipmentId, status, location: location ?? null },
  });
}
