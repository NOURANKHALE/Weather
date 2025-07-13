import { WeatherData, WeatherApiResponse } from '@/features/weather/types';
import { API_CONFIG, WEATHER_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants';
import { apiRequest, handleAPIError, apiCache } from '@/lib/utils/api';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';

// Centralized weather API service with caching
export class WeatherApiService {
  private static apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  /**
   * Build API URL with common parameters
   */
  private static buildUrl(endpoint: string, params: Record<string, string | number>): string {
    const searchParams = new URLSearchParams({
      ...params,
      units: 'metric',
      appid: this.apiKey || '',
    });
    return `${API_CONFIG.baseUrl}${endpoint}?${searchParams.toString()}`;
  }

  /**
   * Generate cache key for weather data
   */
  private static getCacheKey(type: 'weather' | 'forecast', params: Record<string, string | number>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${type}_${sortedParams}`;
  }

  /**
   * Fetch current weather data by coordinates with caching
   */
  static async fetchWeatherByCoords(lat: number, lon: number, locale: string): Promise<WeatherData> {
    const cacheKey = this.getCacheKey('weather', { lat, lon, lang: locale });
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }

    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.current, {
        lat,
        lon,
        lang: locale,
      });

      const data = await apiRequest<WeatherData>(url);
      
      // Cache the result
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch current weather data by city name with caching
   */
  static async fetchWeatherByCity(city: string, locale: string): Promise<WeatherData> {
    const cacheKey = this.getCacheKey('weather', { q: city, lang: locale });
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }

    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.current, {
        q: city.trim(),
        lang: locale,
      });

      const data = await apiRequest<WeatherData>(url);
      
      // Cache the result
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch weather forecast by coordinates with caching
   */
  static async fetchWeatherForecast(lat: number, lon: number, locale: string): Promise<{ list: ForecastItem[] }> {
    const cacheKey = this.getCacheKey('forecast', { lat, lon, lang: locale });
    
    // Check cache first
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'list' in cached) {
      return cached as { list: ForecastItem[] };
    }

    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.forecast, {
        lat,
        lon,
        lang: locale,
      });

      const data = await apiRequest<{ list: ForecastItem[] }>(url);
      
      // Cache the result
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch weather data by query (coordinates or city name)
   */
  static async fetchWeatherData(query: string, locale: string, byCoords = false): Promise<WeatherData> {
    if (byCoords) {
      const [lat, lon] = query.split(',').map(Number);
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
      }
      return this.fetchWeatherByCoords(lat, lon, locale);
    } else {
      return this.fetchWeatherByCity(query, locale);
    }
  }

  /**
   * Fetch both current weather and forecast data by coordinates
   */
  static async fetchWeatherAndForecast(
    lat: number, 
    lon: number, 
    locale: string
  ): Promise<WeatherApiResponse> {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        this.fetchWeatherByCoords(lat, lon, locale),
        this.fetchWeatherForecast(lat, lon, locale)
      ]);

      return {
        weather: weatherResponse,
        forecast: forecastResponse.list || []
      };
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch weather and forecast by city name
   */
  static async fetchWeatherAndForecastByCity(
    city: string, 
    locale: string
  ): Promise<WeatherApiResponse> {
    try {
      const weatherResponse = await this.fetchWeatherByCity(city, locale);
      const forecastResponse = await this.fetchWeatherForecast(
        weatherResponse.coord.lat, 
        weatherResponse.coord.lon, 
        locale
      );

      return {
        weather: weatherResponse,
        forecast: forecastResponse.list || []
      };
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Clear weather cache
   */
  static clearCache(): void {
    apiCache.clear();
  }

  /**
   * Clear cache for specific location
   */
  static clearLocationCache(lat: number, lon: number, locale: string): void {
    const weatherKey = this.getCacheKey('weather', { lat, lon, lang: locale });
    const forecastKey = this.getCacheKey('forecast', { lat, lon, lang: locale });
    apiCache.delete(weatherKey);
    apiCache.delete(forecastKey);
  }
}

// Export individual functions for backward compatibility
export const fetchWeatherData = WeatherApiService.fetchWeatherData;
export const fetchWeatherForecast = WeatherApiService.fetchWeatherForecast;
export const fetchWeatherByCoords = WeatherApiService.fetchWeatherByCoords;
export const fetchWeatherByCity = WeatherApiService.fetchWeatherByCity; 