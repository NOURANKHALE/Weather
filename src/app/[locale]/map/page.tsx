'use client';
import { useEffect ,useMemo} from 'react';
import dynamic from "next/dynamic";
import { useLocale } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setActiveTab } from '@/features/map/store/MapSlice';
import { useLocationWeather } from '@/features/map/hooks/useLocationWeather';
import MapTabsPage from '@/features/map/components/MapTabsPage';
import ErrorPage from '@/components/ErrorPage';
import { fetchUserLocationWeather } from '@/features/map/store/MapThunks';

const WeatherMapClient = dynamic(() => import('../../../features/map/components/WeatherMap'), { ssr: false });
const LOCATION_PERMISSION_STORAGE_KEY = 'locationPermissionRequested';

export default function WeatherDashboard() {
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.map.userWeather);
  const forecastData = useAppSelector((state) => state.map.forecast);
  const userLocation = useAppSelector((state) => state.map.userLocation);
  const activeTab = useAppSelector((state) => state.map.activeTab);

  const {
    geoError,
    alertRef,
  } = useLocationWeather({ searchCity: weatherData?.name ?? null });

  // Derived data for map analytics
  const analyticsForecast = useMemo(() => forecastData || [], [forecastData]);

  const forecastDataForMap = useMemo(() =>
    analyticsForecast.slice(0, 8).filter(Boolean).map(item => ({
      time: item?.dt_txt?.split(' ')[1]?.slice(0, 5) || '',
      temp: item?.main?.temp ?? 0,
      humidity: item?.main?.humidity ?? 0,
      wind: item?.wind?.speed ?? 0,
      condition: item?.weather?.[0]?.main || 'Other',
    }))
  , [analyticsForecast]);

  // Automatically request geolocation on mount if no data exists and permission is granted
  useEffect(() => {
    if (!weatherData && typeof window !== 'undefined') {
      if (localStorage.getItem(LOCATION_PERMISSION_STORAGE_KEY)) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              dispatch(fetchUserLocationWeather({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                locale: locale as 'en' | 'ar',
              }));
            },
          );
        }
      }
    }
  }, [weatherData, dispatch, locale]);

  if (!weatherData) {
    return <ErrorPage locale={locale} />;
  }

  return (
    <div className="Map_Page container mx-auto px-4 py-6" dir={direction}>
      <MapTabsPage
        activeTab={activeTab}
        setActiveTab={(tab) => dispatch(setActiveTab(tab))}
        lastSearchedCity={weatherData}
        userWeather={weatherData}
        userLocation={weatherData?.coord ? { lat: weatherData.coord.lat, lon: weatherData.coord.lon } : userLocation as { lat: number; lon: number }}
        direction={direction}
        WeatherMapClient={WeatherMapClient as unknown as React.ComponentType<Record<string, unknown>>}
        geoError={geoError}
        alertRef={alertRef}
        forecastData={forecastDataForMap}
        analyticsForecast={analyticsForecast}
        locale={locale}
      />
    </div>
  );
}