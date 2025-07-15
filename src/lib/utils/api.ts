import { API_CONFIG, ERROR_MESSAGES } from '@/constants/Constants';

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// API request wrapper with retry logic
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {},
  retryAttempts: number = API_CONFIG.retryAttempts
): Promise<T> => {
  const makeRequest = async (): Promise<T> => {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text().catch(() => 'Unknown error');
      throw new APIError(
        errorMessage || ERROR_MESSAGES.API_ERROR,
        response.status
      );
    }

    return response.json() as Promise<T>;
  };

  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      return await makeRequest();
    } catch (error) {
      if (attempt === retryAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // backoff
    }
  }

  throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
};

// Handle API errors gracefully
export const handleAPIError = (error: unknown): string => {
  if (error instanceof APIError) {
    switch (error.status) {
      case 404:
        return ERROR_MESSAGES.CITY_NOT_FOUND;
      case 401:
        return ERROR_MESSAGES.INVALID_API_KEY;
      case 429:
        return ERROR_MESSAGES.TOO_MANY_REQUESTS;
      case 408:
        return ERROR_MESSAGES.REQUEST_TIMEOUT;
      default:
        return error.message || ERROR_MESSAGES.API_ERROR;
    }
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

// Debounce utility for search inputs
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};

// Cache utility for API responses
export class APICache<T = unknown> {
  private cache = new Map<string, { data: T; timestamp: number }>();

  set(key: string, data: T, ttl: number = API_CONFIG.cacheTime): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

// Global API cache instance
export const apiCache = new APICache();
