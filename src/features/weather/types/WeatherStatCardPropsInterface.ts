/**
 * Represents a single weather stat card's data for the UI.
 */
export interface WeatherStatCard {
  id: string;
  icon: React.ElementType;
  iconClass: string;
  title: string;
  value: string;
  description: string;
  accent: string;
} 