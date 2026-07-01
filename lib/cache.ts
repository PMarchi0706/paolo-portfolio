type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const store = new Map<string, CacheEntry<unknown>>();

/**
 * Module-level in-memory TTL cache. Lives for the lifetime of the server
 * process (or serverless function instance) — good enough for bounding
 * calls to a rate-limited third-party API on a low-traffic site.
 */
export async function getOrSetCache<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>
): Promise<T> {
  const cached = store.get(key);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  const value = await fn();
  store.set(key, { value, expiresAt: now + ttlMs });
  return value;
}
