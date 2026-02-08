import { lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutHistory } from '@/components/about/AboutHistory';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

// Below-the-fold sections — lazy loaded
const AboutTeam = lazy(() => import('@/components/about/AboutTeam').then(m => ({ default: m.AboutTeam })));
const AboutStats = lazy(() => import('@/components/about/AboutStats').then(m => ({ default: m.AboutStats })));
const AboutGallerySection = lazy(() => import('@/components/about/AboutGallerySection').then(m => ({ default: m.AboutGallerySection })));
const AboutVideoChannel = lazy(() => import('@/components/about/AboutVideoChannel').then(m => ({ default: m.AboutVideoChannel })));
const JornadaZeroSection = lazy(() => import('@/components/shared/JornadaZeroSection').then(m => ({ default: m.JornadaZeroSection })));

const SectionSkeleton = ({ variant = 'default' }: { variant?: 'default' | 'card' }) => (
  <div className={`py-16 md:py-24 ${variant === 'card' ? 'bg-card' : 'bg-background'}`}>
    <div className="container mx-auto px-4">
      <div className="h-8 skeleton-shimmer rounded w-1/3 mx-auto mb-4" />
      <div className="h-4 skeleton-shimmer rounded w-1/2 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 skeleton-shimmer rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export default function AboutUs() {
  return (
    <>
      <SEO {...seoConfig.aboutUs} />
      <MainLayout>
        {/* Above-the-fold — carga síncrona */}
        <AboutHero />
        <AboutHistory />
        <AboutPhilosophy />

        {/* Below-the-fold — carga diferida */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutTeam />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutStats />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutGallerySection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutVideoChannel />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <JornadaZeroSection />
        </Suspense>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card section-divider">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para Aprender de los que Viven del Detailing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a nuestra academia y aprende de profesionales que trabajan en el taller cada día.
              Formación real, en entorno real, con resultados reales.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/">
                Ver Formaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
