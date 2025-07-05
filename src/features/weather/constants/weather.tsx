import { useTranslations } from 'next-intl';

export const useWeatherConditionLabel = () => {
  const t = useTranslations('Weather');
  return (condition: string) => {
    switch (condition) {
      case 'Clear': return t('clear');
      case 'Clouds': return t('clouds');
      case 'Rain': return t('rain');
      case 'Snow': return t('snow');
      case 'Thunderstorm': return t('thunderstorm');
      case 'Fog': return t('fog');
      case 'Mist': return t('mist');
      case 'Drizzle': return t('drizzle');
      case 'Haze': return t('haze');
      case 'Smoke': return t('smoke');
      case 'Dust': return t('dust');
      case 'Sand': return t('sand');
      case 'Ash': return t('ash');
      case 'Squall': return t('squall');
      case 'Tornado': return t('tornado');
      default: return condition;
    }
  };
}; 