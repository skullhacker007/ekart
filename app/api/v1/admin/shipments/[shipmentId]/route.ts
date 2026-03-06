import { NextRequest } from 'next/server';
import { getShipmentById, updateTracking } from '@/src/features/shipping/services/shipping.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { z } from 'zod';

const updateShipmentSchema = z.object({
  status: z.string().min(1, 'Status is required'),
  tracking: z.string().optional(),
  location: z.string().optional(),
});

/**
 * @swagger
 * /api/v1/admin/shipments/{shipmentId}:
 *   get:
 *     summary: Admin — get full shipment details
 *     tags: [Shipping, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Shipment with tracking events
 *       404:
 *         description: Not found
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params;
    const shipment = await getShipmentById(shipmentId);
    return successResponse(shipment);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch shipment', 500);
  }
}

/**
 * @swagger
 * /api/v1/admin/shipments/{shipmentId}:
 *   patch:
 *     summary: Admin — update shipment status and append a tracking event
 *     tags: [Shipping, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PACKED, PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED, FAILED, RETURNED]
 *               tracking:
 *                 type: string
 *                 description: Carrier tracking number
 *               location:
 *                 type: string
 *                 description: Current location description
 *     responses:
 *       200:
 *         description: Shipment updated
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Shipment not found
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params;
    const body = await req.json();
    const { status, tracking, location } = updateShipmentSchema.parse(body);
    const result = await updateTracking(shipmentId, status, tracking, location);
    return successResponse(result);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to update shipment', 500);
  }
}
