import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryHero } from '@/components/directory/DirectoryHero';
import { DirectoryFilters } from '@/components/directory/DirectoryFilters';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const levelOrder = { master: 0, certified: 1, member: 2 };

const Directory = () => {
  const [detailers, setDetailers] = useState<DetailerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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

    // Sort: level > distance > name
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
    description: 'Encuentra profesionales de detailing certificados en España.',
    numberOfItems: filtered.length,
    itemListElement: filtered.slice(0, 10).map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'AutoBodyShop',
        name: d.business_name,
        url: `https://academiadetail.com/directorio/${d.slug}`,
      },
    })),
  };

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

      <section className="container mx-auto px-4 pb-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <DirectoryFilters
            selectedServices={selectedServices}
            onToggleService={toggleService}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
          <Link to="/directorio/unete">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary whitespace-nowrap">
              <UserPlus className="h-4 w-4" />
              Únete al directorio
            </Button>
          </Link>
        </div>

        <DirectoryGrid detailers={filtered} isLoading={isLoading} />
      </section>
    </MainLayout>
  );
};

export default Directory;
