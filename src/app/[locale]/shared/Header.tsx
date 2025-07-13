'use client';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/Modetoggle';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, Menu } from 'lucide-react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import SearchBar from '@/features/search/components/SearchBar';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function Header() {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLocale = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.replace(newPath);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-800/50"
    >
      <div className="Header container mx-auto px-4 sm:px-6">
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Mobile menu and logo */}
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              {/* Sidebar for mobile */}
              <SheetContent side="left" className="w-[280px] sm:w-[300px] bg-white/95 dark:bg-gray-900/80 ">
                <SheetHeader>
                  <SheetTitle>{t('title')}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full pt-6">
                    

                  {/* Language Switcher */}
                  <div className="px-2 mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {t('language')}
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => changeLocale('en')}
                        className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        English
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => changeLocale('ar')}
                        className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        العربية
                      </Button>
                    </div>
                  </div>

                  {/* Mobile navigation buttons for Map and Forecast */}
                  <div className="px-2 mb-4">
                    <Button
                      variant="outline"
                      onClick={() => { router.replace(`/${locale}/map`); setMobileMenuOpen(false); }}
                      className="w-full justify-start gap-2 mb-2"
                    >
                      {t('Map')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => { router.replace(`/${locale}/forecast`); setMobileMenuOpen(false); }}
                      className="w-full justify-start gap-2"
                    >
                     
                      {t('Forecast')}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                  <div className="hidden sm:block">
                  <h1 className="text-2xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm tracking-tight animate-pulse">
                     {t('title')}
                    </h1>

                  </div>
                </div>
            </motion.div>
          </div>

          {/* Desktop search bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex flex-1 max-w-xl mx-4"
          >
            <SearchBar showLocationButton={false} />
          </motion.div>

          {/* Language and theme toggles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 md:gap-3"
          >
            {/* Desktop language switcher */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 rounded-xl border-gray-300 hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:hover:border-primary dark:hover:bg-primary/20 transition-all duration-200 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                  >
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium capitalize">{locale}</span>
                    <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
                  <DropdownMenuItem onClick={() => changeLocale('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLocale('ar')}>
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Theme toggle */}
            <div className="h-9 w-9 rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden bg-white/50 hover:bg-primary/10 dark:bg-gray-900/50 dark:hover:bg-primary/20 transition-colors">
              <ModeToggle />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
