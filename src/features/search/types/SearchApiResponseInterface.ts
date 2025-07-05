import { WeatherData } from '@/features/weather/types';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';

export interface SearchApiResponse {
  weather: WeatherData;
  forecast: ForecastItem[];
  location: {
    lat: number;
    lon: number;
    name: string;
  };
} 