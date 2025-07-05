import { ForecastData,ForecastItem } from "@/features/forecast/types/ForecastDataInterface";

export interface HourlyForecastProps {
    forecastData: ForecastData[];
    forecast: ForecastItem[];
  }