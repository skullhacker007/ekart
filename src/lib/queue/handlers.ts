/**
 * Queue Handlers — register all background job handlers here.
 * Import this file once at app startup (e.g. in your root layout or a global initializer).
 *
 * In development, jobs execute inline (synchronous).
 * In production, replace with BullMQ / Inngest / Trigger.dev worker.
 */
import { queue } from './queueClient';
import { logger } from '@/src/lib/services/logger';

/**
 * Handler: send-order-confirmation
 * Triggered after payment is captured.
 */
queue.register('send-order-confirmation', async (payload) => {
  const { orderId, paymentId } = payload as { orderId: string; paymentId: string };
  // TODO: integrate with your email provider (Resend / SendGrid / Nodemailer)
  // Example: await sendEmail({ to: user.email, subject: 'Order Confirmed', template: 'order-confirmation', data: { orderId } });
  logger.info('[Queue] Order confirmation email queued', { orderId, paymentId });
});

/**
 * Handler: send-shipment-update
 * Triggered when admin updates shipment status to SHIPPED or DELIVERED.
 */
queue.register('send-shipment-update', async (payload) => {
  const { orderId, shipmentId, status } = payload as { orderId: string; shipmentId: string; status: string };
  // TODO: integrate with your email provider
  // Example: await sendEmail({ to: user.email, subject: `Your order is ${status}`, template: 'shipment-update', data: { orderId, status } });
  logger.info('[Queue] Shipment update email queued', { orderId, shipmentId, status });
});
