import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DetailerMapProps {
  latitude: number;
  longitude: number;
  businessName: string;
}

export function DetailerMap({ latitude, longitude, businessName }: DetailerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([latitude, longitude], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom marker icon
    const icon = L.divIcon({
      html: `<div style="background:hsl(348,60%,34%);width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([latitude, longitude], { icon }).addTo(map).bindPopup(businessName);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, businessName]);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-border"
    />
  );
}
