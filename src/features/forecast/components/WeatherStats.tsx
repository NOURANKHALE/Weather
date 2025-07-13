import { useTranslations } from 'next-intl';
import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';
import WeatherStatCard from './WeatherStatCard';
import SortableGrid from '@/components/SortableGrid';
import  useWeatherStatCards  from '@/features/weather/hooks/useWeatherStatCards';

interface WeatherStatsProps {
  weatherData: WeatherData;
}

export default function WeatherStats({ weatherData }: WeatherStatsProps) {
  const t = useTranslations("WeatherCard");
  const statCards = useWeatherStatCards(weatherData, t);

  return (
    <SortableGrid
      items={statCards}
      storageKey="weather_stat_card_order"
      getItemId={item => item.id}
      renderItem={(item) => (
        <WeatherStatCard {...item} />
      )}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    />
  );
}