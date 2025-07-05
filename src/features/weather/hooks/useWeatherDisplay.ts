import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

export function useTransformedForecastData(forecastData: any) {
  return useMemo(() => {
    if (!forecastData) return [];
    return forecastData.slice(0, 8).map((item: any) => ({
      time: DateTime.fromSeconds(new Date(item.dt_txt).getTime() / 1000).toFormat('HH:mm'),
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      windDir: item.wind.deg,
      condition: item.weather[0].description
    }));
  }, [forecastData]);
}

export function useFormattedWeatherTime(weatherData: any, locale: string, t: any) {
  const [formattedTime, setFormattedTime] = useState('');
  useEffect(() => {
    if (!weatherData?.timezone) return;
    const updateTime = () => {
      const utc = DateTime.utc();
      const local = utc.plus({ seconds: weatherData.timezone }).setLocale(locale);
      const date = local.toFormat('EEE, dd LLL');
      const time = local.toFormat('hh:mm a');
      setFormattedTime(t('today', { date, time }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weatherData?.timezone, locale, t]);
  return formattedTime;
} 