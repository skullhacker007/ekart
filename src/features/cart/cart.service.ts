/**
 * Cart Service — business logic for cart operations.
 * Validates stock availability before adding items.
 */
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { checkAvailability } from '@/src/features/inventory/services/inventory.service';
import {
  dbGetCart, dbUpsertCartItem, dbUpdateCartItemQuantity, dbRemoveCartItem, dbClearCart,
} from './services/cart.repository';

export async function getCart(userId: string) {
  const items = await dbGetCart(userId);
  const total = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  return { items, total, itemCount: items.length };
}

export async function addToCart(userId: string, variantId: string, quantity: number) {
  if (quantity < 1) throw new AppError('Quantity must be at least 1', 400);
  const inStock = await checkAvailability(variantId, quantity);
  if (!inStock) throw new AppError('Requested quantity is not available in stock', 409);
  return dbUpsertCartItem(userId, variantId, quantity);
}

export async function updateCartItem(userId: string, variantId: string, quantity: number) {
  if (quantity > 0) {
    const inStock = await checkAvailability(variantId, quantity);
    if (!inStock) throw new AppError('Requested quantity is not available in stock', 409);
  }
  const result = await dbUpdateCartItemQuantity(userId, variantId, quantity);
  if (result === null) throw new NotFoundError('Cart item');
  return result;
}

export async function removeFromCart(userId: string, variantId: string) {
  const result = await dbRemoveCartItem(userId, variantId);
  if (!result) throw new NotFoundError('Cart item');
  return result;
}

export async function clearCart(userId: string) {
  return dbClearCart(userId);
}
