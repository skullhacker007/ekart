/**
 * Inventory Repository — Prisma queries for stock management.
 */
import { prisma } from '@/src/lib/db/prisma';
import { InventoryMovementType } from '@prisma/client';

export async function dbGetInventory(variantId: string) {
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

export async function dbReserveStock(variantId: string, quantity: number) {
  const inv = await prisma.inventory.findFirst({ where: { variantId } });
  if (!inv) throw new Error(`No inventory record for variant ${variantId}`);
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

export async function dbReleaseStock(variantId: string, quantity: number) {
  const inv = await prisma.inventory.findFirst({ where: { variantId } });
  if (!inv) return;
  return prisma.inventory.update({
    where: { id: inv.id },
    data: { reserved: { decrement: quantity } },
  });
}

export async function dbAdjustStock(variantId: string, quantity: number, type: InventoryMovementType) {
  const inv = await prisma.inventory.findFirst({ where: { variantId } });
  if (!inv) throw new Error('No inventory record found');
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
