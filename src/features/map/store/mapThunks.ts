import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApiService } from '@/features/weather/services/WeatherApiService';

export type MapTab = 'analytics' | 'map';
export type Locale = 'en' | 'ar'; 

export const fetchCityWeather = createAsyncThunk(
  'map/fetchCityWeather',
  async ({ city, locale }: { city: string; locale: Locale }, { rejectWithValue }) => {
    try {
      const result = await WeatherApiService.fetchWeatherAndForecastByCity(city.trim(), locale);
      return {
        cityData: result.weather,
        forecast: result.forecast,
        center: { lat: result.weather.coord.lat, lon: result.weather.coord.lon },
        userLocation: { lat: result.weather.coord.lat, lon: result.weather.coord.lon },
      };
    } catch {
      return rejectWithValue('cityNotFound');
    }
  }
);

export const fetchUserLocationWeather = createAsyncThunk(
  'map/fetchUserLocationWeather',
  async (
    { latitude, longitude, locale }: { latitude: number; longitude: number; locale: Locale },
    { rejectWithValue }
  ) => {
    try {
      const result = await WeatherApiService.fetchWeatherAndForecast(latitude, longitude, locale);
      return {
        userWeather: result.weather,
        forecast: result.forecast,
        center: { lat: latitude, lon: longitude },
        userLocation: { lat: latitude, lon: longitude },
      };
    } catch {
      return rejectWithValue('fetchWeatherError');
    }
  }
);
