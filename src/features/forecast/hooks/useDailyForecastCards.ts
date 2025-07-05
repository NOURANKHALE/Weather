import { getWeatherIcon } from '@/features/weather/constants/weatherIcons';

export function useDailyForecastCards(dailyForecast: Record<string, any>, locale: string) {
  // Prepare the forecast card data array
  return Object.entries(dailyForecast).slice(0, 7).map(([date, items]) => {
    const temps = items.map((item: any) => item.main?.temp || 0);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;
    const iconCode = items[0]?.weather?.[0]?.icon || '01d';
    return {
      date,
      minTemp,
      maxTemp,
      avgTemp,
      icon: getWeatherIcon(iconCode, 48),
      locale,
    };
  });
} 