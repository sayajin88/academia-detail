import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryHero } from '@/components/directory/DirectoryHero';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { getComunidadBySlug, slugify, getSeoText } from '@/data/comunidadesAutonomas';
import { MapPin } from 'lucide-react';

const DirectoryComunidad = () => {
  const { comunidad } = useParams<{ comunidad: string }>();
  const [detailers, setDetailers] = useState<DetailerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const comunidadData = getComunidadBySlug(comunidad || '');
  const comunidadName = comunidadData?.name || comunidad?.replace(/-/g, ' ') || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!comunidadName) return;
      const { data } = await supabase
        .from('detailer_profiles' as any)
        .select('*')
        .ilike('comunidad_autonoma', comunidadName);

      if (data) setDetailers(data as unknown as DetailerProfile[]);
      setIsLoading(false);
    };
    fetchData();
  }, [comunidadName]);

  const provincesWithDetailers = [...new Set(detailers.map((d) => d.province))].sort();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Centros de Detailing en ${comunidadName}`,
    numberOfItems: detailers.length,
    itemListElement: detailers.slice(0, 10).map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'AutoBodyShop', name: d.business_name, url: `https://academiadetail.com/detailer/${d.slug}` },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://academiadetail.com/' },
      { '@type': 'ListItem', position: 2, name: 'Centros Detailing España', item: 'https://academiadetail.com/centros-detailing-espana' },
      { '@type': 'ListItem', position: 3, name: comunidadName },
    ],
  };

  const noIndex = !isLoading && detailers.length === 0;

  return (
    <MainLayout>
      <Helmet>
        <title>Mejores Centros de Detailing en {comunidadName} | Academia Detail</title>
        <meta name="description" content={`${detailers.length > 0 ? `${detailers.length}+ centros de detailing certificados en ${comunidadName}` : `Centros de detailing certificados en ${comunidadName}`}. Pulido, cerámico, PPF y wrapping ✅ Compara profesionales y pide presupuesto gratis ➤ Reserva tu cita hoy.`} />
        <link rel="canonical" href={`https://academiadetail.com/centros-detailing-espana/${comunidad}`} />
        {noIndex && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <DirectoryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNearMe={() => {}}
        isLocating={false}
        locationLabel={comunidadName}
        locationContext={`Descubre los mejores centros y detailers certificados en ${comunidadName}. Compara servicios, consulta opiniones y pide presupuesto sin compromiso.`}
      />

      <section className="container mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/centros-detailing-espana">Centros Detailing</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{comunidadName}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <DirectoryGrid detailers={detailers.filter(d => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return d.city.toLowerCase().includes(q) || d.province.toLowerCase().includes(q) || d.business_name.toLowerCase().includes(q);
        })} isLoading={isLoading} />

        {provincesWithDetailers.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">Provincias en {comunidadName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {provincesWithDetailers.map((prov) => (
                <Link
                  key={prov}
                  to={`/centros-detailing-espana/${comunidad}/${slugify(prov)}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:bg-card transition-colors text-sm font-medium text-foreground"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {prov}
                </Link>
              ))}
            </div>
          </div>
        )}

        {comunidadData && (
          <div className="space-y-4 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">Otras comunidades</h2>
            <p className="text-sm text-muted-foreground">
              <Link to="/centros-detailing-espana" className="text-primary hover:underline">← Ver todas las comunidades autónomas</Link>
            </p>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default DirectoryComunidad;
