export interface DailyForecastCardProps {
    date: string;
    minTemp: number;
    maxTemp: number;
    avgTemp: number;
    icon: React.ReactNode;
    isToday: boolean;
    locale: string;
  } 