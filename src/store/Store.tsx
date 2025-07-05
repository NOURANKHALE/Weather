import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import searchReducer from '../features/search/store/SearchSlice';
import weatherReducer from '@/features/weather/store/WeatherSlice';
import mapReducer from '../features/map/store/mapSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  weather: weatherReducer,
  map: mapReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search', 'weather', 'map'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
