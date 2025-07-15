'use client';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';
import { FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchBarLogic } from '@/features/search/hooks';
import { cn } from '@/lib/Utils';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchBarProps } from '@/features/search/types/SearchComponentPropsInterface';
import SearchInput from './SearchInput';
import SearchHistoryDropdown from './SearchHistoryDropdown';
import { useTranslations } from 'next-intl';

export default function SearchBar({ 
  showLocationButton = true, 
  variant = 'default',
  showHistory = true
}: SearchBarProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('Weather');
  
  const {
    localCity,
    isFocused,
    showHistoryDropdown,
    searchHistory,
    selectedHistoryIndex,
    handleClear,
    handleKeyDown,
    handleLocationClick,
    handleHistoryItemClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleClearHistory,
    loading,
  } = useSearchBarLogic(showHistory);

  return (
    <div className={cn("SearchBar w-full max-w-2xl mx-auto space-y-2 relative")}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex items-center gap-2 rounded-xl md:rounded-full transition-all relative",
          "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-md focus-within:shadow-md",
          variant === 'default' ? "h-14 px-4" : "h-12 px-3"
        )}
      >
        <SearchInput
          value={localCity}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClear={handleClear}
          placeholder={t('searchPlaceholder')}
          disabled={loading}
          isRTL={isRTL}
          variant={variant}
          isFocused={isFocused}
          showHistoryDropdown={showHistoryDropdown}
          selectedHistoryIndex={selectedHistoryIndex}
          className="flex-1"
        />

        {showLocationButton && (
          <Button
            onClick={handleLocationClick}
            disabled={loading}
            variant="ghost"
            size={variant === 'default' ? 'default' : 'sm'}
            className={cn(
              "shrink-0 rounded-full",
              "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary",
              "hover:bg-gray-100/50 dark:hover:bg-gray-700/50",
              variant === 'default' ? "w-10 h-10" : "w-8 h-8"
            )}
            aria-label={t('useCurrentLocation')}
          >
            {loading ? <Skeleton className="h-5 w-5 rounded-full" /> : <FiMapPin size={variant === 'default' ? 18 : 16} />}
          </Button>
        )}
      </motion.div>

      <AnimatePresence>
        {showHistoryDropdown && showHistory && searchHistory.length > 0 && (
          <SearchHistoryDropdown
            searchHistory={searchHistory}
            selectedIndex={selectedHistoryIndex}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={handleClearHistory}
            isRTL={isRTL}
          />
        )}
      </AnimatePresence>

      
    </div>
  );
}