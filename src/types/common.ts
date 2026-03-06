/**
 * Common shared types used across the application.
 */

export type ID = string;

export interface TimestampedEntity {
  createdAt: Date;
  updatedAt?: Date;
}

export interface SluggedEntity {
  id: ID;
  name: string;
  slug: string;
}

/** Standard response shape from server actions */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
