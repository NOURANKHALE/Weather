import { WeatherData, WeatherApiResponse } from '@/features/weather/types';
import { WEATHER_ENDPOINTS, ERROR_MESSAGES } from '@/constants/Constants';
import { apiRequest, handleAPIError, apiCache } from '@/lib/utils/api';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { buildUrl, getCacheKey } from '@/features/weather/utils/WeatherApiHelpers';

export class WeatherApiService {
  private static apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  static async fetchWeatherByCoords(lat: number, lon: number, locale: string): Promise<WeatherData> {
    const cacheKey = getCacheKey('weather', { lat, lon, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }
    try {
      const url = buildUrl(WEATHER_ENDPOINTS.current, { lat, lon, lang: locale }, this.apiKey);
      const data = await apiRequest<WeatherData>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  static async fetchWeatherByCity(city: string, locale: string): Promise<WeatherData> {
    const cacheKey = getCacheKey('weather', { q: city, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'timezone' in cached) {
      return cached as WeatherData;
    }
    try {
      const url = buildUrl(WEATHER_ENDPOINTS.current, { q: city.trim(), lang: locale }, this.apiKey);
      const data = await apiRequest<WeatherData>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

  static async fetchWeatherForecast(lat: number, lon: number, locale: string): Promise<{ list: ForecastItem[] }> {
    const cacheKey = getCacheKey('forecast', { lat, lon, lang: locale });
    const cached = apiCache.get(cacheKey);
    if (cached && typeof cached === 'object' && 'list' in cached) {
      return cached as { list: ForecastItem[] };
    }
    try {
      const url = buildUrl(WEATHER_ENDPOINTS.forecast, { lat, lon, lang: locale }, this.apiKey);
      const data = await apiRequest<{ list: ForecastItem[] }>(url);
      apiCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  }

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

  static clearCache(): void {
    apiCache.clear();
  }

  static clearLocationCache(lat: number, lon: number, locale: string): void {
    const weatherKey = getCacheKey('weather', { lat, lon, lang: locale });
    const forecastKey = getCacheKey('forecast', { lat, lon, lang: locale });
    apiCache.delete(weatherKey);
    apiCache.delete(forecastKey);
  }
} 