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
import { MapPin, Phone, Globe, Instagram, MessageCircle } from 'lucide-react';
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
    const fetch = async () => {
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
    fetch();
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: detailer.business_name,
    description: detailer.description,
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
    ...(detailer.featured_image_url && { image: detailer.featured_image_url }),
    ...(detailer.website_url && { url: detailer.website_url }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://academiadetail.com/' },
      { '@type': 'ListItem', position: 2, name: 'Directorio', item: 'https://academiadetail.com/directorio' },
      { '@type': 'ListItem', position: 3, name: detailer.province, item: `https://academiadetail.com/directorio/${detailer.province.toLowerCase()}` },
      { '@type': 'ListItem', position: 4, name: detailer.business_name },
    ],
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{detailer.business_name} - Detailer en {detailer.city} | Academia Detail</title>
        <meta name="description" content={`${detailer.business_name} en ${detailer.city}, ${detailer.province}. ${detailer.services.slice(0, 3).join(', ')}. Profesional certificado por Academia Detail ✅`} />
        <link rel="canonical" href={`https://academiadetail.com/directorio/${detailer.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-muted">
        {detailer.featured_image_url ? (
          <img src={detailer.featured_image_url} alt={detailer.business_name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10 pb-20">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/directorio">Directorio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{detailer.business_name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Info Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{detailer.business_name}</h1>
                <DetailerBadge level={detailer.level_badge} size="lg" />
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{detailer.address ? `${detailer.address}, ` : ''}{detailer.city}, {detailer.province}</span>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="flex gap-2 flex-wrap">
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

          {detailer.description && (
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{detailer.description}</p>
          )}

          {/* Services */}
          {detailer.services.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Servicios</h2>
              <div className="flex flex-wrap gap-2">
                {detailer.services.map((s) => (
                  <span key={s} className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        {detailer.latitude && detailer.longitude && (
          <div className="mt-8 space-y-3">
            <h2 className="text-xl font-bold text-foreground">Ubicación</h2>
            <DetailerMap latitude={detailer.latitude} longitude={detailer.longitude} businessName={detailer.business_name} />
          </div>
        )}

        {/* Portfolio */}
        {portfolio.length > 0 && (
          <div className="mt-8 space-y-4">
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
