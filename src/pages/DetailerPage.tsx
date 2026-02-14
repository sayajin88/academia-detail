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
import { MapPin, Phone, Globe, Instagram, MessageCircle, Calendar, Target, Award, CheckCircle, User, Building2, Sparkles, Car, Shield, Paintbrush, Layers, Wrench, Armchair, Cpu } from 'lucide-react';
import { getComunidadByProvincia, slugify } from '@/data/comunidadesAutonomas';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PortfolioImage {
  id: string;
  before_image_url: string | null;
  after_image_url: string | null;
  title: string | null;
}

const serviceIcons: Record<string, typeof Car> = {
  'Pulido': Paintbrush,
  'Cerámico': Shield,
  'PPF': Layers,
  'Wrapping': Car,
  'Interior': Armchair,
  'Restauración': Wrench,
  'Motores': Cpu,
};

function getServiceIcon(service: string) {
  for (const [key, Icon] of Object.entries(serviceIcons)) {
    if (service.toLowerCase().includes(key.toLowerCase())) return Icon;
  }
  return Sparkles;
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
          <Link to="/centros-detailing-espana" className="text-primary underline">Volver al directorio</Link>
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

  const sameAs = [
    detailer.instagram_handle && `https://instagram.com/${detailer.instagram_handle}`,
    detailer.website_url,
  ].filter(Boolean);

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
    ...(sameAs.length > 0 && { sameAs }),
    ...(detailer.services.length > 0 && {
      makesOffer: detailer.services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s },
      })),
    }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://academiadetail.com/' },
      { '@type': 'ListItem', position: 2, name: 'Centros Detailing España', item: 'https://academiadetail.com/centros-detailing-espana' },
      ...(comunidadName ? [{ '@type': 'ListItem', position: 3, name: comunidadName, item: `https://academiadetail.com/centros-detailing-espana/${comunidadSlug}` }] : []),
      { '@type': 'ListItem', position: comunidadName ? 4 : 3, name: detailer.province, item: `https://academiadetail.com/centros-detailing-espana/${comunidadSlug}/${provinciaSlug}` },
      { '@type': 'ListItem', position: comunidadName ? 5 : 4, name: detailer.city, item: `https://academiadetail.com/centros-detailing-espana/${comunidadSlug}/${provinciaSlug}/${ciudadSlug}` },
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

  // Separate portfolio into before/after pairs and gallery-only images
  const beforeAfterPairs = portfolio.filter(img => img.before_image_url && img.after_image_url);
  const galleryImages = portfolio.filter(img => img.after_image_url && !img.before_image_url);

  const ringClass = detailer.level_badge === 'elite_detailer'
    ? 'before:bg-[conic-gradient(hsl(45,93%,47%),hsl(45,93%,67%),hsl(50,100%,80%),hsl(45,93%,47%))] before:animate-ring-rotate'
    : detailer.level_badge === 'master_detailer'
    ? 'before:bg-[conic-gradient(hsl(220,10%,45%),hsl(220,15%,70%),hsl(220,20%,85%),hsl(220,10%,45%))] before:animate-ring-rotate'
    : 'before:bg-primary/40';

  return (
    <MainLayout>
      <Helmet>
        <title>{detailer.business_name} | Detailing en {detailer.city}, {detailer.province} - Academia Detail</title>
        <meta name="description" content={`${detailer.business_name} — ${typeLabel} ${badgeLabels[detailer.level_badge]} en ${detailer.city}, ${detailer.province}. ${detailer.services.slice(0, 3).join(', ')}. Certificado por Academia Detail ✅`} />
        <meta name="keywords" content={`detailing ${detailer.city}, ${detailer.services.join(', ')}, car detailing ${detailer.province}, ${detailer.business_name}`} />
        <link rel="canonical" href={`https://academiadetail.com/detailer/${detailer.slug}`} />
        {detailer.featured_image_url && <meta property="og:image" content={detailer.featured_image_url} />}
        <meta property="og:title" content={`${detailer.business_name} | Detailing en ${detailer.city}`} />
        <meta property="og:description" content={`${typeLabel} ${badgeLabels[detailer.level_badge]} en ${detailer.city}. ${detailer.services.slice(0, 3).join(', ')}.`} />
        <meta property="og:type" content="business.business" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-56 md:h-80 bg-muted">
        {detailer.featured_image_url ? (
          <img src={detailer.featured_image_url} alt={`${detailer.business_name} - Detailing en ${detailer.city}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-card to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        {/* Breadcrumbs on hero */}
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <Breadcrumb>
              <BreadcrumbList className="text-foreground/80">
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/centros-detailing-espana">Centros</Link></BreadcrumbLink></BreadcrumbItem>
                {comunidadName && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/centros-detailing-espana/${comunidadSlug}`}>{comunidadName}</Link></BreadcrumbLink></BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/centros-detailing-espana/${comunidadSlug}/${provinciaSlug}`}>{detailer.province}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/centros-detailing-espana/${comunidadSlug}/${provinciaSlug}/${ciudadSlug}`}>{detailer.city}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage className="text-foreground">{detailer.business_name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main content: 2-column layout */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Profile card */}
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl space-y-5">
              {/* Photo with animated ring */}
              <div className="flex justify-center">
                <div className={`relative w-32 h-32 rounded-full before:absolute before:inset-[-4px] before:rounded-full before:content-[''] ${ringClass}`}>
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-muted z-10">
                    {detailer.owner_photo_url ? (
                      <img src={detailer.owner_photo_url} alt={detailer.owner_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TypeIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Name & badge */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
                    <TypeIcon className="h-3.5 w-3.5" />
                    {typeLabel}
                  </span>
                  <DetailerBadge level={detailer.level_badge} size="md" />
                </div>
                <h2 className="text-xl font-bold text-foreground normal-case">{detailer.owner_name}</h2>
                {detailer.is_verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Verificado por Academia Detail
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Este profesional ha sido verificado por nuestro equipo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              {/* WhatsApp CTA */}
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full gap-2 bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,42%)] text-white shadow-lg animate-wa-pulse text-base py-5 rounded-xl font-bold">
                    <MessageCircle className="h-5 w-5" />
                    Contactar por WhatsApp
                  </Button>
                </a>
              )}

              {/* Secondary contact */}
              <div className="flex gap-2">
                {detailer.phone && (
                  <a href={`tel:${detailer.phone}`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2 text-sm"><Phone className="h-4 w-4" />Llamar</Button>
                  </a>
                )}
                {detailer.website_url && (
                  <a href={detailer.website_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full gap-2 text-sm"><Globe className="h-4 w-4" />Web</Button>
                  </a>
                )}
              </div>

              {/* Instagram */}
              {detailer.instagram_handle && (
                <a
                  href={`https://instagram.com/${detailer.instagram_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(25,95%,53%)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-5 w-5" />
                  @{detailer.instagram_handle}
                </a>
              )}

              {/* Location */}
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{detailer.address ? `${detailer.address}, ` : ''}{detailer.city}, {detailer.province}</span>
              </div>

              {/* Stats */}
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center space-y-1 p-2 rounded-lg bg-muted/50">
                      <stat.icon className="h-4 w-4 text-primary mx-auto" />
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xs font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="space-y-8 min-w-0">
            {/* H1 */}
            <div className="pt-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {detailer.business_name}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {typeLabel} de detailing en {detailer.city}, {detailer.province}
              </p>
            </div>

            {/* Description */}
            {detailer.description && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">Sobre {detailer.profile_type === 'centro' ? 'el centro' : 'mí'}</h2>
                <p className="text-muted-foreground leading-relaxed">{detailer.description}</p>
              </section>
            )}

            {/* Services with icons */}
            {detailer.services.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">Servicios</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {detailer.services.map((s) => {
                    const SIcon = getServiceIcon(s);
                    return (
                      <div key={s} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                        <SIcon className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground normal-case">{s}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Skills */}
            {detailer.skills && detailer.skills.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {detailer.skills.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                      <Sparkles className="h-3.5 w-3.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Map */}
            {detailer.latitude && detailer.longitude && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">Ubicación</h2>
                <DetailerMap latitude={detailer.latitude} longitude={detailer.longitude} businessName={detailer.business_name} />
              </section>
            )}

            {/* Portfolio: Before/After */}
            {beforeAfterPairs.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Portfolio — Antes / Después</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {beforeAfterPairs.map((img) => (
                    <BeforeAfterSlider
                      key={img.id}
                      beforeImage={img.before_image_url!}
                      afterImage={img.after_image_url!}
                      title={img.title || undefined}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Gallery images (after-only) */}
            {galleryImages.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors">
                      <img src={img.after_image_url!} alt={img.title || `Trabajo de ${detailer.business_name}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Banner */}
            <section className="rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 md:p-8 text-center space-y-4">
              <h2 className="text-2xl font-bold text-primary-foreground">¿Necesitas un servicio de detailing en {detailer.city}?</h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto normal-case">
                Contacta con {detailer.business_name} y consigue un acabado profesional certificado por Academia Detail.
              </p>
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,42%)] text-white font-bold mt-2">
                    <MessageCircle className="h-5 w-5" />
                    Contactar ahora
                  </Button>
                </a>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Floating WhatsApp CTA (mobile) */}
      {whatsappLink && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full gap-2 bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,42%)] text-white shadow-xl py-6 text-base rounded-xl animate-wa-pulse font-bold">
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
