/**
 * Pagination helpers.
 * Supports cursor-based pagination (preferred for large datasets) 
 * and offset-based pagination (simple use-cases).
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
  nextCursor?: string | null;
  hasNextPage: boolean;
}

/**
 * Build Prisma-compatible offset pagination args.
 */
export function offsetPagination(params: PaginationParams) {
  const limit = params.limit ?? 20;
  const page = params.page ?? 1;
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

/**
 * Build Prisma-compatible cursor pagination args.
 */
export function cursorPagination(params: PaginationParams) {
  const limit = params.limit ?? 20;
  const args: { take: number; cursor?: { id: string }; skip?: number } = {
    take: limit + 1, // fetch one extra to detect hasNextPage
  };
  if (params.cursor) {
    args.cursor = { id: params.cursor };
    args.skip = 1; // skip the cursor item itself
  }
  return args;
}

/**
 * Slice oversized cursor results and compute nextCursor.
 */
export function buildCursorPage<T extends { id: string }>(
  items: T[],
  limit: number
): Pick<PaginatedResult<T>, 'data' | 'nextCursor' | 'hasNextPage'> {
  const hasNextPage = items.length > limit;
  const data = hasNextPage ? items.slice(0, limit) : items;
  const nextCursor = hasNextPage ? data[data.length - 1].id : null;
  return { data, nextCursor, hasNextPage };
}
