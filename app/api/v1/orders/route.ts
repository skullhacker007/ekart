import { NextRequest } from 'next/server';
import { getMyOrders, createOrder } from '@/src/features/orders/order.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { z } from 'zod';

function getUserId(req: NextRequest): string {
  const userId = req.headers.get('x-user-id');
  if (!userId) throw new AppError('Authentication required', 401);
  return userId;
}

const createOrderSchema = z.object({
  idempotencyKey: z.string().uuid('Invalid idempotency key'),
  items: z.array(
    z.object({
      variantId: z.string().uuid(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1),
  total: z.number().positive(),
});

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get current user's order history (paginated)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated list of orders
 */
export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') ?? 20);
    const cursor = searchParams.get('cursor') ?? undefined;
    const orders = await getMyOrders(userId, limit, cursor);
    return successResponse(orders);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch orders', 500);
  }
}

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order (must be preceded by /checkout)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idempotencyKey, items, total]
 *             properties:
 *               idempotencyKey:
 *                 type: string
 *                 format: uuid
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               total:
 *                 type: number
 */
export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = await req.json();
    const input = createOrderSchema.parse(body);
    const order = await createOrder({ ...input, userId });
    return successResponse(order, 201);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Order creation failed', 500);
  }
}
