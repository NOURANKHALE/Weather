'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import WeatherCard from '@/features/weather/components/WeatherCard';
import HourlyForecast from '@/features/forecast/components/HourlyForecast';
import { Button } from '@/components/ui/button';
import { useGlobalSearch } from '@/features/search/hooks';
import { WeatherData } from '@/features/weather/types';
import WeatherCardSkelton from '@/features/weather/components/WeatherCardSkelton';
import ForecastSkeleton from '@/features/forecast/components/ForecastSkelton';
import {
  useTransformedForecastData,
  useFormattedWeatherTime
} from '@/features/weather/hooks/useWeatherDisplay';

export default function WeatherDisplay({ section }: { section?: 'weather' | 'hourly' }) {
  const t = useTranslations('Weather');
  const locale = useLocale();

  const {
    weatherData,
    forecastData,
    loading,
    error,
    city,
    getCurrentLocation,
    clearSearchResults
  } = useGlobalSearch();

  const transformedForecastData = useTransformedForecastData(forecastData ?? undefined);
  const formattedTime = useFormattedWeatherTime(weatherData, locale);

  useEffect(() => {
    if (!weatherData && !loading && !city) {
      getCurrentLocation();
    }
  }, [weatherData, loading, city, getCurrentLocation]);

  const isInvalidInput =
    error &&
    (error.toLowerCase().includes('valid city') ||
      error.toLowerCase().includes('valid country'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="Weather_Display w-full"
    >
      {/* Loading */}
      {loading && (
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-6">
            <WeatherCardSkelton />
            <ForecastSkeleton />
          </div>
        </motion.div>
      )}

      {/* Error: not found or sad emoji */}
      {error &&
        (error.includes('not found') || error.includes('😢')) && (
          <motion.div
            className="flex flex-col items-center gap-2 text-sm text-destructive px-1 py-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-700 dark:text-red-400">
                {t('noMatchedResults')}
              </span>
            </div>
            <Button
              variant="destructive"
              size="lg"
              onClick={clearSearchResults}
              className="font-bold px-6 py-2 mt-2"
            >
              {t('tryAgain')}
            </Button>
          </motion.div>
        )}

      {/* Error: invalid input */}
      {isInvalidInput && (
        <motion.div
          className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-amber-700 dark:text-amber-400 text-sm font-medium">
              {t('invalidInput')}
            </span>
          </div>
        </motion.div>
      )}

      {/* WeatherCard only */}
      {section === 'weather' && weatherData && !loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <WeatherCard
            weather={weatherData as WeatherData}
            formattedTime={formattedTime}
          />
        </motion.div>
      )}

      {/* HourlyForecast only */}
      {section === 'hourly' && forecastData && !loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <HourlyForecast
            forecastData={transformedForecastData}
            forecast={forecastData}
          />
        </motion.div>
      )}

      
    </motion.div>
  );
}
