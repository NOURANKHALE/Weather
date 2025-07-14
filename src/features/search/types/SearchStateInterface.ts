import { WeatherData } from '@/features/weather/types';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { LocationWithName } from '@/features/map/types/WeatherMapInterface';

export interface SearchState {
  city: string;
  weatherData: WeatherData | null;
  forecastData: ForecastItem[] | null;
  loading: boolean;
  error: string | null;
  isGeolocation: boolean;
  lastSearchedLocation: LocationWithName | null;
} 