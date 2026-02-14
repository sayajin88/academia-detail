import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import type { DetailerProfile } from '@/components/directory/DetailerCard';
import { DetailerBadge } from '@/components/directory/DetailerBadge';
import { DetailerMap } from '@/components/directory/DetailerMap';
import { BeforeAfterSlider } from '@/components/directory/BeforeAfterSlider';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { MapPin, Phone, Globe, Instagram, MessageCircle, Calendar, Target, Award, CheckCircle, User, Building2, Sparkles } from 'lucide-react';
import { getComunidadByProvincia, slugify } from '@/data/comunidadesAutonomas';
import { Button } from '@/components/ui/button';

interface PortfolioImage {
  id: string;
  before_image_url: string | null;
  after_image_url: string | null;
  title: string | null;
}

const DetailerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [detailer, setDetailer] = useState<DetailerProfile | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('detailer_profiles' as any)
        .select('*')
        .eq('slug', slug)
        .single();

      if (data) {
        const d = data as unknown as DetailerProfile;
        setDetailer(d);

        const { data: imgs } = await supabase
          .from('portfolio_images' as any)
          .select('*')
          .eq('detailer_id', d.id);

        if (imgs) setPortfolio(imgs as unknown as PortfolioImage[]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Cargando...</div>
        </div>
      </MainLayout>
    );
  }

  if (!detailer) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Detailer no encontrado</h1>
          <Link to="/directorio" className="text-primary underline">Volver al directorio</Link>
        </div>
      </MainLayout>
    );
  }

  const whatsappLink = detailer.whatsapp_number
    ? `https://wa.me/${detailer.whatsapp_number.replace(/\D/g, '')}`
    : null;

  const TypeIcon = detailer.profile_type === 'centro' ? Building2 : User;
  const typeLabel = detailer.profile_type === 'centro' ? 'Centro' : 'Detailer';

  const badgeLabels: Record<string, string> = {
    elite_detailer: 'Élite Detailer',
    master_detailer: 'Master Detailer',
    certified_pro: 'Certificado Pro',
  };

  const comunidadData = getComunidadByProvincia(detailer.province);
  const comunidadSlug = comunidadData?.slug || '';
  const comunidadName = comunidadData?.name || '';
  const provinciaSlug = slugify(detailer.province);
  const ciudadSlug = slugify(detailer.city);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://academiadetail.com/detailer/${detailer.slug}`,
    name: detailer.business_name,
    description: detailer.description,
    image: detailer.featured_image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: detailer.address,
      addressLocality: detailer.city,
      addressRegion: detailer.province,
      postalCode: detailer.zip_code,
      addressCountry: 'ES',
    },
    ...(detailer.latitude && detailer.longitude && {
      geo: { '@type': 'GeoCoordinates', latitude: detailer.latitude, longitude: detailer.longitude },
    }),
    ...(detailer.phone && { telephone: detailer.phone }),
    ...(detailer.website_url && { url: detailer.website_url }),
    priceRange: 'EUR',
    areaServed: { '@type': 'City', name: detailer.city },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://academiadetail.com/' },
      { '@type': 'ListItem', position: 2, name: 'Directorio', item: 'https://academiadetail.com/directorio' },
      ...(comunidadName ? [{ '@type': 'ListItem', position: 3, name: comunidadName, item: `https://academiadetail.com/directorio/${comunidadSlug}` }] : []),
      { '@type': 'ListItem', position: comunidadName ? 4 : 3, name: detailer.province, item: `https://academiadetail.com/directorio/${comunidadSlug}/${provinciaSlug}` },
      { '@type': 'ListItem', position: comunidadName ? 5 : 4, name: detailer.city, item: `https://academiadetail.com/directorio/${comunidadSlug}/${provinciaSlug}/${ciudadSlug}` },
      { '@type': 'ListItem', position: comunidadName ? 6 : 5, name: detailer.business_name },
    ],
  };

  const stats = [
    detailer.years_experience != null && {
      icon: Calendar,
      label: 'Experiencia',
      value: `${detailer.years_experience} años`,
    },
    detailer.specialty && {
      icon: Target,
      label: 'Especialidad',
      value: detailer.specialty,
    },
    {
      icon: Award,
      label: 'Rango',
      value: badgeLabels[detailer.level_badge] || detailer.level_badge,
    },
    detailer.is_verified && {
      icon: CheckCircle,
      label: 'Estado',
      value: 'Verificado',
    },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <MainLayout>
      <Helmet>
        <title>{detailer.business_name} | Detailing y Limpieza en {detailer.city} - Academia Detail</title>
        <meta name="description" content={`${detailer.business_name} — ${typeLabel} ${badgeLabels[detailer.level_badge]} en ${detailer.city}, ${detailer.province}. ${detailer.services.slice(0, 3).join(', ')}. Certificado por Academia Detail ✅`} />
        <link rel="canonical" href={`https://academiadetail.com/detailer/${detailer.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero with background image */}
      <div className="relative h-72 md:h-[420px] bg-muted">
        {detailer.featured_image_url ? (
          <img src={detailer.featured_image_url} alt={`${detailer.business_name} - Detailing en ${detailer.city}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/directorio">Directorio</Link></BreadcrumbLink></BreadcrumbItem>
            {comunidadName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/directorio/${comunidadSlug}`}>{comunidadName}</Link></BreadcrumbLink></BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/directorio/${comunidadSlug}/${provinciaSlug}`}>{detailer.province}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/directorio/${comunidadSlug}/${provinciaSlug}/${ciudadSlug}`}>{detailer.city}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{detailer.business_name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main profile card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Photo */}
            <div className="shrink-0">
              {detailer.owner_photo_url ? (
                <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 ${
                  detailer.level_badge === 'elite_detailer' ? 'border-[hsl(45,93%,47%)] shadow-[0_0_20px_hsl(45_93%_47%/0.3)]' :
                  detailer.level_badge === 'master_detailer' ? 'border-[hsl(220,15%,70%)] shadow-[0_0_15px_hsl(220_10%_50%/0.2)]' :
                  'border-primary/40'
                }`}>
                  <img src={detailer.owner_photo_url} alt={detailer.owner_name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center bg-muted border-4 ${
                  detailer.level_badge === 'elite_detailer' ? 'border-[hsl(45,93%,47%)]' :
                  detailer.level_badge === 'master_detailer' ? 'border-[hsl(220,15%,70%)]' :
                  'border-primary/40'
                }`}>
                  <TypeIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
                  <TypeIcon className="h-3.5 w-3.5" />
                  {typeLabel}
                </span>
                <DetailerBadge level={detailer.level_badge} size="md" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{detailer.business_name}</h1>
              <p className="text-lg text-muted-foreground">{detailer.owner_name}</p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{detailer.address ? `${detailer.address}, ` : ''}{detailer.city}, {detailer.province}</span>
              </div>

              {/* Contact buttons */}
              <div className="flex gap-2 flex-wrap pt-2">
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                      <MessageCircle className="h-4 w-4" />WhatsApp
                    </Button>
                  </a>
                )}
                {detailer.phone && (
                  <a href={`tel:${detailer.phone}`}>
                    <Button variant="outline" className="gap-2"><Phone className="h-4 w-4" />Llamar</Button>
                  </a>
                )}
                {detailer.website_url && (
                  <a href={detailer.website_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2"><Globe className="h-4 w-4" />Web</Button>
                  </a>
                )}
                {detailer.instagram_handle && (
                  <a href={`https://instagram.com/${detailer.instagram_handle}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2"><Instagram className="h-4 w-4" />Instagram</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats panel */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card/60 backdrop-blur border border-border rounded-xl p-4 text-center space-y-2">
                <stat.icon className="h-6 w-6 text-primary mx-auto" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {detailer.description && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Sobre {detailer.profile_type === 'centro' ? 'el centro' : 'mí'}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{detailer.description}</p>
          </div>
        )}

        {/* Skills */}
        {detailer.skills && detailer.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Habilidades</h2>
            <div className="flex flex-wrap gap-3">
              {detailer.skills.map((skill) => (
                <div key={skill} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {detailer.services.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Servicios</h2>
            <div className="flex flex-wrap gap-2">
              {detailer.services.map((s) => (
                <span key={s} className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        {detailer.latitude && detailer.longitude && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Ubicación</h2>
            <DetailerMap latitude={detailer.latitude} longitude={detailer.longitude} businessName={detailer.business_name} />
          </div>
        )}

        {/* Portfolio */}
        {portfolio.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Portfolio — Antes / Después</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((img) =>
                img.before_image_url && img.after_image_url ? (
                  <BeforeAfterSlider
                    key={img.id}
                    beforeImage={img.before_image_url}
                    afterImage={img.after_image_url}
                    title={img.title || undefined}
                  />
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating WhatsApp CTA (mobile) */}
      {whatsappLink && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl py-6 text-base rounded-xl">
              <MessageCircle className="h-5 w-5" />
              Contactar por WhatsApp
            </Button>
          </a>
        </div>
      )}
    </MainLayout>
  );
};

export default DetailerPage;
