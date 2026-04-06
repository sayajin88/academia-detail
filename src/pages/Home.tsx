import { lazy, Suspense, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { FormationsGrid } from '@/components/home/FormationsGrid';
import { SEO, localBusinessSchema, websiteSchema } from '@/components/SEO';
import { generateHomeSEO } from '@/utils/seoConfig';
import { formations } from '@/data/formations';
import { formationDetails } from '@/data/formationDetails';

// Componentes below-the-fold - carga diferida para mejor LCP
const CompetitiveComparison = lazy(() => import('@/components/home/CompetitiveComparison').then(m => ({ default: m.CompetitiveComparison })));
const BrandLogosBar = lazy(() => import('@/components/shared/BrandLogosBar').then(m => ({ default: m.BrandLogosBar })));
const BusinessSkillsSection = lazy(() => import('@/components/home/BusinessSkillsSection').then(m => ({ default: m.BusinessSkillsSection })));
const CarreraNegocioSection = lazy(() => import('@/components/home/CarreraNegocioSection').then(m => ({ default: m.CarreraNegocioSection })));
const MontamosTuCentro = lazy(() => import('@/components/home/MontamosTuCentro').then(m => ({ default: m.MontamosTuCentro })));
const InstructorSection = lazy(() => import('@/components/home/InstructorSection').then(m => ({ default: m.InstructorSection })));
const GalleryPreview = lazy(() => import('@/components/home/GalleryPreview').then(m => ({ default: m.GalleryPreview })));
const DirectoryJoinBanner = lazy(() => import('@/components/directory/DirectoryJoinBanner').then(m => ({ default: m.DirectoryJoinBanner })));

const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const SuccessStoriesLogos = lazy(() => import('@/components/home/SuccessStoriesLogos').then(m => ({ default: m.SuccessStoriesLogos })));
const GoogleReviews = lazy(() => import('@/components/shared/GoogleReviews').then(m => ({ default: m.GoogleReviews })));
const HomeFAQ = lazy(() => import('@/components/home/HomeFAQ').then(m => ({ default: m.HomeFAQ })));
const HomeCTA = lazy(() => import('@/components/home/HomeCTA').then(m => ({ default: m.HomeCTA })));
const JornadaZeroSection = lazy(() => import('@/components/shared/JornadaZeroSection').then(m => ({ default: m.JornadaZeroSection })));

// Skeleton placeholder para lazy components
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

export default function Home() {
  const homeSEO = useMemo(() => generateHomeSEO(formations, formationDetails), []);

  return (
    <>
      <SEO {...homeSEO} />
      <MainLayout>
        {/* Componentes críticos above-the-fold - carga síncrona */}
        <HomeHero />
        <FormationsGrid />
        
        {/* Jornada Zero - justo después de formaciones */}
        <Suspense fallback={<SectionSkeleton />}>
          <JornadaZeroSection />
        </Suspense>

        {/* Componentes below-the-fold - carga diferida */}
        <Suspense fallback={<SectionSkeleton />}>
          <CompetitiveComparison />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <BrandLogosBar variant="full" filter="all" />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <BusinessSkillsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CarreraNegocioSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <MontamosTuCentro />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <InstructorSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GalleryPreview />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <div className="container mx-auto px-4 py-16 md:py-24">
            <DirectoryJoinBanner />
          </div>
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SuccessStoriesLogos />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <GoogleReviews />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HomeFAQ />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HomeCTA />
        </Suspense>

        {/* LATAM SEO text block */}
        <section className="py-8 px-4 text-center text-sm text-muted-foreground">
          <p>
            ¿Buscas un <strong>curso de detailing de autos</strong> o
            <strong> curso de car detailing</strong> desde Latinoamérica?
            Formamos alumnos de México, Colombia, Argentina y Chile.
            Nuestro programa incluye gestión de alojamiento y atención personalizada
            para alumnos internacionales.{' '}
            <a href="/contacto" className="underline">Contáctanos</a>.
          </p>
        </section>
      </MainLayout>
    </>
  );
}
