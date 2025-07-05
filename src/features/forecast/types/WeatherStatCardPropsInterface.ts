export interface WeatherStatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    title: string;
    value: string;
    description: string;
    accent: string;
  }