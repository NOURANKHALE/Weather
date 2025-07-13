import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherApiService } from '@/features/weather/services/weatherApi';
import { SearchState } from '@/features/search/types/SearchStateInterface';

const initialState: SearchState = {
  city: '',
  weatherData: null,
  forecastData: null,
  loading: false,
  error: null,
  isGeolocation: false,
  lastSearchedLocation: null,
};

// Async thunk for searching by city
export const searchByCity = createAsyncThunk(
  'search/searchByCity',
  async (
    { city, locale }: { city: string; locale: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await WeatherApiService.fetchWeatherAndForecastByCity(city.trim(), locale);

      return {
        weather: result.weather,
        forecast: result.forecast,
        location: {
          lat: result.weather.coord.lat,
          lon: result.weather.coord.lon,
          name: result.weather.name,
        },
      };
    } catch (error: unknown) {
      const err = error as Error;
      return rejectWithValue(err.message || 'City not found');
    }
  }
);

// Async thunk for searching by coordinates
export const searchByCoords = createAsyncThunk(
  'search/searchByCoords',
  async (
    { lat, lon, locale }: { lat: number; lon: number; locale: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await WeatherApiService.fetchWeatherAndForecast(lat, lon, locale);

      return {
        weather: result.weather,
        forecast: result.forecast,
        location: {
          lat,
          lon,
          name: result.weather.name,
        },
      };
    } catch (error: unknown) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to fetch weather data');
    }
  }
);

// Slice definition
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;

      if (!action.payload) {
        state.weatherData = null;
        state.forecastData = null;
        state.error = null;
        state.isGeolocation = false;
      }
    },
    clearSearch: (state) => {
      state.city = '';
      state.weatherData = null;
      state.forecastData = null;
      state.error = null;
      state.isGeolocation = false;
      state.lastSearchedLocation = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isGeolocation = false;
      })
      .addCase(searchByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload.weather;
        state.forecastData = action.payload.forecast;
        state.lastSearchedLocation = action.payload.location;
        state.error = null;
        state.isGeolocation = false;
      })
      .addCase(searchByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isGeolocation = false;
      })
      .addCase(searchByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isGeolocation = true;
      })
      .addCase(searchByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload.weather;
        state.forecastData = action.payload.forecast;
        state.lastSearchedLocation = action.payload.location;
        state.error = null;
        state.isGeolocation = true;
      })
      .addCase(searchByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isGeolocation = true;
      });
  },
});

export const { setCity, clearSearch, setError, clearError } = searchSlice.actions;
export default searchSlice.reducer;
