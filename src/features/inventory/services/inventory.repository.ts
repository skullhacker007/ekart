/**
 * Inventory Repository — Prisma queries for stock management.
 * NOTE: All write functions accept a pre-fetched inventory record to avoid
 * redundant DB roundtrips. Callers (service layer) are responsible for
 * fetching the record first via dbGetInventory / dbGetAvailableStock.
 */
import { prisma } from '@/src/lib/db/prisma';
import { InventoryMovementType } from '@prisma/client';

export type InventoryRecord = {
  id: string;
  variantId: string;
  warehouseId: string;
  stock: number;
  reserved: number;
};

export async function dbGetInventory(variantId: string): Promise<InventoryRecord | null> {
  return prisma.inventory.findFirst({
    where: { variantId },
    include: { warehouse: true },
  });
}

export async function dbGetAvailableStock(variantId: string): Promise<number> {
  const inv = await dbGetInventory(variantId);
  if (!inv) return 0;
  return Math.max(0, inv.stock - inv.reserved);
}

/** Reserve stock. Accepts pre-fetched inventory to avoid a second DB query. */
export async function dbReserveStock(inv: InventoryRecord, quantity: number) {
  if (inv.stock - inv.reserved < quantity) throw new Error('Insufficient stock');

  return prisma.$transaction(async (tx) => {
    const updated = await tx.inventory.update({
      where: { id: inv.id },
      data: { reserved: { increment: quantity } },
    });
    await tx.inventoryMovement.create({
      data: { inventoryId: inv.id, type: InventoryMovementType.STOCK_OUT, quantity },
    });
    return updated;
  });
}

/** Release reserved stock (e.g. cancellation). */
export async function dbReleaseStock(variantId: string, quantity: number) {
  const inv = await dbGetInventory(variantId);
  if (!inv) return;
  return prisma.inventory.update({
    where: { id: inv.id },
    data: { reserved: { decrement: quantity } },
  });
}

/** Adjust total stock (STOCK_IN / ADJUSTMENT / RETURN). Accepts pre-fetched inventory. */
export async function dbAdjustStock(inv: InventoryRecord, quantity: number, type: InventoryMovementType) {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.inventory.update({
      where: { id: inv.id },
      data: { stock: { increment: quantity } },
    });
    await tx.inventoryMovement.create({
      data: { inventoryId: inv.id, type, quantity },
    });
    return updated;
  });
}

