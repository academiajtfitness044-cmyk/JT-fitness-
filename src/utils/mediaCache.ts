// Media & Video Persistent Cache Manager using Web Cache Storage API
// Reduces Bunny.net CDN bandwidth usage to zero for repeated plays!

const CACHE_NAME = 'bunny-media-cache-v1';
const blobUrlMap = new Map<string, string>();

/**
 * Checks if Cache API is supported in the current environment
 */
export function isCacheSupported(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

/**
 * Retrieves a cached Blob Object URL if available in local cache.
 * If not in cache, optionally caches it in the background for next time.
 */
export async function getCachedVideoSrc(url: string, backgroundCache = true): Promise<string> {
  if (!url || !isCacheSupported() || !url.startsWith('http')) {
    return url;
  }

  try {
    // Check in-memory blob url first
    if (blobUrlMap.has(url)) {
      return blobUrlMap.get(url)!;
    }

    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      const objectUrl = URL.createObjectURL(blob);
      blobUrlMap.set(url, objectUrl);
      return objectUrl;
    }

    // If not cached and background caching is enabled, fetch & store in cache for future views
    if (backgroundCache && (url.includes('.mp4') || url.includes('.webm') || url.includes('.webp') || url.includes('.jpg') || url.includes('.png'))) {
      // Don't await background caching to avoid blocking immediate playback
      cacheInBackground(url);
    }
  } catch (err) {
    console.debug('[MediaCache] Cache lookup failed, using network URL', err);
  }

  return url;
}

/**
 * Fetches media in background and caches it
 */
export async function cacheInBackground(url: string): Promise<void> {
  if (!url || !isCacheSupported()) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    const match = await cache.match(url);
    if (!match) {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        await cache.put(url, response.clone());
        console.debug(`[MediaCache] Successfully cached: ${url.substring(url.lastIndexOf('/') + 1)}`);
      }
    }
  } catch (err) {
    // Non-blocking catch
    console.debug('[MediaCache] Background cache failed for:', url, err);
  }
}

/**
 * Preloads a batch of exercise videos (e.g. all exercises in current workout)
 */
export async function preloadWorkoutVideos(urls: string[]): Promise<void> {
  if (!urls || urls.length === 0 || !isCacheSupported()) return;
  
  const validUrls = urls.filter(u => u && u.startsWith('http'));
  
  // Cache up to 3 simultaneously to avoid network congestion
  const batchSize = 3;
  for (let i = 0; i < validUrls.length; i += batchSize) {
    const batch = validUrls.slice(i, i + batchSize);
    await Promise.allSettled(batch.map(url => cacheInBackground(url)));
  }
}

/**
 * Get statistics of saved cache items
 */
export async function getCacheStats(): Promise<{ count: number; estimatedSizeMB: number }> {
  if (!isCacheSupported()) return { count: 0, estimatedSizeMB: 0 };
  
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    // Rough estimate: average exercise video is ~1.5MB - 2MB
    const estimatedSizeMB = Math.round(keys.length * 1.8 * 10) / 10;
    return {
      count: keys.length,
      estimatedSizeMB
    };
  } catch {
    return { count: 0, estimatedSizeMB: 0 };
  }
}

/**
 * Clears local media cache
 */
export async function clearMediaCache(): Promise<boolean> {
  if (!isCacheSupported()) return false;
  try {
    // Revoke any existing object URLs to free memory
    blobUrlMap.forEach((blobUrl) => {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {}
    });
    blobUrlMap.clear();
    return await caches.delete(CACHE_NAME);
  } catch {
    return false;
  }
}
