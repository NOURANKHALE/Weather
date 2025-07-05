import { Coord } from '@/features/map/types/WeatherMapInterface';

export interface Wind {
  speed: number;
  deg?: number;
}

export interface Weather {
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

export interface Sys {
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  name: string;
  timezone: number;
  coord: Coord;
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
  visibility?: number;
} 