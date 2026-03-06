/**
 * Cache client setup.
 * Using a simple in-memory Map for development.
 * Replace with Redis (ioredis) in production.
 *
 * Usage:
 *   import { cache } from '@/src/lib/cache/cacheClient';
 *   await cache.set('catalog:all', data, 60); // TTL in seconds
 *   const cached = await cache.get('catalog:all');
 */

// Simple in-memory store (dev only – replace with Redis in production)
const store = new Map<string, { value: string; expiresAt: number }>();

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return JSON.parse(entry.value) as T;
  },

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    store.set(key, {
      value: JSON.stringify(value),
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  async del(key: string): Promise<void> {
    store.delete(key);
  },

  async flush(): Promise<void> {
    store.clear();
  },
};
