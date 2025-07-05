import { DailyForecastCardProps} from '@/features/forecast/types/DailyForecastCardPropsInterface';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DailyForecastCard({ 
  date, 
  minTemp, 
  maxTemp, 
  avgTemp, 
  icon, 
  locale 
}: Omit<DailyForecastCardProps, 'isToday'>) {
  const t = useTranslations('Weather');

  return (
    <Card
      className="Daily_Forecast_Card relative w-48 min-w-[12rem] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl bg-white/80 dark:bg-gray-900/80 transition-all duration-300 flex flex-col items-center hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-200/40"
      tabIndex={0}
    >
      <div className="flex flex-col items-center w-full">
        <motion.div
          className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 shadow-inner border-2 border-white/60 mb-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          {icon}
        </motion.div>
        <p className="text-lg font-semibold text-teal-700 dark:text-teal-300">
          {new Date(date).toLocaleDateString(locale, { weekday: 'short' })}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {new Date(date).toLocaleDateString(locale, { day: 'numeric', month: 'short' })}
        </p>
        <span className="text-3xl font-extrabold text-teal-500 dark:text-teal-300 mb-3 drop-shadow-sm font-sans">
          {Math.round(avgTemp)}°
        </span>
        <div className="flex flex-col w-full gap-1.5 px-2">
          <Badge className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium w-full justify-between">
            <span>{t('minTemp')}</span>
            <span>{Math.round(minTemp)}°</span>
          </Badge>
          <Badge className="bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium w-full justify-between">
            <span>{t('maxTemp')}</span>
            <span>{Math.round(maxTemp)}°</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
}