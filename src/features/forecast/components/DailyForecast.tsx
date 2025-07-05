import { useTranslations, useLocale } from 'next-intl';
import { ForecastItem } from '@/features/forecast/types/ForecastDataInterface';
import DailyForecastCard from '@/features/forecast/components/DailyForecastCard';
import SortableGrid from '@/components/SortableGrid';
import { useDailyForecastCards } from '@/features/forecast/hooks/useDailyForecastCards';

interface DailyForecastProps {
  dailyForecast: Record<string, ForecastItem[]>;
}

export default function DailyForecast({ dailyForecast }: DailyForecastProps) {
  const t = useTranslations("WeatherCard");
  const locale = useLocale();

  const forecastCards = useDailyForecastCards(dailyForecast, locale);

  return (
    <section className="Daily_Forecast relative py-8 px-2  rounded-3xl shadow-inner">
      <h2 className="text-3xl font-bold mb-8  flex items-center gap-3">
        <span className="inline-block w-2 h-12 bg-primary rounded-full mr-2" />
        {t('weeklyForecast')}
      </h2>
      <SortableGrid
        items={forecastCards}
        storageKey="forecast_card_order"
        getItemId={item => item.date}
        renderItem={(item, isDragging) => (
          <div className={isDragging ? 'ring-2 ring-yellow-400 scale-105' : ''}>
            <DailyForecastCard {...item} />
          </div>
        )}
        className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 overflow-x-auto pb-4 px-1 hide-scrollbar snap-x snap-mandatory"
      />
    </section>
  );
} 