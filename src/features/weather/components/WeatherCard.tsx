'use client';
import { FiDroplet, FiWind, FiCompass, FiMapPin, FiSunrise, FiSunset } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { WeatherCardProps } from '@/features/weather/types';
import { WEATHER_ICON_MAP } from '@/features/weather/constants/WeatherIcons';
import { useWeatherConditionLabel } from '@/features/weather/constants/Weather';

export default function WeatherCard({ weather, formattedTime, className = '' }: WeatherCardProps) {
  const t = useTranslations('WeatherCard');
  const getConditionLabel = useWeatherConditionLabel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={`Weather_Card relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl rounded-3xl p-4 sm:p-6 transition-all duration-300 ${className}`}
        role="article"
        aria-labelledby="weather-location"
      >
        <div className="flex justify-between items-start flex-col sm:flex-row mb-6 gap-4">
          {/* Location & temperature */}
          <div>
            <h3 
              id="weather-location"
              className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2 drop-shadow-sm"
            >
              <FiMapPin className="text-primary" />
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-yellow-300 animate-pulse shadow-md" aria-hidden="true"></span>
              {weather.name}
            </h3>
            <p className="text-4xl sm:text-5xl font-extrabold text-foreground drop-shadow-lg">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('feelsLike')} {Math.round(weather.main.feels_like)}°
            </p>
          </div>

          {/* Weather icon & condition */}
          <div className="flex flex-col items-end gap-1">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 100, duration: 8, repeat: Infinity }}
              aria-hidden="true"
              className="drop-shadow-lg"
            >
              {weather.weather[0]?.icon ? (
                WEATHER_ICON_MAP[weather.weather[0].icon] || WEATHER_ICON_MAP['01d']
              ) : (
                WEATHER_ICON_MAP['01d']
              )}
            </motion.div>
            <p className="text-xs text-primary mt-1 text-right capitalize">
              {getConditionLabel(weather.weather[0].main)} 
            </p>
          </div>
        </div>

        {/* Time updated */}
        <div className="text-xs text-primary/80 mb-6 font-medium">
          {formattedTime}
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" role="group" aria-label="Weather details">
          {/* Humidity */}
          <div className="bg-background/80 dark:bg-background/70 rounded-xl p-3 border border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FiDroplet size={16} className="text-primary drop-shadow" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{t('humidity')}</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">
              {weather.main.humidity}%
            </p>
          </div>

          {/* Wind */}
          <div className="bg-background/80 dark:bg-background/70 rounded-xl p-3 border border-border hover:border-green-400/40 transition-colors backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FiWind size={16} className="text-green-500 drop-shadow" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{t('wind')}</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">
              {weather.wind.speed.toFixed(1)} {t('m/s')}
            </p>
          </div>

          {/* Pressure */}
          <div className="bg-background/80 dark:bg-background/70 rounded-xl p-3 border border-border hover:border-yellow-400/40 transition-colors backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <FiCompass size={16} className="text-yellow-500 drop-shadow" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{t('pressure')}</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">
              {weather.main.pressure} {t('hpa')}
            </p>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6 px-2">
          <div className="flex items-center gap-2 text-xs text-yellow-600 drop-shadow">
            <FiSunrise />
            <span>{t('sunrise')}</span>
            <span className="font-semibold text-foreground">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 drop-shadow">
            <FiSunset />
            <span>{t('sunset')}</span>
            <span className="font-semibold text-foreground">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
