import { getWeatherIcon } from '@/features/weather/constants/weatherIcons';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { JSX } from 'react';

interface DailyForecastCard {
  date: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  icon: JSX.Element;
  locale: string;
}

export function useDailyForecastCards(
  dailyForecast: Record<string, ForecastItem[]>,
  locale: string
): DailyForecastCard[] {
  if (!dailyForecast || Object.keys(dailyForecast).length === 0) {
    return [];
  }

  const result = Object.entries(dailyForecast)
    .slice(0, 7)
    .map(([date, items]) => {
      if (!Array.isArray(items) || items.length === 0) return null;

      const temps = items.map((item) => item.main?.temp ?? 0);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      const iconCode = items[0]?.weather?.[0]?.icon ?? '01d';

      return {
        date,
        minTemp,
        maxTemp,
        avgTemp,
        icon: getWeatherIcon(iconCode, 48),
        locale,
      };
    })
    .filter((card): card is DailyForecastCard => card !== null);

  return result;
}
