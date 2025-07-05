import { WeatherData } from "@/features/weather/types/WeatherDataInterfaces";

export interface WeatherCardProps {
  weather: WeatherData;
  formattedTime: string;
  className?: string;
}

export interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
} 