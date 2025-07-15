import { FiThermometer, FiDroplet, FiWind, FiSun } from 'react-icons/fi';
import { WeatherStatCard } from '@/features/weather/types/WeatherStatCardPropsInterface';
import { WeatherData } from '@/features/weather/types/WeatherDataInterfaces';

type TranslationFunction = (key: string) => string;

/**
 * Custom hook to return an array of weather stat card data for display, including temperature, humidity, wind, and UV index.
 * @param weatherData - Weather data object
 * @param t - Translation function
 * @returns Array of WeatherStatCard objects
 */

export default function useWeatherStatCards(
  weatherData: WeatherData,
  t: TranslationFunction
): WeatherStatCard[] {
  return [
    {
      id: 'highLow',
      icon: FiThermometer,
      iconClass: "text-teal-500 w-6 h-6 md:w-8 md:h-8",
      title: t('highLow'),
      value: `${Math.round(weatherData.main.temp_max)}° / ${Math.round(weatherData.main.temp_min)}°`,
      description: t('dailyRange'),
      accent: 'border-teal-200',
    },
    {
      id: 'avgHumidity',
      icon: FiDroplet,
      iconClass: "text-blue-400 w-6 h-6 md:w-8 md:h-8",
      title: t('avgHumidity'),
      value: `${weatherData.main.humidity}%`,
      description: t('currentHumidity'),
      accent: 'border-blue-100',
    },
    {
      id: 'avgWind',
      icon: FiWind,
      iconClass: "text-green-500 w-6 h-6 md:w-8 md:h-8",
      title: t('avgWind'),
      value: `${weatherData.wind.speed.toFixed(1)} ${t('m/s')}`,
      description: t('windSpeed'),
      accent: 'border-green-200',
    },
    {
      id: 'uvIndex',
      icon: FiSun,
      iconClass: "text-yellow-500 w-6 h-6 md:w-8 md:h-8",
      title: t('uvIndex'),
      value: '5', // TODO: Replace with real UV index if available
      description: t('uvLevel'),
      accent: 'border-yellow-200',
    },
  ];
}
