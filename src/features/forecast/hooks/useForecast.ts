import { useMemo, useEffect } from 'react';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import { useGlobalSearch } from '@/features/search/hooks';

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

  const forecastDataForDisplay = useMemo(() => {
    return (forecastData || []).slice(0, 8).filter(Boolean).map((item: ForecastItem) => ({
      time: item.dt_txt?.split(" ")[1]?.slice(0, 5) || "",
      temp: item.main?.temp ?? 0,
      humidity: item.main?.humidity ?? 0,
      wind: item.wind?.speed ?? 0,
      windDir: item.wind?.deg ?? 0,
      condition: item.weather?.[0]?.main || "Other",
    }));
  }, [forecastData]);

  // Group forecast by day for weekly forecast
  const dailyForecast = useMemo(() => {
    console.log('useForecast - forecastData:', forecastData);
    
    if (!forecastData || forecastData.length === 0) {
      console.log('useForecast - No forecast data available');
      return {};
    }
    
    const grouped = (forecastData || []).reduce((acc: Record<string, ForecastItem[]>, item) => {
      const date = item.dt_txt?.split(' ')[0];
      if (!date) {
        console.log('useForecast - Item without date:', item);
        return acc;
      }
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
    
    console.log('useForecast - Grouped daily forecast:', grouped);
    return grouped;
  }, [forecastData]);

  // Get current location on mount if no data exists
  useEffect(() => {
    if (!weatherData && !loading && !city) {
      console.log('useForecast - Getting current location');
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