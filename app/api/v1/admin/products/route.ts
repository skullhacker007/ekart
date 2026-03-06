import { NextRequest } from 'next/server';
import { createProduct, updateProduct, deleteProduct, listProducts, listCategories, listBrands } from '@/src/features/catalog/services/catalog.service';
import { updateOrderStatus } from '@/src/features/orders/order.service';
import { addStock } from '@/src/features/inventory/services/inventory.service';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { createProductSchema, productQuerySchema } from '@/src/features/catalog/catalog.schema';
import { OrderStatus, InventoryMovementType } from '@prisma/client';
import { z } from 'zod';

function getRole(req: NextRequest): string {
  return req.headers.get('x-user-role') ?? 'USER';
}

function requireAdmin(req: NextRequest) {
  if (getRole(req) !== 'ADMIN') throw new AppError('Admin access required', 403);
}

/**
 * @swagger
 * /api/v1/admin/products:
 *   get:
 *     summary: Admin — list all products with full filtering
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const query = productQuerySchema.parse(Object.fromEntries(searchParams));
    const products = await listProducts(query);
    return successResponse(products);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch products', 500);
  }
}

/**
 * @swagger
 * /api/v1/admin/products:
 *   post:
 *     summary: Admin — create a new product
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const body = await req.json();
    const input = createProductSchema.parse(body);
    const product = await createProduct(input);
    return successResponse(product, 201);
  } catch (err) {
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to create product', 500);
  }
}
