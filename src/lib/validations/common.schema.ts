/**
 * Shared Zod validation schemas.
 * Import and extend these in feature-level validators.
 */
import { z } from 'zod';

// --- Pagination ---
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
});

// --- ID Param ---
export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// --- Slug Param ---
export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

// --- Price Range Filter ---
export const priceRangeSchema = z.object({
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
export type PriceRange = z.infer<typeof priceRangeSchema>;
