import { ForecastItem } from "@/features/forecast/types/ForecastDataInterface";
import { WeatherData } from "@/features/weather/types/WeatherDataInterfaces";

export interface WeatherApiParams {
  lat?: number;
  lon?: number;
  q?: string;
  lang: string;
}

export interface WeatherApiResponse {
  weather: WeatherData;
  forecast: ForecastItem[];
}

export interface WeatherApiCacheKey {
  type: 'weather' | 'forecast';
  params: Record<string, string | number>;
} 