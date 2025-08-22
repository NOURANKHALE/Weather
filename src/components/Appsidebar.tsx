'use client'
import Link from 'next/link'
import { Home, MapPin, BarChart3 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams, usePathname } from 'next/navigation'
import { CustomSidebarTrigger } from './CustomSidebarTrigger'
import { motion } from 'framer-motion'
import {Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem,} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const t = useTranslations('Sidebar')
  const { locale } = useParams()
  const pathname = usePathname()

  const items = [
    { 
      title: t('Home'), 
      url: '/', 
      icon: Home
    },
    { 
      title: t('Map'), 
      url: '/map', 
      icon: MapPin
    },
    { 
      title: t('Forecast'), 
      url: '/forecast', 
      icon: BarChart3
    },
  ]

  const isActive = (url: string) => {
    const currentPath = pathname.replace(`/${locale}`, '')
    return currentPath === url
  }

  return (
    <Sidebar collapsible="icon" side={locale === "ar" ? "right" : "left"} className="shadow-2xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl border-none group/sidebar">
      <motion.div
        initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CustomSidebarTrigger className='p-4 mt-4 ml-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:bg-blue-100/60 dark:hover:bg-blue-900/60 transition-colors duration-200'/>
      </motion.div>
      
      <SidebarContent className='mt-6'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem
                    className={cn(
                      `rounded-xl mx-2 mb-2 transition-all duration-200 shadow-md border border-transparent group overflow-hidden`,
                      isActive(url)
                        ? 'bg-gradient-to-r from-blue-200/60 via-white/80 to-purple-200/60 dark:from-blue-900/40 dark:via-gray-900/60 dark:to-purple-900/40 border-primary/30 shadow-lg'
                        : 'hover:bg-blue-100/40 hover:border-blue-200/60 dark:hover:bg-blue-900/30 dark:hover:border-blue-800/40'
                    )}
                  >
                    <SidebarMenuButton asChild tooltip={title}>
                      <Link
                        href={`/${locale}${url}`}
                        className={cn(
                          `flex items-center gap-4  py-3  transition-all duration-200 group w-full`,
                          isActive(url)
                            ? 'text-primary '
                            : 'hover:text-primary'
                        )}
                      >
                        
                          <Icon className="w-6 h-6" aria-hidden="true" />
                          {isActive(url) && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 "
                              initial={false}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                       
                        <span className="  text-base group-data-[collapsible=icon]:hidden">{title}</span>
                        
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
