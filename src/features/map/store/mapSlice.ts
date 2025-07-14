import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapState } from '@/features/map/types/MapSliceInterface';
import { fetchCityWeather, fetchUserLocationWeather } from './mapThunks';
export type MapTab = 'analytics' | 'map' | 'overview';

const initialState: MapState = {
  userLocation: null,
  forecast: [],
  userWeather: null,
  activeTab: 'overview',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<MapTab>) {
      state.activeTab = action.payload;
    },
    setUserWeatherAndForecast(state, action: PayloadAction<{ userWeather: import('@/features/weather/types/WeatherDataInterfaces').WeatherData; forecast: import('@/features/forecast/types/ForecastDataInterface').ForecastItem[] }>) {
      state.userWeather = action.payload.userWeather;
      state.forecast = action.payload.forecast;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.userWeather = action.payload.cityData;
        state.forecast = action.payload.forecast;
        state.userLocation = action.payload.userLocation;
      })
      .addCase(fetchCityWeather.rejected, (state) => {
        state.userWeather = null;
        state.forecast = [];
      })
      .addCase(fetchUserLocationWeather.fulfilled, (state, action) => {
        state.userWeather = action.payload.userWeather;
        state.forecast = action.payload.forecast;
        state.userLocation = action.payload.userLocation;
      })
      .addCase(fetchUserLocationWeather.rejected, (state) => {
        state.userWeather = null;
        state.forecast = [];
      });
  },
});

export const { setActiveTab, setUserWeatherAndForecast } = mapSlice.actions;
export default mapSlice.reducer; 