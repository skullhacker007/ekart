import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db/prisma';
import { productQuerySchema, createProductSchema } from '@/src/features/catalog/catalog.schema';
import { successResponse, errorResponse } from '@/src/lib/utils/response';
import { AppError } from '@/src/lib/errors/AppError';
import { ZodError } from 'zod';
import { cursorPagination, buildCursorPage } from '@/src/lib/utils/pagination';
import { Prisma } from '@prisma/client';

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get a paginated list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *       - in: query
 *         name: categoryId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: brandId
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: keyword
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [createdAt, name], default: createdAt }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *     responses:
 *       200:
 *         description: Paginated products list
 *       400:
 *         description: Validation error
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = productQuerySchema.parse(Object.fromEntries(searchParams));

    const { limit, cursor, categoryId, brandId, minPrice, maxPrice, keyword, sortBy, sortOrder } = query;

    // Build WHERE clause
    const where: Prisma.ProductWhereInput = {
      ...(categoryId ? { categoryId } : {}),
      ...(brandId ? { brandId } : {}),
      // Keyword search across name and description
      ...(keyword
        ? {
            OR: [
              { name: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
            ],
          }
        : {}),
      // Price filter on variants
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            variants: {
              some: {
                price: {
                  ...(minPrice !== undefined ? { gte: minPrice } : {}),
                  ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
                },
              },
            },
          }
        : {}),
    };

    const paginationArgs = cursorPagination({ limit, cursor });

    const products = await prisma.product.findMany({
      ...paginationArgs,
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        brand: { select: { id: true, name: true, slug: true } },
        images: { take: 1, orderBy: { position: 'asc' } },
        variants: {
          select: { id: true, sku: true, price: true },
          orderBy: { price: 'asc' },
          take: 10,
        },
      },
    });

    return successResponse(buildCursorPage(products, limit));
  } catch (err) {
    if (err instanceof ZodError) return errorResponse(err.issues[0].message, 400);
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to fetch products', 500);
  }
}

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products, Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               brandId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Slug already exists
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = createProductSchema.parse(body);

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug: input.slug } });
    if (existing) throw new AppError(`Slug "${input.slug}" is already taken`, 409);

    // Validate category exists
    const category = await prisma.category.findUnique({ where: { id: input.categoryId } });
    if (!category) throw new AppError('Category not found', 404);

    // Validate brand if provided
    if (input.brandId) {
      const brand = await prisma.brand.findUnique({ where: { id: input.brandId } });
      if (!brand) throw new AppError('Brand not found', 404);
    }

    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description ?? null,
        categoryId: input.categoryId,
        brandId: input.brandId ?? null,
      },
      include: {
        category: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
      },
    });

    return successResponse(product, 201);
  } catch (err) {
    if (err instanceof ZodError) return errorResponse(err.issues[0].message, 400);
    if (err instanceof AppError) return errorResponse(err.message, err.statusCode);
    return errorResponse('Failed to create product', 500);
  }
}

