import { useState, useRef, useEffect, useCallback } from 'react';
import { useGlobalSearch } from './useGlobalSearch';

export const useSearchBarLogic = (showHistory = true) => {
  const {
    city,
    loading,
    error,
    weatherData,
    isGeolocation,
    setCity,
    searchCity,
    debouncedSearch,
    getCurrentLocation,
    getSearchHistory,
    clearSearchHistory
  } = useGlobalSearch();

  const [localCity, setLocalCity] = useState(city);
  const [isFocused, setIsFocused] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Sync local city with global city
  useEffect(() => {
    setLocalCity(city);
  }, [city]);

  // Load search history
  useEffect(() => {
    if (showHistory) {
      setSearchHistory(getSearchHistory());
    }
  }, [showHistory, getSearchHistory]);

  const handleClear = useCallback(() => {
    setLocalCity('');
    setCity('');
    setShowHistoryDropdown(false);
    setSelectedHistoryIndex(-1);
    inputRef.current?.focus();
  }, [setCity]);

  const handleSearch = useCallback(() => {
    if (localCity.trim()) {
      searchCity(localCity);
      setShowHistoryDropdown(false);
      setSelectedHistoryIndex(-1);
    }
  }, [localCity, searchCity]);

  const handleDebouncedSearch = useCallback((value: string) => {
    if (value.trim()) {
      debouncedSearch(value);
    }
  }, [debouncedSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedHistoryIndex >= 0 && searchHistory[selectedHistoryIndex]) {
        handleHistoryItemClick(searchHistory[selectedHistoryIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedHistoryIndex(prev => 
        prev < searchHistory.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedHistoryIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowHistoryDropdown(false);
      setSelectedHistoryIndex(-1);
      inputRef.current?.blur();
    }
  }, [selectedHistoryIndex, searchHistory, handleSearch]);

  const handleLocationClick = useCallback(() => {
    getCurrentLocation();
    setShowHistoryDropdown(false);
    setSelectedHistoryIndex(-1);
  }, [getCurrentLocation]);

  const handleHistoryItemClick = useCallback((historyItem: string) => {
    setLocalCity(historyItem);
    setCity(historyItem);
    searchCity(historyItem);
    setShowHistoryDropdown(false);
    setSelectedHistoryIndex(-1);
  }, [setCity, searchCity]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalCity(value);
    setCity(value);
    setSelectedHistoryIndex(-1);
    
    setShowHistoryDropdown(value.length > 0 && searchHistory.length > 0);
  }, [setCity, searchHistory.length]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    if (localCity.length > 0 && searchHistory.length > 0) {
      setShowHistoryDropdown(true);
    }
  }, [localCity.length, searchHistory.length]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // Delay hiding dropdown to allow clicking on history items
    setTimeout(() => {
      setShowHistoryDropdown(false);
      setSelectedHistoryIndex(-1);
    }, 200);
  }, []);

  const handleClearHistory = useCallback(() => {
    clearSearchHistory();
    setSearchHistory([]);
  }, [clearSearchHistory]);

  return {
    // State
    localCity,
    isFocused,
    showHistoryDropdown,
    searchHistory,
    selectedHistoryIndex,
    inputRef,
    historyRef,
    
    // Actions
    handleClear,
    handleSearch,
    handleKeyDown,
    handleLocationClick,
    handleHistoryItemClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleClearHistory,
    
    // Global state
    loading,
    error,
    weatherData,
    isGeolocation
  };
}; 