import { STORAGE_KEYS, UI_CONFIG } from '@/constants/Constants';

export class StorageManager {
  private static instance: StorageManager;
  private storage: Storage;

  private constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    };
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Generic get method with type safety
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue || null;
    }
  }

  // Generic set method
  set<T>(key: string, value: T): boolean {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  }

  // Remove item
  remove(key: string): boolean {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error);
      return false;
    }
  }
}

// Global storage instance
export const storage = StorageManager.getInstance();

// Type-safe storage helpers for specific data types
export const storageHelpers = {
  // Search history management
  getSearchHistory: (): string[] => {
    return storage.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []) || [];
  },

  setSearchHistory: (history: string[]): boolean => {
    return storage.set(STORAGE_KEYS.SEARCH_HISTORY, history);
  },

  addToSearchHistory: (city: string): boolean => {
    const history = storageHelpers.getSearchHistory();
    const filteredHistory = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    const newHistory = [city, ...filteredHistory].slice(0, UI_CONFIG.maxSearchHistory);
    return storageHelpers.setSearchHistory(newHistory);
  },

  clearSearchHistory: (): boolean => {
    return storage.remove(STORAGE_KEYS.SEARCH_HISTORY);
  },

  // Last location management
  getLastLocation: () => {
    return storage.get<{
      lat: number;
      lon: number;
      name: string;
      timestamp: number;
    } | null>(STORAGE_KEYS.LAST_LOCATION, null);
  },

  setLastLocation: (location: {
    lat: number;
    lon: number;
    name: string;
  }): boolean => {
    return storage.set(STORAGE_KEYS.LAST_LOCATION, {
      ...location,
      timestamp: Date.now(),
    });
  },
};
