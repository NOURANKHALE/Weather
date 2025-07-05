import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getTextDirection } from '@/lib/utils/text';
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Appsidebar"
import { ReduxProvider } from '@/lib/providers'
import Header from './shared/Header';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = getTextDirection(locale);

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    notFound();
  }

  return (
      <ReduxProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div
            className="flex  bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            dir={direction}
            suppressHydrationWarning
          >
            <div className='left'>
              <SidebarProvider>
                <AppSidebar />
              </SidebarProvider>
            </div>
            <div className='right w-full'>
              <Header/>
              <main className="mx-auto container ">
                  {children}
              </main>
            </div>
          </div>
        </NextIntlClientProvider>
      </ReduxProvider>
  )
}
