import { ForecastItem } from "@/features/forecast/types/ForecastDataInterface";
import { WeatherData } from "@/features/weather/types/WeatherDataInterfaces";

export interface WeatherState {
  data: WeatherData | null;
  forecast: ForecastItem[] | null;
  loading: boolean;
  error: string;
} 