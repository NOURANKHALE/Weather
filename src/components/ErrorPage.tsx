import React from 'react';
import { FiSearch} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface NoResultsProps {
  searchQuery?: string;
  locale?: string;
}

const NoResultsPage: React.FC<NoResultsProps> = ({
  searchQuery,
}) => {
  const t = useTranslations('Weather');

  const defaultMessage = t('noResultsFound');
  const suggestion = t('checkSpelling');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="Error_Page flex flex-col items-center justify-center text-center  "
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="flex flex-col items-center gap-6  w-full"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-100/70 dark:bg-blue-900/20 blur-md animate-pulse-slow"></div>
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary/30  ">
            <FiSearch className="w-8 h-8 text-primary/50 dark:text-primary/60" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {defaultMessage}
          </h2>
          
          {searchQuery && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              "{searchQuery}"
            </p>
          )}

          <p className="text-gray-500 dark:text-gray-400">
            {suggestion}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoResultsPage;