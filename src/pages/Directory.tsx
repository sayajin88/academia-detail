import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryHero } from '@/components/directory/DirectoryHero';
import { DirectoryFilters } from '@/components/directory/DirectoryFilters';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { DirectoryMap } from '@/components/directory/DirectoryMap';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { Map, LayoutGrid, Layers, MapPin } from 'lucide-react';
import { DirectoryJoinBanner } from '@/components/directory/DirectoryJoinBanner';
import { cn } from '@/lib/utils';
import { getAllComunidades, slugify } from '@/data/comunidadesAutonomas';

const levelOrder = { master: 0, certified: 1, member: 2 };

type ViewMode = 'map' | 'grid' | 'both';

const Directory = () => {
  const [detailers, setDetailers] = useState<DetailerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('both');

  useEffect(() => {
    const fetchDetailers = async () => {
      const { data, error } = await supabase
        .from('detailer_profiles' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDetailers(data as unknown as DetailerProfile[]);
      }
      setIsLoading(false);
    };
    fetchDetailers();
  }, []);

  const handleNearMe = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const filtered = useMemo(() => {
    let result = detailers;
    const q = searchQuery.toLowerCase().trim();

    if (q) {
      result = result.filter(
        (d) => d.city.toLowerCase().includes(q) || d.province.toLowerCase().includes(q) || d.business_name.toLowerCase().includes(q)
      );
    }

    if (selectedLevel) {
      result = result.filter((d) => d.level_badge === selectedLevel);
    }

    if (selectedType) {
      result = result.filter((d) => (d as any).profile_type === selectedType);
    }

    if (selectedServices.length > 0) {
      result = result.filter((d) =>
        selectedServices.every((s) => d.services.includes(s))
      );
    }

    result = [...result].sort((a, b) => {
      const levelDiff = (levelOrder[a.level_badge] ?? 2) - (levelOrder[b.level_badge] ?? 2);
      if (levelDiff !== 0) return levelDiff;

      if (userLocation && a.latitude && a.longitude && b.latitude && b.longitude) {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distA - distB;
      }

      return a.business_name.localeCompare(b.business_name);
    });

    return result;
  }, [detailers, searchQuery, selectedLevel, selectedServices, selectedType, userLocation]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Directorio de Detailers Certificados - Academia Detail',
    description: 'Encuentra profesionales de detailing certificados en toda España.',
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 10).map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'AutoBodyShop',
        name: d.business_name,
        url: `https://academiadetail.com/detailer/${d.slug}`,
      },
    })),
  };

  const allComunidades = getAllComunidades();

  const viewButtons: { mode: ViewMode; icon: typeof Map; label: string }[] = [
    { mode: 'both', icon: Layers, label: 'Ambos' },
    { mode: 'map', icon: Map, label: 'Mapa' },
    { mode: 'grid', icon: LayoutGrid, label: 'Grid' },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Directorio Detailers Certificados España | Academia Detail</title>
        <meta name="description" content="Encuentra tu detailer certificado cerca de ti. Profesionales formados en Academia Detail con garantía de calidad ✅ Busca por ciudad o servicio." />
        <link rel="canonical" href="https://academiadetail.com/directorio" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <DirectoryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNearMe={handleNearMe}
        isLocating={isLocating}
      />

      <section className="container mx-auto px-4 pb-20 space-y-6">
        {/* View toggle - alone on top */}
        <div className="flex justify-end">
          <div className="flex items-center rounded-lg border border-border bg-card p-1 gap-0.5">
            {viewButtons.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5',
                  viewMode === mode
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
                title={label}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        {(viewMode === 'map' || viewMode === 'both') && (
          <DirectoryMap detailers={filtered} />
        )}

        {/* Compact filter toolbar */}
        <DirectoryFilters
          selectedServices={selectedServices}
          onToggleService={toggleService}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {/* Grid */}
        {(viewMode === 'grid' || viewMode === 'both') && (
          <DirectoryGrid detailers={filtered} isLoading={isLoading} />
        )}

        {/* Join CTA Banner */}
        <DirectoryJoinBanner />

        {/* Interlinking: Comunidades Autónomas */}
        <div className="space-y-4 pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground">Busca por Comunidad Autónoma</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Encuentra centros de detailing certificados en toda España. Navega por comunidad autónoma, provincia o ciudad para localizar al profesional más cercano a ti.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allComunidades.map((c) => (
              <Link
                key={c.slug}
                to={`/directorio/${c.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:bg-card transition-colors text-sm font-medium text-foreground"
              >
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Directory;
