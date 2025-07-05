import { FiThermometer, FiDroplet, FiWind, FiSun } from 'react-icons/fi';

export default function useWeatherStatCards(weatherData: any, t: any) {
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
      value: '5',
      description: t('uvLevel'),
      accent: 'border-yellow-200',
    },
  ];
} 