import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';

export interface FetchCityWeatherPayload {
  city: string;
}

export interface FetchCityWeatherResult {
  cityData: WeatherData;
  forecast: ForecastItem[];
  center: { lat: number; lon: number };
  userLocation: { lat: number; lon: number };
}

export interface FetchUserLocationWeatherPayload {
  latitude: number;
  longitude: number;
}

export interface FetchUserLocationWeatherResult {
  userWeather: WeatherData;
  forecast: ForecastItem[];
  center: { lat: number; lon: number };
  userLocation: { lat: number; lon: number };
} 