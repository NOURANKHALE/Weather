import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiAlertCircle, FiMapPin, FiSun, FiThermometer } from "react-icons/fi";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line, BarChart, Bar, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useTranslations } from "next-intl";
import { motion } from 'framer-motion';
import { MapTabsPageProps } from '@/features/map/types/MapTabsPageInterface';
import SortableGrid from '@/components/SortableGrid';
import PieChartWithNeedle from "@/features/map/components/PieChartWithNeedle";

export default function MapTabsPage({
  activeTab,
  setActiveTab,
  lastSearchedCity,
  userWeather,
  userLocation,
  direction,
  WeatherMapClient,
  geoError,
  alertRef,
  forecastData,
  analyticsForecast,
  locale,
}: MapTabsPageProps) {
  const t = useTranslations('Weather');

  return (
    <Tabs 
      value={activeTab}
      className=" Map_Tap_Page w-full"
      onValueChange={(value) => setActiveTab(value as typeof activeTab)}
      dir={direction}
    >
      {/* Tab Navigation */}
        <TabsList 
          className="grid w-full grid-cols-2 bg-white/80 dark:bg-gray-900/80 "
          dir={direction}
          role="tablist"
        >
          <TabsTrigger 
            value="overview" 
            role="tab" 
            className="text-sm md:text-base  data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-300"
          >
            <FiSun className="h-4 w-4 " />
            {t('overview')}
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            role="tab" 
            className="text-sm md:text-base  data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/30 data-[state=active]:text-sky-600 dark:data-[state=active]:text-sky-300"
          >
            <FiThermometer className="h-4 w-4 " />
            {t('analytics')}
          </TabsTrigger>
        </TabsList>
      

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6" dir={direction}>
        {geoError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Alert
              ref={alertRef}
              variant="destructive"
              className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/80 dark:bg-red-900/20"
            >
              <div className="flex items-start gap-3">
                <FiAlertCircle className="h-5 w-5 mt-0.5 text-red-600 dark:text-red-400" />
                <div>
                  <AlertTitle className="text-red-800 dark:text-red-200 font-medium">
                    {t('error')}
                  </AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    {geoError}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>
        )}

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90"
        >
          <WeatherMapClient
            center={[userWeather?.coord?.lat || 0, userWeather?.coord?.lon || 0]}
            userLocation={userLocation}
            userWeather={userWeather}
            lastSearchedCity={lastSearchedCity}
            error={geoError}
            loading={false}
            locale={locale}
          />
        </motion.div>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="space-y-6" dir={direction}>
        <SortableGrid
          items={["temperature", "humidity", "wind"]}
          storageKey="map_analytics_card_order"
          getItemId={id => id}
          renderItem={(id, isDragging) => {
            if (id === "temperature") {
              return (
                <Card className="bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">
                      {t('temperatureTrend')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData}>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="hsl(var(--border))" 
                          />
                          <XAxis 
                            dataKey="time" 
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                          />
                          <RechartsTooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                            }}
                            formatter={(value) => [`${value}°C`, t('Temperature')]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="temp" 
                            name= {t('Temperature')} 
                            stroke="#6366f1" 
                            strokeWidth={2}
                            dot={{ fill: '#8b5cf6', r: 3 }}
                            activeDot={{ fill: '#a78bfa', r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            if (id === "humidity") {
              return (
                <Card className="bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">
                      {t('humidityLevels')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={forecastData}>
                          <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="hsl(var(--border))"
                          />
                          <XAxis 
                            dataKey="time" 
                            tick={{ fontSize: 14 }}
                            reversed={direction === 'rtl'}
                          />
                          <YAxis 
                            unit="%" 
                            tick={{ fontSize: 14 }}
                          />
                          <defs>
                            <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0ea5e9" />
                              <stop offset="100%" stopColor="#7dd3fc" />
                            </linearGradient>
                          </defs>
                          <Bar 
                            dataKey="humidity" 
                            fill="url(#humidityGradient)"
                            radius={[8, 8, 0, 0]}
                          />
                          <RechartsTooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                            }}
                            formatter={(value) => [`${value}%`, t('Humidity')]}
                          />
                          <Legend />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              );
            }
            if (id === "wind") {
              return (
                <Card className="bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">
                      {t('windDirection')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <PieChartWithNeedle
                        data={analyticsForecast.map(item => ({
                          wind: item.wind?.speed ?? 0,
                          windDir: item.wind?.deg ?? 0
                        }))}
                        t={t}
                        direction={direction}
                        locale={locale}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            }
            return null;
          }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        />
      </TabsContent>
    </Tabs>
  );
}