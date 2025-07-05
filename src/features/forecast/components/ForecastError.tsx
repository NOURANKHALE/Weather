import { useTranslations } from 'next-intl';

interface ForecastErrorProps {
  error: string;
}

export default function ForecastError({ error }: ForecastErrorProps) {
  const t = useTranslations("WeatherCard");
  return (
    <div className="Error_Page flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-destructive mb-2">{t('errorTitle')}</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
      </div>
    </div>
  );
} 