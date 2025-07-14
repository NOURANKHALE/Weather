/**
 * Represents the logic and state for the search bar UI.
 */
import { RefObject } from 'react';

export interface UseSearchBarLogic {
  localCity: string;
  isFocused: boolean;
  showHistoryDropdown: boolean;
  searchHistory: string[];
  selectedHistoryIndex: number;
  inputRef: RefObject<HTMLInputElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  handleClear: () => void;
  handleSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleLocationClick: () => void;
  handleHistoryItemClick: (historyItem: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  handleClearHistory: () => void;
  loading: boolean;
  error: string | null;
  weatherData: unknown;
  isGeolocation: boolean;
} 