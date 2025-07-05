import { WeatherStatCardProps } from '@/features/forecast/types/WeatherStatCardPropsInterface';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
export default function WeatherStatCard({ 
  icon: Icon, 
  iconClass,
  title, 
  value, 
  description, 
}: WeatherStatCardProps) {

  return (
    <Card
      className={`Weather_StatsCard relative overflow-hidden w-full min-w-[12rem] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl bg-white/80 dark:bg-gray-900/80 transition-all duration-300 flex flex-col items-center hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-200/40 group`}
      tabIndex={0}
    >
      {/* Shine effect */}
      <span className="pointer-events-none absolute -top-1/2 left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-teal-100/30 via-yellow-100/20 to-transparent opacity-0 group-hover:opacity-60 animate-shine rounded-3xl" />
      <motion.div
        className="w-16 h-16 flex items-center justify-center rounded-full  border-2 border-white/60 mb-3 mt-1"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <Icon className={iconClass} />
      </motion.div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1 text-center drop-shadow-sm">{title}</h3>
      <span className="text-3xl font-extrabold text-teal-800 dark:text-teal-200 mb-1 drop-shadow-sm font-sans text-center">{value}</span>
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-1 px-2">{description}</p>
    </Card>
  );
}
