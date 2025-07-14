import { WeatherData } from '@/features/weather/types';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { LocationWithName } from '@/features/map/types/WeatherMapInterface';

export interface SearchApiResponse {
  weather: WeatherData;
  forecast: ForecastItem[];
  location: LocationWithName;
} 