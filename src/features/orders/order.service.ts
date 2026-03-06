/**
 * Order Service — business logic for order lifecycle management.
 * Creates orders atomically, reserves stock, and clears the cart in a single transaction.
 */
import { prisma } from '@/src/lib/db/prisma';
import { OrderStatus } from '@prisma/client';
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { clearCart } from '@/src/features/cart/cart.service';
import { reserveStock } from '@/src/features/inventory/services/inventory.service';
import { logger } from '@/src/lib/services/logger';
import { dbCreateOrder, dbGetOrdersByUser, dbGetOrderById, dbUpdateOrderStatus } from './services/order.repository';

export interface CreateOrderInput {
  userId: string;
  idempotencyKey: string;
  items: { variantId: string; quantity: number; price: number }[];
  total: number;
}

/**
 * Create an order inside an atomic transaction:
 *  1. Create order + items in DB (idempotent via idempotencyKey)
 *  2. Reserve inventory for each item
 *  3. Clear the user's cart
 */
export async function createOrder(input: CreateOrderInput) {
  return prisma.$transaction(async () => {
    // This call is idempotent — returns existing order if key was used before
    const order = await dbCreateOrder({
      userId: input.userId,
      total: input.total,
      idempotencyKey: input.idempotencyKey,
      items: input.items,
    });

    // Reserve stock for each item (throws if stock is exhausted)
    await Promise.all(
      input.items.map((item) => reserveStock(item.variantId, item.quantity))
    );

    // Clear the user's cart after successful order placement
    await clearCart(input.userId);

    logger.info('Order created', { orderId: order.id, userId: input.userId, total: input.total });
    return order;
  });
}

export async function getMyOrders(userId: string, limit?: number, cursor?: string) {
  return dbGetOrdersByUser(userId, limit, cursor);
}

export async function getOrderById(orderId: string, userId: string) {
  const order = await dbGetOrderById(orderId);
  if (!order) throw new NotFoundError('Order');
  // Users can only view their own orders; admins bypass this in the admin API
  if (order.userId !== userId) throw new AppError('Access denied', 403);
  return order;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = await dbGetOrderById(orderId);
  if (!order) throw new NotFoundError('Order');
  const updated = await dbUpdateOrderStatus(orderId, status);
  logger.info('Order status updated', { orderId, status });
  return updated;
}
