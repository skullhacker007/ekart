import { NextRequest } from 'next/server';
import { initiatePayment, capturePayment, refundPayment } from '@/src/features/payments/services/payment.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { z } from 'zod';

const initiateSchema = z.object({
  orderId: z.string().uuid(),
  method: z.enum(['CARD', 'UPI', 'NETBANKING', 'COD', 'WALLET']),
  amount: z.number().positive(),
  idempotencyKey: z.string().uuid('Idempotency key must be a UUID'),
});

const captureSchema = z.object({
  paymentId: z.string().uuid(),
  gatewayRef: z.string().min(1),
  orderId: z.string().uuid(),
});

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Initiate or capture a payment (action determined by body.action)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action]
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [initiate, capture, refund]
 *     responses:
 *       200:
 *         description: Payment action performed
 *       400:
 *         description: Validation error
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ...rest } = body;

    if (action === 'initiate') {
      const input = initiateSchema.parse(rest);
      const payment = await initiatePayment(input);
      return successResponse(payment, 201);
    }

    if (action === 'capture') {
      const input = captureSchema.parse(rest);
      const payment = await capturePayment(input.paymentId, input.gatewayRef, input.orderId);
      return successResponse(payment);
    }

    if (action === 'refund') {
      const { paymentId, amount } = z.object({ paymentId: z.string().uuid(), amount: z.number().positive() }).parse(rest);
      const payment = await refundPayment(paymentId, amount);
      return successResponse(payment);
    }

    return errorResponse('Invalid payment action. Use: initiate | capture | refund', 400);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Payment operation failed', 500);
  }
}
