/**
 * Review Service — business logic for product reviews.
 */
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { prisma } from '@/src/lib/db/prisma';
import {
  dbCreateReview,
  dbGetReviewsByProduct,
  dbGetUserReviewForProduct,
  dbGetProductRatingSummary,
} from './review.repository';

export async function submitReview(
  userId: string,
  productId: string,
  rating: number,
  comment?: string
) {
  // 1. Validate rating
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    throw new AppError('Rating must be an integer between 1 and 5', 400);
  }

  // 2. Ensure product exists
  const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
  if (!product) throw new NotFoundError('Product');

  // 3. Prevent duplicate reviews
  const existing = await dbGetUserReviewForProduct(userId, productId);
  if (existing) throw new AppError('You have already reviewed this product', 409);

  return dbCreateReview(userId, productId, rating, comment);
}

export async function getProductReviews(productId: string, limit?: number, cursor?: string) {
  return dbGetReviewsByProduct(productId, limit, cursor);
}

export async function getProductRatingSummary(productId: string) {
  return dbGetProductRatingSummary(productId);
}
