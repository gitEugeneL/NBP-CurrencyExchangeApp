import { useEffect, useState } from 'react';

export default function useUserGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      console.error('Geolocation is not supported by your browser');
      setError('Geolocation is not supported by your browser');
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      setPosition(position);
      setError(null);
    };

    const geoError = (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error);
      setError(`Geolocation error: ${error.message}`);
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy: true
    };

    const geoId = navigator.geolocation.watchPosition(
      geoSuccess,
      geoError,
      geoOptions
    );

    return () => {
      navigator.geolocation.clearWatch(geoId);
    };
  }, []);

  return { position, error };
}
