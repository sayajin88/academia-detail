import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/shared/SectionHeading';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const DirectoryCity = () => {
  const { province, city } = useParams<{ province: string; city: string }>();
  const [detailers, setDetailers] = useState<DetailerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cityName = capitalize(city?.replace(/-/g, ' ') || '');
  const provinceName = capitalize(province?.replace(/-/g, ' ') || '');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('detailer_profiles' as any)
        .select('*')
        .ilike('city', cityName)
        .ilike('province', provinceName);

      if (data) setDetailers(data as unknown as DetailerProfile[]);
      setIsLoading(false);
    };
    fetch();
  }, [cityName, provinceName]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Detailers Certificados en ${cityName}, ${provinceName}`,
    numberOfItems: detailers.length,
    itemListElement: detailers.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'AutoBodyShop', name: d.business_name, url: `https://academiadetail.com/directorio/${d.slug}` },
    })),
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Mejores Detailers en {cityName}, {provinceName} | Academia Detail</title>
        <meta name="description" content={`Encuentra los mejores detailers certificados en ${cityName}, ${provinceName}. Profesionales de pulido, cerámico, PPF y más ✅ Contacta sin compromiso.`} />
        <link rel="canonical" href={`https://academiadetail.com/directorio/${province}/${city}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="container mx-auto px-4 pt-28 pb-20 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/directorio">Directorio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/directorio/${province}`}>{provinceName}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{cityName}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <SectionHeading
          titleAs="h1"
          title={`Mejores Detailers en ${cityName}, ${provinceName}`}
          subtitle={`Descubre profesionales de detailing certificados por Academia Detail en ${cityName}. Todos nuestros detailers han superado formación especializada y ofrecen servicio de calidad garantizada.`}
        />

        <DirectoryGrid detailers={detailers} isLoading={isLoading} />
      </section>
    </MainLayout>
  );
};

export default DirectoryCity;
