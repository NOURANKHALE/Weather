'use client';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInputProps } from '@/features/search/types/SearchComponentPropsInterface';
import { cn } from '@/lib/utils';
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
  className
}: SearchInputProps) {
  const t = useTranslations('Weather');

  return (
    <div className={cn(
      "Search_Input relative flex-1 flex items-center h-full",
      className
    )}>
      <FiSearch 
        className={cn(
          "text-gray-400 dark:text-gray-500",
          "absolute",
          isRTL ? "right-3" : "left-3",
          variant === 'default' ? "w-5 h-5" : "w-4 h-4"
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
          variant === 'default' ? "text-base" : "text-sm"
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
        disabled={disabled}
        aria-label={t('searchPlaceholder')}
        aria-describedby={showHistoryDropdown ? "search-history" : undefined}
        aria-expanded={showHistoryDropdown}
        aria-autocomplete="list"
        role="combobox"
        aria-activedescendant={
          selectedHistoryIndex >= 0 ? `history-item-${selectedHistoryIndex}` : undefined
        }
      />
      
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
    </div>
  );
}