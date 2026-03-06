/**
 * Inventory Service — stock tracking and reservation logic.
 * Fetches the inventory record once and passes it to the repository
 * to avoid redundant DB roundtrips.
 */
import { AppError, NotFoundError } from '@/src/lib/errors/AppError';
import { InventoryMovementType } from '@prisma/client';
import {
  dbGetAvailableStock, dbGetInventory, dbReserveStock, dbReleaseStock, dbAdjustStock,
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

/**
 * Reserve stock — fetches inventory once and passes it directly to the repo.
 * Throws 409 if stock is insufficient or no record found.
 */
export async function reserveStock(variantId: string, quantity: number) {
  const inv = await dbGetInventory(variantId);
  if (!inv) throw new AppError(`No inventory record for variant ${variantId}`, 409);
  try {
    return await dbReserveStock(inv, quantity);
  } catch (err) {
    throw new AppError(err instanceof Error ? err.message : 'Stock reservation failed', 409);
  }
}

export async function releaseStock(variantId: string, quantity: number) {
  return dbReleaseStock(variantId, quantity);
}

/**
 * Add stock — fetches inventory once, then writes via repo.
 */
export async function addStock(variantId: string, quantity: number) {
  const inv = await dbGetInventory(variantId);
  if (!inv) throw new AppError(`No inventory record for variant ${variantId}`, 404);
  return dbAdjustStock(inv, quantity, InventoryMovementType.STOCK_IN);
}

