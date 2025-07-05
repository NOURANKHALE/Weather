import React from 'react';
import { useTranslations } from 'next-intl';

export default function ForecastHeader() {
  const t = useTranslations("WeatherCard");

  return (
    <div className="Forecast_Header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {t('weeklyForecast')}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {t('next7Days')}
        </p>
      </div>
    </div>
  );
}