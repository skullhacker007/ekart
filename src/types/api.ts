/**
 * API-level types: query params, filter inputs, and response envelopes.
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface SortQuery {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterQuery {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  keyword?: string;
}

export interface ProductListQuery extends PaginationQuery, SortQuery, FilterQuery {}
