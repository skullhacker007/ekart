/**
 * Catalog Service — Business logic for products, categories, and brands.
 * Caches high-traffic read operations using the cacheClient.
 */
import { cache } from '@/src/lib/cache/cacheClient';
import { logger } from '@/src/lib/services/logger';
import { NotFoundError } from '@/src/lib/errors/AppError';
import type { ProductListQuery } from '@/src/types/api';
import {
  dbFindProducts, dbFindProductBySlug, dbCreateProduct, dbUpdateProduct, dbDeleteProduct,
  dbFindCategories, dbFindCategoryBySlug, dbCreateCategory,
  dbFindBrands, dbCreateBrand,
} from './catalog.repository';

const CACHE_TTL = 300; // 5 minutes

// ─── Products ──────────────────────────────────────────────────────────────

export async function listProducts(query: ProductListQuery) {
  // Only cache when no filters (browse all)
  const cacheKey = Object.keys(query).length === 0 ? 'catalog:products:all' : null;
  if (cacheKey) {
    const cached = await cache.get<ReturnType<typeof dbFindProducts>>(cacheKey);
    if (cached) return cached;
  }

  const result = await dbFindProducts(query);
  if (cacheKey) await cache.set(cacheKey, result, CACHE_TTL);
  return result;
}

export async function getProductBySlug(slug: string) {
  const cacheKey = `catalog:product:${slug}`;
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  const product = await dbFindProductBySlug(slug);
  if (!product) throw new NotFoundError('Product');

  await cache.set(cacheKey, product, CACHE_TTL);
  return product;
}

export async function createProduct(data: {
  name: string; slug: string; description?: string; categoryId: string; brandId?: string;
}) {
  const product = await dbCreateProduct(data);
  await cache.del('catalog:products:all'); // invalidate list cache
  logger.info('Product created', { productId: product.id, slug: product.slug });
  return product;
}

export async function updateProduct(id: string, data: Partial<{ name: string; description: string; categoryId: string; brandId: string }>) {
  const product = await dbUpdateProduct(id, data);
  await cache.del('catalog:products:all');
  return product;
}

export async function deleteProduct(id: string) {
  await dbDeleteProduct(id);
  await cache.del('catalog:products:all');
  logger.info('Product deleted', { productId: id });
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function listCategories() {
  const cacheKey = 'catalog:categories:all';
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  const categories = await dbFindCategories();
  await cache.set(cacheKey, categories, CACHE_TTL);
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const cat = await dbFindCategoryBySlug(slug);
  if (!cat) throw new NotFoundError('Category');
  return cat;
}

export async function createCategory(data: { name: string; slug: string; parentId?: string; path?: string }) {
  const cat = await dbCreateCategory(data);
  await cache.del('catalog:categories:all');
  return cat;
}

// ─── Brands ────────────────────────────────────────────────────────────────

export async function listBrands() {
  const cacheKey = 'catalog:brands:all';
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  const brands = await dbFindBrands();
  await cache.set(cacheKey, brands, CACHE_TTL);
  return brands;
}

export async function createBrand(data: { name: string; slug: string }) {
  const brand = await dbCreateBrand(data);
  await cache.del('catalog:brands:all');
  return brand;
}
