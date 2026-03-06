import { NextRequest } from 'next/server';
import { getShipmentByOrder } from '@/src/features/shipping/services/shipping.service';
import { getOrderById } from '@/src/features/orders/order.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';

/**
 * @swagger
 * /api/v1/orders/{orderId}/shipment:
 *   get:
 *     summary: Get shipment status and tracking timeline for an order
 *     tags: [Shipping, Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Shipment with tracking events
 *       404:
 *         description: Shipment not found
 *       403:
 *         description: Access denied
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Authentication required', 401);

    const { orderId } = await params;

    // Ensure user owns the order before exposing shipment details
    await getOrderById(orderId, userId);

    const shipment = await getShipmentByOrder(orderId);
    return successResponse(shipment);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch shipment', 500);
  }
}
