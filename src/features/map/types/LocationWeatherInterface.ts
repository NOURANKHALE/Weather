import { UserLocation } from '@/features/weather/types/UserLocationInterface';

export interface LocationWeatherProps {
  searchCity: string | null;
}

export interface LocationWeatherReturn {
  geoError: string | null;
  setGeoError: (err: string | null) => void;
  alertRef: React.RefObject<HTMLDivElement>;
  userLocation: UserLocation | null;
} 