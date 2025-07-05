import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';

export interface WeatherMapProps {
  center: [number, number];
  userLocation: { lat: number; lon: number } | null;
  userWeather: WeatherData | null;
  lastSearchedCity: WeatherData | null;
}

export interface Coord {
  lat: number;
  lon: number;
}