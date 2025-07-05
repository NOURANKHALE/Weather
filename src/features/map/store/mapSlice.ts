import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapState } from '@/features/map/types/MapSliceInterface';
import { fetchCityWeather, fetchUserLocationWeather } from './mapThunks';
export type MapTab = 'analytics' | 'map';
export type Locale = 'en' | 'ar'; 
const initialState: MapState = {
  center: { lat: 30.0444, lon: 31.2357 },
  userLocation: null,
  forecast: [],
  loading: false,
  error: null,
  userWeather: null,
  lastSearchedCity: null,
  activeTab: 'analytics',
  locale: 'en',
  showLocationPermissionDialog: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<MapTab>) {
      state.activeTab = action.payload;
    },
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    openLocationPermissionDialog(state) {
      state.showLocationPermissionDialog = true;
    },
    closeLocationPermissionDialog(state) {
      state.showLocationPermissionDialog = false;
    },
    setUserWeatherAndForecast(state, action: PayloadAction<{ userWeather: import('@/features/weather/types/WeatherDataInterfaces').WeatherData; forecast: import('@/features/forecast/types/ForecastDataInterface').ForecastItem[] }>) {
      state.userWeather = action.payload.userWeather;
      state.forecast = action.payload.forecast;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch weather by city
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userWeather = action.payload.cityData;
        state.forecast = action.payload.forecast;
        state.center = action.payload.center;
        state.userLocation = action.payload.userLocation;
        state.lastSearchedCity = action.payload.cityData;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'cityNotFound';
        state.userWeather = null;
        state.forecast = [];
      })
      // Fetch weather by user location
      .addCase(fetchUserLocationWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLocationWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userWeather = action.payload.userWeather;
        state.forecast = action.payload.forecast;
        state.center = action.payload.center;
        state.userLocation = action.payload.userLocation;
        state.lastSearchedCity = null;
      })
      .addCase(fetchUserLocationWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'fetchWeatherError';
        state.userWeather = null;
        state.forecast = [];
      });
  },
});

export const { setActiveTab, setLocale, setError, clearError, openLocationPermissionDialog, closeLocationPermissionDialog, setUserWeatherAndForecast } = mapSlice.actions;
export default mapSlice.reducer; 