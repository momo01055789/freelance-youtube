// Cache utility for storing and retrieving data
const CACHE_PREFIX = "youtube_landing_";
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class CacheManager {
  constructor() {
    this.memoryCache = new Map();
  }

  // Generate cache key
  generateKey(key) {
    return `${CACHE_PREFIX}${key}`;
  }

  // Set data in cache
  set(key, data, duration = DEFAULT_CACHE_DURATION) {
    const cacheKey = this.generateKey(key);
    const cacheData = {
      data,
      timestamp: Date.now(),
      duration,
    };

    // Store in memory cache
    this.memoryCache.set(cacheKey, cacheData);

    // Store in localStorage if available
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn("LocalStorage not available:", error);
    }

    return data;
  }

  // Get data from cache
  get(key) {
    const cacheKey = this.generateKey(key);

    // Try memory cache first (fastest)
    let cached = this.memoryCache.get(cacheKey);

    // If not in memory, try localStorage
    if (!cached) {
      try {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          cached = JSON.parse(stored);
          // Restore to memory cache
          this.memoryCache.set(cacheKey, cached);
        }
      } catch (error) {
        console.warn("Error reading from localStorage:", error);
      }
    }

    // Check if cache is still valid
    if (cached) {
      const age = Date.now() - cached.timestamp;
      if (age < cached.duration) {
        return cached.data;
      } else {
        // Cache expired, remove it
        this.remove(key);
      }
    }

    return null;
  }

  // Remove from cache
  remove(key) {
    const cacheKey = this.generateKey(key);
    this.memoryCache.delete(cacheKey);
    try {
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn("Error removing from localStorage:", error);
    }
  }

  // Clear all cache
  clear() {
    this.memoryCache.clear();
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  }

  // Check if cache exists and is valid
  has(key) {
    return this.get(key) !== null;
  }
}

// Export singleton instance
export default new CacheManager();
