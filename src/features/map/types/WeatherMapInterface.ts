import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';

export interface WeatherMapProps {
  center: [number, number];
  userLocation: Coord | null;
  userWeather: WeatherData | null;
  lastSearchedCity: WeatherData | null;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface LocationWithName extends Coord {
  name: string;
}