/**
 * Payment Service — business logic for payment lifecycle.
 * All operations are fully idempotent via unique idempotency keys.
 */
import { NotFoundError } from '@/src/lib/errors/AppError';
import { logger } from '@/src/lib/services/logger';
import { queue } from '@/src/lib/queue/queueClient';
import { dbCreatePayment, dbCapturePayment, dbRefundPayment, dbGetPaymentByOrder } from './payment.repository';
import { updateOrderStatus } from '@/src/features/orders/order.service';
import { OrderStatus } from '@prisma/client';

export async function initiatePayment(data: {
  orderId: string; method: string; amount: number; idempotencyKey: string;
}) {
  const payment = await dbCreatePayment(data);
  logger.info('Payment initiated', { paymentId: payment.id, orderId: data.orderId });
  return payment;
}

export async function capturePayment(paymentId: string, gatewayRef: string, orderId: string) {
  const payment = await dbCapturePayment(paymentId, gatewayRef);
  // Update order status to CONFIRMED after successful payment
  await updateOrderStatus(orderId, OrderStatus.CONFIRMED);
  // Fire order confirmation email via background queue
  await queue.enqueue('send-order-confirmation', { orderId, paymentId });
  logger.info('Payment captured', { paymentId, orderId });
  return payment;
}

export async function refundPayment(paymentId: string, amount: number) {
  const payment = await dbRefundPayment(paymentId, amount);
  logger.info('Payment refunded', { paymentId, amount });
  return payment;
}

export async function getPaymentByOrder(orderId: string) {
  const payment = await dbGetPaymentByOrder(orderId);
  if (!payment) throw new NotFoundError('Payment');
  return payment;
}
