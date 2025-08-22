'use client';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { SearchHistoryDropdownProps } from '@/features/search/types/SearchComponentPropsInterface';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function SearchHistoryDropdown({
  searchHistory,
  selectedIndex,
  onHistoryItemClick,
  onClearHistory,
}: SearchHistoryDropdownProps) {
  const t = useTranslations('Weather');

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute top-full left-0 right-0 mt-1 z-50",
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "rounded-lg shadow-lg overflow-hidden"
      )}
      role="listbox"
      id="search-history"
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-1 px-2 py-1">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <FiClock size={12} />
            {t('recentSearches')}
          </span>
          <button
            onClick={onClearHistory}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label={t('clearAllSearchHistory')}
          >
            {t('clearAllSearchHistory')}
          </button>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {searchHistory.map((item, index) => (
            <button
              key={index}
              id={`history-item-${index}`}
              onClick={() => onHistoryItemClick(item)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md",
                "hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors",
                "flex items-center gap-2",
                selectedIndex === index 
                  ? "bg-primary/10 text-primary dark:text-primary-300" 
                  : "text-gray-700 dark:text-gray-300"
              )}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <FiClock size={14} className="text-gray-400 dark:text-gray-500" />
              <span className="truncate">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}