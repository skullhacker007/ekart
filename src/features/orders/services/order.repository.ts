/**
 * Order Repository — Prisma queries for orders.
 */
import { prisma } from '@/src/lib/db/prisma';
import { OrderStatus } from '@prisma/client';
import { cursorPagination, buildCursorPage } from '@/src/lib/utils/pagination';

export async function dbCreateOrder(data: {
  userId: string;
  total: number;
  idempotencyKey: string;
  items: { variantId: string; quantity: number; price: number }[];
}) {
  // Check idempotency — return existing order if key was already used
  const existing = await prisma.order.findUnique({
    where: { idempotencyKey: data.idempotencyKey },
    include: { items: true },
  });
  if (existing) return existing; // safe to return — idempotent

  return prisma.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      status: OrderStatus.PENDING,
      idempotencyKey: data.idempotencyKey,
      items: {
        create: data.items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });
}

export async function dbGetOrdersByUser(userId: string, limit = 20, cursor?: string) {
  const args = cursorPagination({ limit, cursor });
  const items = await prisma.order.findMany({
    ...args,
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: { include: { variant: { include: { product: true } } } },
      payments: { select: { status: true, method: true } },
      shipment: { select: { status: true, tracking: true } },
    },
  });
  return buildCursorPage(items, limit);
}

export async function dbGetOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { variant: { include: { product: { include: { images: { take: 1 } } } } } } },
      payments: true,
      shipment: { include: { trackingEvents: true } },
    },
  });
}

export async function dbUpdateOrderStatus(orderId: string, status: OrderStatus) {
  return prisma.order.update({ where: { id: orderId }, data: { status } });
}