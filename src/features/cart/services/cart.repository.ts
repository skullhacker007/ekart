/**
 * Cart Repository — Prisma queries for CartItem.
 */
import { prisma } from '@/src/lib/db/prisma';

export async function dbGetCart(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      variant: {
        include: { product: { include: { images: { take: 1 } } } },
      },
    },
  });
}

export async function dbGetCartItem(userId: string, variantId: string) {
  return prisma.cartItem.findFirst({ where: { userId, variantId } });
}

export async function dbUpsertCartItem(userId: string, variantId: string, quantity: number) {
  const existing = await dbGetCartItem(userId, variantId);
  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }
  return prisma.cartItem.create({ data: { userId, variantId, quantity } });
}

export async function dbUpdateCartItemQuantity(userId: string, variantId: string, quantity: number) {
  const item = await dbGetCartItem(userId, variantId);
  if (!item) return null;
  if (quantity <= 0) return prisma.cartItem.delete({ where: { id: item.id } });
  return prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
}

export async function dbRemoveCartItem(userId: string, variantId: string) {
  const item = await dbGetCartItem(userId, variantId);
  if (!item) return null;
  return prisma.cartItem.delete({ where: { id: item.id } });
}

export async function dbClearCart(userId: string) {
  return prisma.cartItem.deleteMany({ where: { userId } });
}
