import { NextRequest } from 'next/server';
import {
  submitReview,
  getProductReviews,
  getProductRatingSummary,
} from '@/src/features/reviews/services/review.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { z } from 'zod';

const submitReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

/**
 * @swagger
 * /api/v1/products/{productId}/reviews:
 *   get:
 *     summary: Get paginated reviews for a product (public)
 *     tags: [Reviews, Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of reviews with rating summary
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') ?? 20);
    const cursor = searchParams.get('cursor') ?? undefined;

    const [reviews, summary] = await Promise.all([
      getProductReviews(productId, limit, cursor),
      getProductRatingSummary(productId),
    ]);

    return successResponse({ ...reviews, summary });
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch reviews', 500);
  }
}

/**
 * @swagger
 * /api/v1/products/{productId}/reviews:
 *   post:
 *     summary: Submit a review for a product (auth required)
 *     tags: [Reviews, Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
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
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Auth required
 *       409:
 *         description: Already reviewed this product
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return errorResponse('Authentication required', 401);

    const { productId } = await params;
    const body = await req.json();
    const { rating, comment } = submitReviewSchema.parse(body);

    const review = await submitReview(userId, productId, rating, comment);
    return successResponse(review, 201);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to submit review', 500);
  }
}
