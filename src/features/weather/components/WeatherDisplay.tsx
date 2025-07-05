'use client';
import { useEffect } from 'react';
import { useLocale, useTranslations, useFormatter } from 'next-intl';
import { motion } from 'framer-motion';
import WeatherCard from '@/features/weather/components/WeatherCard';
import HourlyForecast from '@/features/forecast/components/HourlyForecast';
import { Button } from '@/components/ui/button';
import { useGlobalSearch } from '@/features/search/hooks';
import { WeatherData, WeatherStatProps } from '@/features/weather/types';
import WeatherCardSkelton from '@/features/weather/components/WeatherCardSkelton';
import  ForecastSkeleton  from '@/features/forecast/components/ForecastSkelton';
import { useTransformedForecastData, useFormattedWeatherTime } from '@/features/weather/hooks/useWeatherDisplay';

function WeatherStat({
  icon,
  label,
}: WeatherStatProps) {
  return (
    <motion.div 
      className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
      </div>
    </motion.div>
  );
}

export default function WeatherDisplay({ section }: { section?: 'weather' | 'hourly' }) {
  const t = useTranslations('Weather');
  const format = useFormatter();
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
  const transformedForecastData = useTransformedForecastData(forecastData);
  const formattedTime = useFormattedWeatherTime(weatherData, locale, t);

  // Get current location on mount if no data exists
  useEffect(() => {
    if (!weatherData && !loading && !city) {
      getCurrentLocation();
    }
  }, [weatherData, loading, city, getCurrentLocation]);

  // Add a helper to check for invalid input error
  const isInvalidInput = error && (error.toLowerCase().includes('valid city') || error.toLowerCase().includes('valid country'));

  return (
    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="Weather_Display w-full"
      >
        {/* Loading state */}
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

        {/* Error states */}
        {error && (error.includes('not found') || error.includes('\ud83d\ude22')) && (
          <motion.div 
            className="flex flex-col items-center gap-2 text-sm text-destructive px-1 py-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-700 dark:text-red-400">{t('noMatchedResults')}</span>
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
        {isInvalidInput && (
          <motion.div 
            className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-amber-700 dark:text-amber-400 text-sm font-medium">{t('invalidInput')}</span>
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

        {/* No data state */}
        {!weatherData && !loading && !error && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('startExploring')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('searchOrAllowLocation')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
  );
}
