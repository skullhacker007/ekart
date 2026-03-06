import { NextRequest } from 'next/server';
import { prepareCheckout } from '@/src/features/checkout/services/checkout.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';


function getUserId(req: NextRequest): string {
  const userId = req.headers.get('x-user-id');
  if (!userId) throw new AppError('Authentication required', 401);
  return userId;
}

/**
 * @swagger
 * /api/v1/checkout:
 *   post:
 *     summary: Validate cart and prepare checkout session (returns idempotencyKey + total)
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout session with total and idempotency key
 *       400:
 *         description: Empty cart
 *       409:
 *         description: Stock unavailable for one or more items
 */
export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const session = await prepareCheckout(userId);
    return successResponse(session);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Checkout preparation failed', 500);
  }
}
