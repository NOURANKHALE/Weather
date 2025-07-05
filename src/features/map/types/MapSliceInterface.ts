import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { Coord } from '@/features/map/types/WeatherMapInterface';
import { MapTab } from '@/features/map/store/mapSlice';

export interface MapState {
  center: Coord;
  userLocation: Coord | null;
  forecast: ForecastItem[];
  loading: boolean;
  error: string | null;
  userWeather: WeatherData | null;
  lastSearchedCity: WeatherData | null;
  activeTab: MapTab;
  locale: string;
  showLocationPermissionDialog: boolean;
}

