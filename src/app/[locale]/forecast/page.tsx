'use client';
import { useLocale } from 'next-intl';
import { useForecast } from '@/features/forecast/hooks/useForecast';
import {ForecastHeader,WeatherStats,DailyForecast,ForecastLoading} from '@/features/forecast/components';
import ErrorPage from '@/components/ErrorPage';

export default function ForecastPage() {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  
  const {weatherData,loading,dailyForecast,error} = useForecast();

  if (loading) {
    return <ForecastLoading />;
  }

  if (error) {
    return <ErrorPage locale={locale} />;
  }

  return (
    <div className="Forecast_Page space-y-8 p-6" dir={direction}>
      <ForecastHeader />
      {weatherData && <WeatherStats weatherData={weatherData} />}
      <DailyForecast dailyForecast={dailyForecast} />
    </div>
  );
}