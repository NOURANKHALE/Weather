import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import { MapTab } from '@/features/map/store/mapSlice';
import { Coord } from './WeatherMapInterface';

export interface MapState {
  userLocation: Coord | null;
  forecast: ForecastItem[];
  userWeather: WeatherData | null;
  activeTab: MapTab;
}
