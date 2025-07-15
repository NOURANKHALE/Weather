// Application constants
export const APP_CONFIG = {
  name: 'Weather App',
  version: '1.0.0',
  defaultLocale: 'en',
  supportedLocales: ['en', 'ar'] as const,
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  cacheTime: 5 * 60 * 1000, // 5 minutes
} as const;

// Weather API endpoints
export const WEATHER_ENDPOINTS = {
  current: '/weather',
  forecast: '/forecast',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'City not found',
  API_ERROR: 'API error occurred',
  NETWORK_ERROR: 'Network error',
  GEOLOCATION_ERROR: 'Unable to get your location',
  GEOLOCATION_NOT_SUPPORTED: 'Geolocation is not supported',
  INVALID_INPUT: 'Please enter a valid city name',
  UNKNOWN_ERROR: 'Something went wrong',
  INVALID_API_KEY: 'Invalid API key',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  REQUEST_TIMEOUT: 'Request timeout. Please check your connection.',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'weather_search_history',
  LAST_LOCATION: 'weather_last_location',
  WEATHER_CARD_ORDER: 'weather_card_order',
  FORECAST_CARD_ORDER: 'forecast_card_order',
} as const;

// UI Constants
export const UI_CONFIG = {
  debounceDelay: 2000,
  maxSearchHistory: 10,
} as const; 