"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction, RefObject } from "react";
import { UserLocation } from "@/features/weather/types/UserLocationInterface";
import { LocationWeatherProps } from "@/features/map/types/LocationWeatherInterface";

/**
 * Hook to manage user geolocation state and error, with localStorage integration.
 * @param searchCity - The city being searched for (if any)
 * @returns Geolocation error, setter, alert ref, and user location
 */

export function useLocationWeather({ searchCity }: LocationWeatherProps): {
  geoError: string | null;
  setGeoError: Dispatch<SetStateAction<string | null>>;
  alertRef: RefObject<HTMLDivElement | null>;
  userLocation: UserLocation | null;
} {
  const [geoError, setGeoError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const USER_LOCATION_STORAGE_KEY = 'userLocation'; 

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem(USER_LOCATION_STORAGE_KEY);
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    }
  }, []);
  // When a search is performed, clear the stored location
  useEffect(() => {
    if (searchCity) {
      setUserLocation(null);
      localStorage.removeItem(USER_LOCATION_STORAGE_KEY);
    }
  }, [searchCity]);

  return {
    geoError,
    setGeoError,
    alertRef,
    userLocation,
  };
} 