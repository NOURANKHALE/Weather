import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import type { ForecastItem, ForecastData } from '@/features/forecast/types/ForecastDataInterface';
import {  useTranslations } from 'next-intl';

interface WeatherData {
  timezone: number;
}


// Transforms raw forecast data into simplified hourly forecast items
export function useTransformedForecastData(
  forecastData?: ForecastItem[]
): ForecastData[] {
  return useMemo(() => {
    if (!forecastData) return [];

    return forecastData.slice(0, 8).map((item) => ({
      time: DateTime.fromSeconds(new Date(item.dt_txt).getTime() / 1000).toFormat('HH:mm'),
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      windDir: item.wind.deg ?? 0, // <-- fix here
      condition: item.weather?.[0]?.description ?? '',
    }));
  }, [forecastData]);
}

// Formats weather time using timezone from weatherData
export function useFormattedWeatherTime(
  weatherData: WeatherData | null,
  locale: string,
): string {
  const [formattedTime, setFormattedTime] = useState('');
  const t = useTranslations('Weather');
  useEffect(() => {
    if (!weatherData?.timezone) return;

    const updateTime = () => {
      const localTime = DateTime.utc()
        .plus({ seconds: weatherData.timezone })
        .setLocale(locale);
      const date = localTime.toFormat('EEE, dd LLL');
      const time = localTime.toFormat('hh:mm a');
      setFormattedTime(t('today', { date, time }));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [weatherData?.timezone, locale, t]);

  return formattedTime;
}
