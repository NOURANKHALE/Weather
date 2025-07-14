// Centralized weather API service with caching and strict TypeScript
import { WeatherData, WeatherApiResponse } from '@/features/weather/types';
import { API_CONFIG, WEATHER_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants';
import { apiRequest, handleAPIError, apiCache } from '@/lib/utils/api';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';

/**
 * WeatherApiService provides methods to fetch weather and forecast data with caching.
 */
export class WeatherApiService {
  private static apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  /**
   * Build API URL with common parameters.
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
   * Generate cache key for weather data.
   */
  private static getCacheKey(type: 'weather' | 'forecast', params: Record<string, string | number>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${type}_${sortedParams}`;
  }

  /**
   * Fetch current weather data by coordinates with caching.
   * @param lat Latitude
   * @param lon Longitude
   * @param locale Language/locale code
   * @returns WeatherData
   */
  static async fetchWeatherByCoords(lat: number, lon: number, locale: string): Promise<WeatherData> {
    const cacheKey = this.getCacheKey('weather', { lat, lon, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }
    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.current, { lat, lon, lang: locale });
      const data = await apiRequest<WeatherData>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch current weather data by city name with caching.
   * @param city City name
   * @param locale Language/locale code
   * @returns WeatherData
   */
  static async fetchWeatherByCity(city: string, locale: string): Promise<WeatherData> {
    const cacheKey = this.getCacheKey('weather', { q: city, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }
    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.current, { q: city.trim(), lang: locale });
      const data = await apiRequest<WeatherData>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch weather forecast by coordinates with caching.
   * @param lat Latitude
   * @param lon Longitude
   * @param locale Language/locale code
   * @returns Object with forecast list
   */
  static async fetchWeatherForecast(lat: number, lon: number, locale: string): Promise<{ list: ForecastItem[] }> {
    const cacheKey = this.getCacheKey('forecast', { lat, lon, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'list' in cached) {
      return cached as { list: ForecastItem[] };
    }
    try {
      const url = this.buildUrl(WEATHER_ENDPOINTS.forecast, { lat, lon, lang: locale });
      const data = await apiRequest<{ list: ForecastItem[] }>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  /**
   * Fetch weather data by query (coordinates or city name).
   * @param query City name or "lat,lon"
   * @param locale Language/locale code
   * @param byCoords If true, query is coordinates
   * @returns WeatherData
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
   * Fetch both current weather and forecast data by coordinates.
   * @param lat Latitude
   * @param lon Longitude
   * @param locale Language/locale code
   * @returns WeatherApiResponse
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
   * Fetch weather and forecast by city name.
   * @param city City name
   * @param locale Language/locale code
   * @returns WeatherApiResponse
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
   * Clear weather cache.
   */
  static clearCache(): void {
    apiCache.clear();
  }

  /**
   * Clear cache for specific location.
   * @param lat Latitude
   * @param lon Longitude
   * @param locale Language/locale code
   */
  static clearLocationCache(lat: number, lon: number, locale: string): void {
    const weatherKey = this.getCacheKey('weather', { lat, lon, lang: locale });
    const forecastKey = this.getCacheKey('forecast', { lat, lon, lang: locale });
    apiCache.delete(weatherKey);
    apiCache.delete(forecastKey);
  }
}

// Export individual functions for backward compatibility (prefer named imports)
export const fetchWeatherData = WeatherApiService.fetchWeatherData;
export const fetchWeatherForecast = WeatherApiService.fetchWeatherForecast;
export const fetchWeatherByCoords = WeatherApiService.fetchWeatherByCoords;
export const fetchWeatherByCity = WeatherApiService.fetchWeatherByCity; 