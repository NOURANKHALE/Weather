import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';

/**
 * Custom hook to format weather time using timezone from weatherData and locale.
 * @param weatherData - Weather data object with timezone
 * @param locale - Locale string
 * @returns Formatted time string
 */
export function useFormattedWeatherTime(
  weatherData: WeatherData | null,
  locale: string,
): string {
  const [formattedTime, setFormattedTime] = useState<string>('');
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