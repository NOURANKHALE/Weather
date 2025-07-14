import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { Coord } from './WeatherMapInterface';

export interface FetchCityWeatherPayload {
  city: string;
}

export interface FetchCityWeatherResult {
  cityData: WeatherData;
  forecast: ForecastItem[];
  center: Coord;
  userLocation: Coord;
}

export interface FetchUserLocationWeatherPayload {
  latitude: number;
  longitude: number;
}

export interface FetchUserLocationWeatherResult {
  userWeather: WeatherData;
  forecast: ForecastItem[];
  center: Coord;
  userLocation: Coord;
} 