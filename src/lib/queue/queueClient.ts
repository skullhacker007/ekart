/**
 * Background Job / Queue stub.
 * In development this runs jobs inline (synchronous).
 * In production, swap the `execute` call with a real queue (BullMQ / Inngest / Trigger.dev).
 *
 * Usage:
 *   import { queue } from '@/src/lib/queue/queueClient';
 *   await queue.enqueue('send-email', { to, subject, body });
 */

export type JobPayload = Record<string, unknown>;
export type JobHandler = (payload: JobPayload) => Promise<void>;

const handlers = new Map<string, JobHandler>();

export const queue = {
  /** Register a named handler */
  register(jobName: string, handler: JobHandler) {
    handlers.set(jobName, handler);
  },

  /** Enqueue a job – runs inline in dev, should push to queue in prod */
  async enqueue(jobName: string, payload: JobPayload) {
    const handler = handlers.get(jobName);
    if (!handler) {
      console.warn(`[Queue] No handler registered for job: ${jobName}`);
      return;
    }
    // TODO: In production, push to BullMQ / Inngest instead of executing inline
    try {
      await handler(payload);
    } catch (err) {
      console.error(`[Queue] Job ${jobName} failed:`, err);
    }
  },
};
