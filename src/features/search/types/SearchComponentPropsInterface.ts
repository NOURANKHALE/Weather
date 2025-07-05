export interface SearchBarProps {
  showLocationButton?: boolean;
  className?: string;
  variant?: 'default' | 'minimal';
  showHistory?: boolean;
}

export interface SearchHistoryDropdownProps {
  searchHistory: string[];
  selectedIndex: number;
  onHistoryItemClick: (item: string) => void;
  onClearHistory: () => void;
  isRTL: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  placeholder: string;
  disabled: boolean;
  isRTL: boolean;
  variant: 'default' | 'minimal';
  isFocused: boolean;
  showHistoryDropdown: boolean;
  selectedHistoryIndex: number;
  className?: string;
} 