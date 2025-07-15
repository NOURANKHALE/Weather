'use client';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInputProps } from '@/features/search/types/SearchComponentPropsInterface';
import { cn } from '@/lib/Utils';
import { useTranslations } from 'next-intl';

export default function SearchInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  onClear,
  placeholder,
  disabled,
  isRTL,
  variant,
  showHistoryDropdown,
  selectedHistoryIndex,
  searchHistory = [], 
  onHistoryItemClick, 
}: SearchInputProps & {
  searchHistory?: string[];
  onHistoryItemClick?: (item: string) => void;
}) {
  const t = useTranslations('Weather');

  return (
    <div className="Search_Input relative w-full">
      <FiSearch 
        className={cn(
          "text-gray-400 dark:text-gray-500 absolute top-3",
          isRTL ? "right-3" : "left-4",
          variant === 'default' ? "w-4 h-4" : "w-3 h-3"
        )} 
      />

      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          "w-full h-full bg-transparent border-none outline-none",
          "text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
          "focus:ring-0 focus:outline-none",
          isRTL ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left",
          variant === 'default' ? "text-base py-2" : "text-sm py-1"
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
        disabled={disabled}
        aria-label={t('searchPlaceholder')}
        aria-controls={showHistoryDropdown ? "search-history" : undefined}
        aria-expanded={showHistoryDropdown}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        role="combobox"
        aria-activedescendant={
          selectedHistoryIndex >= 0
            ? `history-item-${selectedHistoryIndex}`
            : undefined
        }
      />

      {/* Clear Button */}
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={onClear}
            className={cn(
              "absolute p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
              "hover:bg-gray-100/50 dark:hover:bg-gray-700/50",
              isRTL ? "left-2" : "right-2"
            )}
            aria-label={t('clearSearch')}
          >
            <FiX size={variant === 'default' ? 18 : 16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Optional Search History Dropdown */}
      <AnimatePresence>
        {showHistoryDropdown && searchHistory.length > 0 && (
          <motion.div
            id="search-history"
            role="listbox"
            className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-auto max-h-60"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {searchHistory.map((item, index) => (
              <div
                key={item}
                id={`history-item-${index}`}
                role="option"
                aria-selected={selectedHistoryIndex === index}
                className={cn(
                  "px-4 py-2 cursor-pointer text-sm",
                  selectedHistoryIndex === index
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onMouseDown={(e) => {
                  // Prevent input blur before click
                  e.preventDefault();
                  onHistoryItemClick?.(item);
                }}
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
