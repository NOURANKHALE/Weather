'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import WeatherDisplay from '@/features/weather/components/WeatherDisplay'
import { FiSun, FiClock } from 'react-icons/fi'
import { useGlobalSearch } from '@/features/search/hooks'
import ErrorPage from '@/components/ErrorPage'
import { useTranslations } from 'next-intl'
import { useIsMobile } from '@/hooks/usemobile'

export default function HomePage() {
  let { locale } = useParams();
  locale = Array.isArray(locale) ? locale[0] : locale;
  const isMobile = useIsMobile();
  const { error } = useGlobalSearch();
  const t = useTranslations('Home');

  if (error) {
    return (
      <ErrorPage
        locale={locale}
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center  overflow-x-hidden "
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FiSun className="absolute top-10 left-10 text-amber-300 opacity-30 animate-spin-slow w-12 h-12 md:w-20 md:h-20" />
      </div>

      <main className="Home_Page relative z-10 w-full flex flex-col items-center pt-4 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6">
        <section className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch justify-center">
            {/* Left: WeatherCard with header */}
            <div className="w-full lg:flex-[3] max-w-2xl flex flex-col gap-4 min-w-0">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <FiSun className="text-amber-400 w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-base md:text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
                  {t('now')}
                </h2>
              </div>
              <WeatherDisplay section="weather" />
            </div>

            {/* Divider - Hidden on mobile, vertical on desktop */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-0.5 h-96 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent rounded-full opacity-60"></div>
            </div>

            {/* Right: HourlyForecast with header */}
            <div className="w-full  max-w-xl flex flex-col gap-5 min-w-0 mt-6 lg:mt-0">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <FiClock className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-base md:text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
                  {t('nextHours')}
                </h2>
              </div>
              <WeatherDisplay section="hourly" />
            </div>
          </div>
        </section>
      </main>

      {/* Floating Tip */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className={`fixed ${isMobile ? 'bottom-6 inset-x-0 mx-auto w-max' : locale === 'ar' ? 'top-22 left-4' : 'top-22 right-4'} z-30`}
      >
        <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl px-4 py-2 md:px-5 md:py-3 shadow-lg md:shadow-2xl border border-white/20 dark:border-gray-700/40 hover:scale-105 transition-transform cursor-pointer">
          <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-200 to-yellow-400 dark:from-yellow-500 dark:to-yellow-300 shadow-md animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-yellow-700 dark:text-yellow-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m7-7h2M3 12H5m12.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414m12.728 0l-1.414-1.414M4.222 4.222l1.414 1.414M12 7a5 5 0 00-5 5c0 2.5 2 4.5 5 4.5s5-2 5-4.5a5 5 0 00-5-5z" />
            </svg>
          </span>
          <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-100">
            {t('tip')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}