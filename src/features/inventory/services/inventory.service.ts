/**
 * Inventory Service — stock tracking and reservation logic.
 */
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { InventoryMovementType } from '@prisma/client';
import {
  dbGetAvailableStock, dbReserveStock, dbReleaseStock,
  dbAdjustStock, dbGetInventory,
} from './inventory.repository';

export async function getStock(variantId: string) {
  const inv = await dbGetInventory(variantId);
  if (!inv) throw new NotFoundError('Inventory record');
  return { stock: inv.stock, reserved: inv.reserved, available: inv.stock - inv.reserved };
}

export async function checkAvailability(variantId: string, quantity: number): Promise<boolean> {
  const available = await dbGetAvailableStock(variantId);
  return available >= quantity;
}

export async function reserveStock(variantId: string, quantity: number) {
  try {
    return await dbReserveStock(variantId, quantity);
  } catch (err) {
    throw new AppError(err instanceof Error ? err.message : 'Stock reservation failed', 409);
  }
}

export async function releaseStock(variantId: string, quantity: number) {
  return dbReleaseStock(variantId, quantity);
}

export async function addStock(variantId: string, quantity: number) {
  return dbAdjustStock(variantId, quantity, InventoryMovementType.STOCK_IN);
}
