import { useMemo, useEffect } from 'react';
import { ForecastItem, ForecastData } from '@/features/forecast/types/ForecastDataInterface';
import { useGlobalSearch } from '@/features/search/hooks';

/**
 * Hook to provide forecast and weather data, including display-ready and grouped daily forecast.
 * @returns Forecast and weather data, loading/error state, and helpers.
 */

export const useForecast = () => {
  const { 
    weatherData, 
    forecastData, 
    loading, 
    error, 
    city, 
    isGeolocation,
    getCurrentLocation 
  } = useGlobalSearch();

  /**
   * Memoized forecast data for display (first 8 items, mapped to display shape).
   */
  const forecastDataForDisplay: ForecastData[] = useMemo(() => {
    return (forecastData || []).slice(0, 8).filter(Boolean).map((item: ForecastItem) => ({
      time: item.dt_txt?.split(" ")[1]?.slice(0, 5) || "",
      temp: item.main?.temp ?? 0,
      humidity: item.main?.humidity ?? 0,
      wind: item.wind?.speed ?? 0,
      windDir: item.wind?.deg ?? 0,
      condition: item.weather?.[0]?.main || "Other",
    }));
  }, [forecastData]);

  /**
   * Group forecast by day for weekly forecast.
   */
  const dailyForecast: Record<string, ForecastItem[]> = useMemo(() => {
    const grouped = (forecastData || []).reduce((acc: Record<string, ForecastItem[]>, item) => {
      const date = item.dt_txt?.split(' ')[0];
      if (!date) {
        if (process.env.NODE_ENV === 'development') {
          console.log('useForecast - Item without date:', item);
        }
        return acc;
      }
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
    if (process.env.NODE_ENV === 'development') {
      console.log('useForecast - Grouped daily forecast:', grouped);
    }
    return grouped;
  }, [forecastData]);

  // Get current location on mount if no data exists
  useEffect(() => {
    if (!weatherData && !loading && !city) {
      if (process.env.NODE_ENV === 'development') {
        console.log('useForecast - Getting current location');
      }
      getCurrentLocation();
    }
  }, [weatherData, loading, city, getCurrentLocation]);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    city,
    isGeolocation,
    forecastDataForDisplay,
    dailyForecast,
    getCurrentLocation
  };
};