/**
 * Checkout Service — validates the cart and prepares an order summary.
 * This is the critical "gate" before order creation:
 *   1. Ensures cart is not empty.
 *   2. Validates each item's price against the DB (prevents price manipulation).
 *   3. Checks live inventory availability.
 *   4. Returns a total and an idempotency key for the subsequent order creation call.
 */
import { randomUUID } from "crypto";
import { prisma } from "@/src/lib/db/prisma";
import { AppError } from "@/src/lib/errors/AppError";
import { checkAvailability } from "@/src/features/inventory/services/inventory.service";

export interface CheckoutSession {
  idempotencyKey: string;
  items: { variantId: string; quantity: number; unitPrice: number }[];
  total: number;
}

export async function prepareCheckout(
  userId: string,
): Promise<CheckoutSession> {
  // 1. Load cart
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { variant: true },
  });

  if (cartItems.length === 0) {
    throw new AppError("Your cart is empty", 400);
  }

  // 2. Validate each item: price integrity + stock availability
  const validationErrors: string[] = [];
  const lineItems: CheckoutSession["items"] = [];

  // Batch-fetch inventories for all variants in cart to avoid N roundtrips
  const variantIds = cartItems.map((c) => c.variantId);
  const inventories =
    await import("@/src/features/inventory/services/inventory.repository").then(
      (m) => m.dbGetInventoriesByVariantIds(Array.from(new Set(variantIds))),
    );

  const invMap = new Map(inventories.map((i: any) => [i.variantId, i]));

  for (const item of cartItems) {
    const unitPrice = item.variant.price;
    const inv = invMap.get(item.variantId);
    const available = inv ? Math.max(0, inv.stock - inv.reserved) : 0;

    if (available < item.quantity) {
      validationErrors.push(
        `"${item.variantId}" does not have enough stock (requested: ${item.quantity})`,
      );
      continue;
    }

    lineItems.push({
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice,
    });
  }

  if (validationErrors.length > 0) {
    throw new AppError(`Checkout failed: ${validationErrors.join("; ")}`, 409);
  }

  // 3. Calculate total
  const total = lineItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  // 4. Generate idempotency key — ties checkout session to order creation
  const idempotencyKey = randomUUID();

  return { idempotencyKey, items: lineItems, total };
}
