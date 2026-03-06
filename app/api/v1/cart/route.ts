import { NextRequest } from 'next/server';
import { getCart, addToCart, clearCart } from '@/src/features/cart/cart.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { z } from 'zod';

const addItemSchema = z.object({
  variantId: z.string().uuid('Invalid variant ID'),
  quantity: z.coerce.number().int().positive().default(1),
});

/** Helper to extract userId forwarded by middleware */
function getUserId(req: NextRequest): string {
  const userId = req.headers.get('x-user-id');
  if (!userId) throw new AppError('Authentication required', 401);
  return userId;
}

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart contents with total
 */
export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const cart = await getCart(userId);
    return successResponse(cart);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch cart', 500);
  }
}

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [variantId]
 *             properties:
 *               variantId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 default: 1
 */
export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = await req.json();
    const { variantId, quantity } = addItemSchema.parse(body);
    const item = await addToCart(userId, variantId, quantity);
    return successResponse(item, 201);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to add item to cart', 500);
  }
}

/**
 * @swagger
 * /api/v1/cart:
 *   delete:
 *     summary: Clear the entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserId(req);
    await clearCart(userId);
    return successResponse({ message: 'Cart cleared' });
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to clear cart', 500);
  }
}
