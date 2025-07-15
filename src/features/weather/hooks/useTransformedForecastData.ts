import { useMemo } from 'react';
import { DateTime } from 'luxon';
import type { ForecastItem, ForecastData } from '@/features/forecast/types/ForecastDataInterface';

/**
 * Transforms raw forecast data into simplified hourly forecast items.
 * @param forecastData - Array of forecast items (readonly)
 * @returns Array of transformed forecast data
 */
export function useTransformedForecastData(
  forecastData?: ReadonlyArray<ForecastItem>
): ForecastData[] {
  return useMemo(() => {
    if (!forecastData) return [];

    return forecastData.slice(0, 8).map((item) => ({
      time: DateTime.fromSeconds(new Date(item.dt_txt).getTime() / 1000).toFormat('HH:mm'),
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      windDir: item.wind.deg ?? 0,
      condition: item.weather?.[0]?.description ?? '',
    }));
  }, [forecastData]);
} 