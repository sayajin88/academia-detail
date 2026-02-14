import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AdminProfile {
  id: string;
  business_name: string;
  owner_name: string;
  city: string;
  province: string;
  level_badge: string;
  profile_type: string;
  is_published: boolean | null;
  latitude: number | null;
  longitude: number | null;
}

interface AdminProfileMapProps {
  profiles: AdminProfile[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const badgeColors: Record<string, string> = {
  elite_detailer: 'hsl(45,93%,47%)',
  master_detailer: 'hsl(220,15%,65%)',
  certified_pro: 'hsl(348,60%,34%)',
  member: 'hsl(200,15%,50%)',
};

const levelLabels: Record<string, string> = {
  member: 'Miembro',
  certified_pro: 'Certificado Pro',
  master_detailer: 'Master Detailer',
  elite_detailer: 'Élite Detailer',
};

export function AdminProfileMap({ profiles, onEdit, onDelete }: AdminProfileMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const callbacksRef = useRef({ onEdit, onDelete });
  callbacksRef.current = { onEdit, onDelete };

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.0, -3.7],
      zoom: 6,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO',
      maxZoom: 18,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Listen for custom events from popup buttons
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.action === 'edit') callbacksRef.current.onEdit(detail.id);
      if (detail?.action === 'delete') callbacksRef.current.onDelete(detail.id);
    };
    window.addEventListener('admin-map-action', handler);

    return () => {
      window.removeEventListener('admin-map-action', handler);
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    profiles.forEach((p) => {
      if (!p.latitude || !p.longitude) return;

      const color = badgeColors[p.level_badge] ?? badgeColors.member;
      const opacity = p.is_published ? 1 : 0.4;
      const statusLabel = p.is_published ? '🟢 Publicado' : '⚪ Borrador';
      const badge = levelLabels[p.level_badge] ?? p.level_badge;
      const typeLabel = p.profile_type === 'centro' ? '🏢 Centro' : '👤 Detailer';

      const icon = L.divIcon({
        html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};opacity:${opacity};border:3px solid rgba(255,255,255,0.8);box-shadow:0 0 10px ${color}80,0 2px 6px rgba(0,0,0,0.4);"></div>`,
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const popupHtml = `
        <div style="min-width:200px;font-family:system-ui,sans-serif;">
          <div style="font-weight:700;font-size:14px;color:#fff;margin-bottom:2px;">${p.business_name}</div>
          <div style="font-size:11px;color:#999;margin-bottom:4px;">${p.owner_name} · ${typeLabel}</div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:10px;padding:2px 8px;border-radius:9999px;background:rgba(255,255,255,0.1);color:#ccc;">${badge}</span>
            <span style="font-size:10px;color:#aaa;">${statusLabel}</span>
          </div>
          <div style="font-size:12px;color:#aaa;margin-bottom:8px;">📍 ${p.city}, ${p.province}</div>
          <div style="display:flex;gap:6px;">
            <button onclick="window.dispatchEvent(new CustomEvent('admin-map-action',{detail:{action:'edit',id:'${p.id}'}}))" style="padding:5px 12px;background:hsl(348,60%,34%);color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;">✏️ Editar</button>
            <button onclick="window.dispatchEvent(new CustomEvent('admin-map-action',{detail:{action:'delete',id:'${p.id}'}}))" style="padding:5px 12px;background:hsl(0,60%,40%);color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;">🗑 Eliminar</button>
          </div>
        </div>
      `;

      const marker = L.marker([p.latitude, p.longitude], { icon });
      marker.bindPopup(popupHtml, {
        className: 'admin-map-popup',
        maxWidth: 280,
        minWidth: 200,
      });
      markersRef.current!.addLayer(marker);
    });
  }, [profiles]);

  const withCoords = profiles.filter(p => p.latitude && p.longitude).length;
  const withoutCoords = profiles.length - withCoords;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>📍 {withCoords} con ubicación</span>
        {withoutCoords > 0 && <span className="text-yellow-500">⚠ {withoutCoords} sin coordenadas</span>}
      </div>
      <style>{`
        .admin-map-popup .leaflet-popup-content-wrapper {
          background: hsl(240 4% 13%);
          border: 1px solid hsl(240 4% 20%);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .admin-map-popup .leaflet-popup-tip { background: hsl(240 4% 13%); }
        .admin-map-popup .leaflet-popup-close-button { color: #888 !important; }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-border"
      />
    </div>
  );
}
