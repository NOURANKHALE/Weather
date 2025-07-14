import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import React from 'react';

interface MobileSidebarProps {
  locale: string;
  t: (key: string) => string;
  router: any;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  changeLocale: (newLocale: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  locale,
  t,
  router,
  setMobileMenuOpen,
  mobileMenuOpen,
  changeLocale,
}) => {
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="lg:hidden" >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        >
          <Menu className="h-5 w-5 "  />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={locale === 'ar' ? 'right' : 'left'} className="w-[280px] sm:w-[300px] bg-white/95 dark:bg-gray-900 ">
        <div className="flex flex-col h-full  pt-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {/* Language Switcher */}
          <div className="px-2 mb-4 pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {t('language')}
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => changeLocale('en')}
                className="w-full justify-start gap-2 text-primary"
              >
                English
              </Button>
              <Button
                variant="ghost"
                onClick={() => changeLocale('ar')}
                className="w-full justify-start gap-2 text-primary"
              >
                العربية
              </Button>
            </div>
          </div>
          {/* Mobile navigation buttons for Map and Forecast */}
          <div className=" mb-4 ">
            <Button
              variant="outline"
              onClick={() => { router.replace(`/${locale}/`); setMobileMenuOpen(false); }}
              className="w-full justify-start gap-2 mb-2"
            >
              {t('Home')}
            </Button>
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
  );
};

export default MobileSidebar; 