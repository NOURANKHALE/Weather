import { SearchState } from './SearchStateInterface';

export interface UseGlobalSearchReturn extends SearchState {
  setCity: (value: string) => void;
  searchCity: (city: string) => void;
  debouncedSearch: (city: string) => void;
  searchByLocation: (lat: number, lon: number) => void;
  clearSearchResults: () => void;
  getCurrentLocation: () => void;
  getSearchHistory: () => string[];
  clearSearchHistory: () => void;
} 