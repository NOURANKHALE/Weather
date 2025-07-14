import { Main,Wind,Weather } from "@/features/weather/types";

/**
 * Represents a single forecast data point for display.
 */
export interface ForecastData {
    time: string;
    temp: number;
    humidity: number;
    wind: number;
    windDir: number;
    condition: string;
}

/**
 * Represents a single forecast item from the API.
 */
export interface ForecastItem {
    dt_txt: string;
    main: Main;
    wind: Wind;
    weather: Weather[];
    visibility?: number;
}

/**
 * Represents a daily forecast card's data for the UI.
 */
export interface DailyForecastCard {
  date: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  icon: React.ReactNode;
  locale: string;
}