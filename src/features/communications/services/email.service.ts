/**
 * Email Service — all transactional and promotional emails.
 * All sends are dispatched via the background queue (non-blocking).
 * In production, replace the console.log stubs with Resend / SendGrid / Nodemailer calls.
 */
import { queue } from '@/src/lib/queue/queueClient';
import { logger } from '@/src/lib/services/logger';

// ── Register all email job handlers on startup ────────────────────────────

queue.register('send-order-confirmation', async ({ orderId }) => {
  // TODO: fetch order details from DB and send via Resend/SendGrid
  logger.info('Sending order confirmation email', { orderId });
});

queue.register('send-shipment-update', async ({ orderId, status }) => {
  logger.info('Sending shipment update email', { orderId, status });
});

queue.register('send-offer-email', async ({ subject, to }) => {
  logger.info('Sending offer email', { to, subject });
});

queue.register('send-new-arrival-email', async ({ productSlug }) => {
  logger.info('Sending new arrival email', { productSlug });
});

// ── Public helpers (dispatch to queue) ────────────────────────────────────

export async function sendOrderConfirmation(orderId: string) {
  return queue.enqueue('send-order-confirmation', { orderId });
}

export async function sendShipmentUpdate(orderId: string, status: string) {
  return queue.enqueue('send-shipment-update', { orderId, status });
}

export async function sendOfferBlast(to: string[], subject: string, body: string) {
  for (const email of to) {
    await queue.enqueue('send-offer-email', { to: email, subject, body });
  }
}

export async function sendNewArrivalNotification(productSlug: string) {
  return queue.enqueue('send-new-arrival-email', { productSlug });
}
