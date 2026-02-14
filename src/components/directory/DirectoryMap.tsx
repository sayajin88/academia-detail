import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { DetailerProfile } from './DetailerCard';

interface DirectoryMapProps {
  detailers: DetailerProfile[];
}

const markerConfig: Record<string, { color: string; size: number }> = {
  elite_detailer: { color: 'hsl(45,93%,47%)', size: 14 },
  master_detailer: { color: 'hsl(220,15%,65%)', size: 12 },
  certified_pro: { color: 'hsl(348,60%,34%)', size: 10 },
};

const levelLabels: Record<string, string> = {
  elite_detailer: 'Élite Detailer',
  master_detailer: 'Master Detailer',
  certified_pro: 'Certificado Pro',
};

function buildPopupHtml(d: DetailerProfile) {
  const typeLabel = d.profile_type === 'centro' ? '🏢 Centro' : '👤 Detailer';
  const badge = levelLabels[d.level_badge] ?? d.level_badge;
  const services = d.services.slice(0, 3).map(s => `<span style="display:inline-block;padding:2px 8px;font-size:10px;border-radius:9999px;background:rgba(139,35,50,0.15);color:hsl(348,60%,45%);margin:2px;">${s}</span>`).join('');

  return `
    <div style="min-width:200px;font-family:system-ui,sans-serif;">
      <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#fff;">${d.business_name}</div>
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
        <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:9999px;background:rgba(255,255,255,0.1);color:#ccc;">${badge}</span>
        <span style="font-size:10px;color:#999;">${typeLabel}</span>
      </div>
      <div style="font-size:12px;color:#aaa;margin-bottom:6px;">📍 ${d.city}, ${d.province}</div>
      ${services ? `<div style="margin-bottom:8px;">${services}</div>` : ''}
      <a href="/detailer/${d.slug}" style="display:inline-block;padding:6px 16px;background:hsl(348,60%,34%);color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;">Ver perfil →</a>
    </div>
  `;
}

export function DirectoryMap({ detailers }: DirectoryMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.0, -3.7],
      zoom: 6,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Update markers when detailers change
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    detailers.forEach((d) => {
      if (!d.latitude || !d.longitude) return;

      const cfg = markerConfig[d.level_badge] ?? markerConfig.certified_pro;

      const icon = L.divIcon({
        html: `<div style="width:${cfg.size * 2}px;height:${cfg.size * 2}px;border-radius:50%;background:${cfg.color};border:3px solid rgba(255,255,255,0.8);box-shadow:0 0 12px ${cfg.color}80,0 2px 8px rgba(0,0,0,0.4);"></div>`,
        className: '',
        iconSize: [cfg.size * 2, cfg.size * 2],
        iconAnchor: [cfg.size, cfg.size],
      });

      const marker = L.marker([d.latitude, d.longitude], { icon });
      marker.bindPopup(buildPopupHtml(d), {
        className: 'directory-map-popup',
        maxWidth: 280,
        minWidth: 200,
      });
      markersRef.current!.addLayer(marker);
    });
  }, [detailers]);

  return (
    <>
      <style>{`
        .directory-map-popup .leaflet-popup-content-wrapper {
          background: hsl(240 4% 13%);
          border: 1px solid hsl(240 4% 20%);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .directory-map-popup .leaflet-popup-tip {
          background: hsl(240 4% 13%);
        }
        .directory-map-popup .leaflet-popup-close-button {
          color: #888 !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden border border-border"
      />
    </>
  );
}
