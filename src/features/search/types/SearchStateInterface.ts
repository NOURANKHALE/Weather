import { WeatherData } from '@/features/weather/types';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';

export interface SearchState {
  city: string;
  weatherData: WeatherData | null;
  forecastData: ForecastItem[] | null;
  loading: boolean;
  error: string | null;
  isGeolocation: boolean;
} 