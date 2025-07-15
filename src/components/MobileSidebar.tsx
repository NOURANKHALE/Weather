'use client';
import {Sheet,SheetContent,SheetTrigger,SheetTitle,} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Menu } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';

interface MobileSidebarProps {
  locale: string;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  changeLocale: (newLocale: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  locale,
  setMobileMenuOpen,
  mobileMenuOpen,
  changeLocale,
}) => {
  const router = useRouter();
  const t = useTranslations('Sidebar');

  const navItems = [
    { label: t('Home'), path: '/' },
    { label: t('Map'), path: '/map' },
    { label: t('Forecast'), path: '/forecast' },
  ];

  return (
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

      <SheetContent
        side={locale === 'ar' ? 'right' : 'left'}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="w-[280px] sm:w-[300px] bg-white/95 dark:bg-gray-900"
      >
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

        <div className="flex flex-col h-full pt-10 gap-6">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 w-22 rounded-full bg-white/95 dark:bg-gray-800/95 border-none transition-all duration-200 flex items-center gap-2 text-gray-700 dark:text-gray-200"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium capitalize">{locale}</span>
                <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl shadow-lg border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
            >
              <DropdownMenuItem onClick={() => changeLocale('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLocale('ar')}>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            {navItems.map(({ label, path }) => (
              <Button
                key={path}
                variant="link"
                onClick={() => {
                  router.replace(`/${locale}${path}`);
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-2"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
