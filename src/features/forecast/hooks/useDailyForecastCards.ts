import { getWeatherIcon } from '@/features/weather/constants/weatherIcons';
import { ForecastItem, DailyForecastCard } from '@/features/forecast/types/ForecastDataInterface';
import { JSX } from 'react';

/**
 * Hook to map grouped daily forecast data to card objects for display.
 * @param dailyForecast - Grouped forecast data by date
 * @param locale - Current locale
 * @returns Array of DailyForecastCard objects
 */
export function useDailyForecastCards(
  dailyForecast: Readonly<Record<string, ForecastItem[]>>,
  locale: string
): DailyForecastCard[] {
  if (!dailyForecast || Object.keys(dailyForecast).length === 0) {
    return [];
  }

  const result: DailyForecastCard[] = Object.entries(dailyForecast)
    .slice(0, 7)
    .map(([date, items]) => {
      if (!Array.isArray(items) || items.length === 0) return undefined;

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
      } satisfies DailyForecastCard;
    })
    .filter((card): card is DailyForecastCard => card !== undefined);

  return result;
}
