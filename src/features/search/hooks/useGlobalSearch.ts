import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {setCity,clearSearch,setError,searchByCity,searchByCoords} from '@/features/search/store/SearchSlice';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';
import { debounce } from '@/lib/utils/api';
import { storageHelpers } from '@/lib/utils/Storage';
import { UI_CONFIG } from '@/constants/Constants';
import { UseGlobalSearchReturn } from '@/features/search/types/UseGlobalSearchReturnInterface';
import { setUserWeatherAndForecast } from '@/features/map/store/MapSlice';

/**
 * Custom hook to centralize search logic, including debounced search, geolocation, search history, and state management.
 * @returns All search state, actions, and helpers for global search functionality
 */


export const useGlobalSearch = (): UseGlobalSearchReturn => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const searchState = useAppSelector((state) => state.search);

  /**
   * Debounced search function for city names.
   */
  const debouncedSearch = useMemo(() => {
    return debounce((...args: unknown[]) => {
      const city = args[0] as string;
      if (city.trim()) {
        dispatch(searchByCity({ city: city.trim(), locale }));
        storageHelpers.addToSearchHistory(city.trim());
      }
    }, UI_CONFIG.debounceDelay);
  }, [dispatch, locale]);

  /**
   * Regular search for city names.
   */
  const searchCity = useCallback(
    (city: string) => {
      if (city.trim()) {
        dispatch(searchByCity({ city: city.trim(), locale }));
        storageHelpers.addToSearchHistory(city.trim());
      }
    },
    [dispatch, locale]
  );

  /**
   * Search by coordinates.
   */
  const searchByLocation = useCallback(
    (lat: number, lon: number) => {
      dispatch(searchByCoords({ lat, lon, locale }));
      storageHelpers.setLastLocation({ lat, lon, name: 'Current Location' });
    },
    [dispatch, locale]
  );

  /**
   * Clear search results.
   */
  const clearSearchResults = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  /**
   * Get current location using browser geolocation.
   */
  const getCurrentLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          searchByLocation(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', {
            code: error.code,
            message: error.message,
            error
          });
          dispatch(setError('Unable to get your location'));
        }
      );
    } else {
      dispatch(setError('Geolocation is not supported by this browser'));
    }
  }, [dispatch, searchByLocation]);

  /**
   * Set the city value in the search state.
   */
  const setCityValue = useCallback(
    (value: string) => {
      dispatch(setCity(value));
    },
    [dispatch]
  );

  /**
   * Get search history from storage.
   */
  const getSearchHistory = useCallback((): string[] => {
    return storageHelpers.getSearchHistory();
  }, []);

  /**
   * Clear search history from storage.
   */
  const clearSearchHistory = useCallback(() => {
    storageHelpers.clearSearchHistory();
  }, []);

  // Load last location on mount
  useEffect(() => {
    const lastLocation = storageHelpers.getLastLocation();
    if (lastLocation && !searchState.weatherData && !searchState.loading) {
      const { lat, lon } = lastLocation;
      searchByLocation(lat, lon);
    }
  }, [searchByLocation, searchState.weatherData, searchState.loading]);

  // Sync search results to map slice
  useEffect(() => {
    if (searchState.weatherData && searchState.forecastData) {
      dispatch(
        setUserWeatherAndForecast({
          userWeather: searchState.weatherData,
          forecast: searchState.forecastData
        })
      );
    }
  }, [searchState.weatherData, searchState.forecastData, dispatch]);

  return {
    ...searchState,
    setCity: setCityValue,
    searchCity,
    debouncedSearch,
    searchByLocation,
    clearSearchResults,
    getCurrentLocation,
    getSearchHistory,
    clearSearchHistory
  };
};
