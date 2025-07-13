'use client';

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";
import { Coord } from "@/features/map/types/WeatherMapInterface";
import { WeatherMapProps } from "@/features/map/types/WeatherMapInterface";

// Icon assets
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface IconPrototype extends L.Icon.Default {
  _getIconUrl?: () => string;
}

// Recenter the map on prop change
function RecenterMap({ lat, lon }: Coord) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 9);
  }, [lat, lon, map]);

  return null;
}

export default function WeatherMap({
  center,
  userLocation,
  userWeather,
  lastSearchedCity,
}: WeatherMapProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as IconPrototype)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });
    }
  }, []);

  return (
    <div className="Weather_Map h-[300px] relative rounded-2xl overflow-hidden border-2 border-cyan-200 dark:border-cyan-900 shadow-xl">
      <MapContainer center={center} zoom={7} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <RecenterMap lat={center[0]} lon={center[1]} />

        {userLocation && userWeather && (
          <Marker position={[userLocation.lat, userLocation.lon]}>
            <Popup>
              <div>
                <strong>{userWeather.name}</strong><br />
                {userWeather.main?.temp}°C<br />
                {userWeather.weather?.[0]?.description}
              </div>
            </Popup>
          </Marker>
        )}

        {lastSearchedCity && (
          <Marker position={[lastSearchedCity.coord.lat, lastSearchedCity.coord.lon]}>
            <Popup>
              <div className="flex justify-between items-center">
                <span>
                  {lastSearchedCity.name} - {lastSearchedCity.main.temp}°C
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-6 w-6"
                >
                  <FiX size={12} />
                </Button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
