/**
 * Catalog Repository — low-level Prisma queries for products, categories, and brands.
 * No business logic here; only data access.
 */
import { prisma } from '@/src/lib/db/prisma';
import { cursorPagination, buildCursorPage } from '@/src/lib/utils/pagination';
import type { ProductListQuery } from '@/src/types/api';

// ─── Products ──────────────────────────────────────────────────────────────

export async function dbFindProducts(query: ProductListQuery) {
  const { limit = 20, cursor, categoryId, brandId, minPrice, maxPrice, keyword, sortBy = 'createdAt', sortOrder = 'desc' } = query;

  const paginationArgs = cursorPagination({ cursor, limit });

  const where = {
    ...(categoryId && { categoryId }),
    ...(brandId && { brandId }),
    ...(keyword && {
      name: { contains: keyword, mode: 'insensitive' as const },
    }),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          variants: {
            some: {
              price: {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
              },
            },
          },
        }
      : {}),
  };

  const items = await prisma.product.findMany({
    ...paginationArgs,
    where,
    orderBy: { [sortBy]: sortOrder },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { position: 'asc' }, take: 1 },
      variants: { select: { id: true, sku: true, price: true } },
    },
  });

  return buildCursorPage(items, limit);
}

export async function dbFindProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { position: 'asc' } },
      variants: {
        include: {
          attributes: { include: { value: { include: { attribute: true } } } },
          inventories: { select: { stock: true, reserved: true } },
        },
      },
      reviews: { select: { rating: true, comment: true, userId: true } },
    },
  });
}

export async function dbCreateProduct(data: {
  name: string; slug: string; description?: string; categoryId: string; brandId?: string;
}) {
  return prisma.product.create({ data, include: { category: true, brand: true } });
}

export async function dbUpdateProduct(id: string, data: Partial<{ name: string; description: string; categoryId: string; brandId: string }>) {
  return prisma.product.update({ where: { id }, data });
}

export async function dbDeleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function dbFindCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { name: 'asc' },
  });
}

export async function dbFindCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug }, include: { children: true, products: { take: 5 } } });
}

export async function dbCreateCategory(data: { name: string; slug: string; parentId?: string; path?: string }) {
  return prisma.category.create({ data });
}

// ─── Brands ────────────────────────────────────────────────────────────────

export async function dbFindBrands() {
  return prisma.brand.findMany({ orderBy: { name: 'asc' } });
}

export async function dbCreateBrand(data: { name: string; slug: string }) {
  return prisma.brand.create({ data });
}
