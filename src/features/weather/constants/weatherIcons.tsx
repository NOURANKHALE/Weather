import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

// Weather icon mapping for different weather conditions
export const WEATHER_ICON_MAP: Record<string, React.ReactNode> = {
  '01d': <WiDaySunny className="text-amber-400" size={64} />,
  '01n': <WiDaySunny className="text-indigo-300" size={64} />,
  '02d': <WiDaySunny className="text-amber-400" size={64} />,
  '02n': <WiDaySunny className="text-indigo-300" size={64} />,
  '03d': <WiCloudy className="text-slate-400" size={64} />,
  '03n': <WiCloudy className="text-slate-400" size={64} />,
  '04d': <WiCloudy className="text-slate-500" size={64} />,
  '04n': <WiCloudy className="text-slate-500" size={64} />,
  '09d': <WiRain className="text-blue-400" size={64} />,
  '09n': <WiRain className="text-blue-400" size={64} />,
  '10d': <WiRain className="text-blue-500" size={64} />,
  '10n': <WiRain className="text-blue-500" size={64} />,
  '11d': <WiThunderstorm className="text-violet-500" size={64} />,
  '11n': <WiThunderstorm className="text-violet-500" size={64} />,
  '13d': <WiSnow className="text-cyan-200" size={64} />,
  '13n': <WiSnow className="text-cyan-200" size={64} />,
  '50d': <WiCloudy className="text-slate-400" size={64} />,
  '50n': <WiCloudy className="text-slate-400" size={64} />,
};

// Weather icon mapping for smaller sizes (used in forecasts)
export const getWeatherIcon = (iconCode: string, size = 36) => {
  const iconMap: Record<string, React.ReactNode> = {
    "01d": <WiDaySunny className="text-amber-400" size={size} />,
    "01n": <WiDaySunny className="text-indigo-300" size={size} />,
    "02d": <WiDaySunny className="text-amber-300" size={size} />,
    "02n": <WiDaySunny className="text-indigo-200" size={size} />,
    "03d": <WiCloudy className="text-slate-400" size={size} />,
    "03n": <WiCloudy className="text-slate-300" size={size} />,
    "04d": <WiCloudy className="text-slate-500" size={size} />,
    "04n": <WiCloudy className="text-slate-400" size={size} />,
    "09d": <WiRain className="text-blue-400" size={size} />,
    "09n": <WiRain className="text-blue-300" size={size} />,
    "10d": <WiRain className="text-blue-500" size={size} />,
    "10n": <WiRain className="text-blue-400" size={size} />,
    "11d": <WiThunderstorm className="text-violet-500" size={size} />,
    "11n": <WiThunderstorm className="text-violet-400" size={size} />,
    "13d": <WiSnow className="text-cyan-200" size={size} />,
    "13n": <WiSnow className="text-cyan-100" size={size} />,
    "50d": <WiFog className="text-slate-300" size={size} />,
    "50n": <WiFog className="text-slate-200" size={size} />,
  };

  return iconMap[iconCode] || <WiDaySunny className="text-amber-300" size={size} />;
}; 