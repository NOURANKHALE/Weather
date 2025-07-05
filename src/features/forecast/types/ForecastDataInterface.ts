import { Main,Wind,Weather } from "@/features/weather/types";

export interface ForecastData {
    time: string;
    temp: number;
    humidity: number;
    wind: number;
    windDir: number;
    condition: string;
  }

  export interface ForecastItem {
    dt_txt: string;
    main: Main;
    wind: Wind;
    weather: Weather[];
    visibility?: number;
  }