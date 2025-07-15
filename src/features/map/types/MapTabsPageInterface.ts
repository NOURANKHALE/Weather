import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { MapTab } from '@/features/map/store/MapSlice';
import { Coord } from './WeatherMapInterface';

export interface MapTabsPageProps {
  activeTab: MapTab;
  setActiveTab: (tab: MapTab) => void;
  lastSearchedCity: WeatherData | null;
  userWeather: WeatherData | null;
  userLocation: Coord | null;
  direction: 'ltr' | 'rtl';
  WeatherMapClient: React.ComponentType<Record<string, unknown>>;
  geoError: string | null;
  alertRef: React.Ref<HTMLDivElement>;
  forecastData: Array<{
    time: string;
    temp: number;
    humidity: number;
    wind: number;
    windDir?: number;
    condition: string;
  }>;
  analyticsForecast: ForecastItem[];
  locale: string;
}
