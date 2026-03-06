/**
 * Review Repository — Prisma queries for product reviews.
 */
import { prisma } from '@/src/lib/db/prisma';
import { cursorPagination, buildCursorPage } from '@/src/lib/utils/pagination';

export async function dbGetUserReviewForProduct(userId: string, productId: string) {
  return prisma.review.findFirst({ where: { userId, productId } });
}

export async function dbCreateReview(
  userId: string,
  productId: string,
  rating: number,
  comment?: string
) {
  return prisma.review.create({
    data: { userId, productId, rating, comment: comment ?? null },
    include: {
      user: { select: { id: true, name: true } },
    },
  });
}

export async function dbGetReviewsByProduct(
  productId: string,
  limit = 20,
  cursor?: string
) {
  const args = cursorPagination({ limit, cursor });
  const items = await prisma.review.findMany({
    ...args,
    where: { productId },
    orderBy: { id: 'desc' },
    include: {
      user: { select: { id: true, name: true } },
    },
  });
  return buildCursorPage(items, limit);
}

export async function dbGetProductRatingSummary(productId: string) {
  const result = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return {
    average: result._avg.rating ?? 0,
    count: result._count.rating,
  };
}
