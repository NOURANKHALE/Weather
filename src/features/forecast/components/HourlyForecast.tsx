'use client';
import { motion } from 'framer-motion';
import { FiDroplet, FiWind } from "react-icons/fi";
import { HourlyForecastProps } from "@/features/forecast/types/HourlyForecastPropsInterface";
import { getWeatherIcon } from '@/features/weather/constants/weathericon';
import { useTranslations } from 'next-intl';

export default function HourlyForecast({ forecastData, forecast }: HourlyForecastProps) {
  const now = new Date();
  const currentHour = now.getHours();
  const t = useTranslations('Weather');

  const temps = forecastData.map(item => item.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl p-10 shadow-xl w-full"
    >
      <div className="Hourly_Forecast flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-300 via-yellow-200 to-green-200 shadow-md"
            />
            <h2 className="text-xl font-semibold">
              {t('hourlyForecast')}
            </h2>
          </div>

          <span className="text-xs bg-gradient-to-r from-teal-100/40 to-yellow-100/40 text-teal-700 dark:text-teal-200 px-3 py-1 rounded-full border border-teal-200/40 dark:border-teal-400/30 font-semibold shadow-sm">
            {t('next24Hours')}
          </span>
        </div>

        {/* Forecast Scrollable Cards */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x snap-mandatory">
            <div className="flex gap-4 min-w-max relative z-10">
              {forecastData.map((item, idx) => {
                const iconCode = forecast[idx]?.weather?.[0]?.icon;
                const hour = parseInt(item.time.split(':')[0]);
                const isCurrent = hour === currentHour;
                const isDaytime = hour >= 6 && hour < 18;
                const tempPosition = ((item.temp - minTemp) / tempRange) * 100;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.01 }}
                    whileHover={{ y: -5 }}
                    className={`snap-start flex flex-col items-center gap-3 p-3 rounded-xl min-w-[80px] transition-all duration-300 shadow-md ${
                      isCurrent 
                        ? 'bg-gradient-to-br from-teal-100/5 via-yellow-300/20 to-white/30 border border-teal-300/40' 
                        : 'hover:bg-white/30 hover:backdrop-blur-sm border border-transparent'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <p 
                        title={`${item.time}`} 
                        className={`text-sm font-medium transition-colors ${
                          isCurrent ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {item.time}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-2 rounded-full shadow-md transition-all ${
                          isCurrent ? 'bg-teal-200/40' : 'bg-white/40'
                        }`}
                      >
                        {iconCode ? getWeatherIcon(iconCode, 32) : getWeatherIcon('01d', 32)}
                      </motion.div>
                    </div>

                    {/* Temperature Bar */}
                    <div className="w-full flex flex-col items-center">
                      <div className="relative w-1 h-16 bg-gradient-to-t from-teal-300 via-yellow-200 to-green-200 rounded-full mb-1 shadow-sm">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${tempPosition}%` }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                          className={`absolute bottom-0 w-full rounded-full shadow ${
                            isDaytime ? 'bg-yellow-300/80' : 'bg-teal-300/80'
                          }`}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.6 }}
                          className={`absolute -left-2 -right-2 h-1 rounded-full shadow ${
                            isDaytime ? 'bg-yellow-200/30' : 'bg-teal-200/30'
                          }`}
                          style={{ bottom: `${tempPosition}%` }}
                        />
                      </div>
                      <p className={`text-lg font-bold drop-shadow-md transition-colors ${
                        isCurrent ? 'text-teal-700' : 'text-muted-foreground'
                      }`}>
                        {Math.round(item.temp)}°
                      </p>
                    </div>

                    {/* Weather Details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: { duration: 0.2 }
                      }}
                      className="overflow-hidden text-xs text-center text-teal-700/80 font-medium"
                    >
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <span className="flex items-center gap-1">
                          <FiDroplet size={12} className="text-teal-500 drop-shadow" />
                          <span>{t('humidity')}: {item.humidity}%</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FiWind size={12} className="text-green-500 drop-shadow" />
                          {item.wind.toFixed(1)} {t('m/s')}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
