// features/weather/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApiService } from '@/features/weather/services/weatherApi';
import { WeatherState, WeatherApiResponse } from '@/features/weather/types';

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon, locale }: { lat: number; lon: number; locale: string }): Promise<WeatherApiResponse> => {
    const result = await WeatherApiService.fetchWeatherAndForecast(lat, lon, locale);
    return result;
  }
);

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async ({ city, locale }: { city: string; locale: string }): Promise<WeatherApiResponse> => {
    const result = await WeatherApiService.fetchWeatherAndForecastByCity(city, locale);
    return result;
  }
);

const initialState: WeatherState = {
  data: null,
  forecast: null,
  loading: false,
  error: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.weather;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.weather;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setError } = weatherSlice.actions;
export default weatherSlice.reducer;
