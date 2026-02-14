import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getComunidadBySlug, slugify, getSeoText } from '@/data/comunidadesAutonomas';
import { MapPin } from 'lucide-react';

const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

const DirectoryProvincia = () => {
  const { comunidad, provincia } = useParams<{ comunidad: string; provincia: string }>();
  const [detailers, setDetailers] = useState<DetailerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const comunidadData = getComunidadBySlug(comunidad || '');
  const comunidadName = comunidadData?.name || '';
  const provinciaName = capitalize(provincia?.replace(/-/g, ' ') || '');

  useEffect(() => {
    const fetchData = async () => {
      if (!provinciaName) return;
      const { data } = await supabase
        .from('detailer_profiles' as any)
        .select('*')
        .ilike('province', `%${provinciaName}%`);

      if (data) setDetailers(data as unknown as DetailerProfile[]);
      setIsLoading(false);
    };
    fetchData();
  }, [provinciaName]);

  const citiesWithDetailers = [...new Set(detailers.map((d) => d.city))].sort();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Detailing Profesional en ${provinciaName}`,
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
      { '@type': 'ListItem', position: 3, name: comunidadName, item: `https://academiadetail.com/centros-detailing-espana/${comunidad}` },
      { '@type': 'ListItem', position: 4, name: provinciaName },
    ],
  };

  const noIndex = !isLoading && detailers.length === 0;

  return (
    <MainLayout>
      <Helmet>
        <title>Detailing Profesional en {provinciaName} - Centros Certificados | Academia Detail</title>
        <meta name="description" content={`Centros de detailing certificados en ${provinciaName}. Pulido profesional, protección cerámica, PPF e interiorismo ✅ Encuentra tu detailer cerca.`} />
        <link rel="canonical" href={`https://academiadetail.com/centros-detailing-espana/${comunidad}/${provincia}`} />
        {noIndex && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <section className="container mx-auto px-4 pt-28 pb-20 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/centros-detailing-espana">Centros Detailing</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/centros-detailing-espana/${comunidad}`}>{comunidadName}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{provinciaName}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <SectionHeading
          titleAs="h1"
          title={`Detailing Profesional en ${provinciaName}`}
          subtitle={getSeoText('provincia', provinciaName)}
        />

        <DirectoryGrid detailers={detailers} isLoading={isLoading} />

        {citiesWithDetailers.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">Ciudades con Detailing en {provinciaName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {citiesWithDetailers.map((city) => (
                <Link
                  key={city}
                  to={`/centros-detailing-espana/${comunidad}/${provincia}/${slugify(city)}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card/60 hover:border-primary/40 hover:bg-card transition-colors text-sm font-medium text-foreground"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {city}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <Link to={`/centros-detailing-espana/${comunidad}`} className="text-primary hover:underline text-sm">
            ← Volver a {comunidadName}
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default DirectoryProvincia;
