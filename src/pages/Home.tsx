import { lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { FormationsGrid } from '@/components/home/FormationsGrid';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

// Componentes below-the-fold - carga diferida para mejor LCP
const CompetitiveComparison = lazy(() => import('@/components/home/CompetitiveComparison').then(m => ({ default: m.CompetitiveComparison })));
const BusinessSkillsSection = lazy(() => import('@/components/home/BusinessSkillsSection').then(m => ({ default: m.BusinessSkillsSection })));
const CarreraNegocioSection = lazy(() => import('@/components/home/CarreraNegocioSection').then(m => ({ default: m.CarreraNegocioSection })));
const MontamosTuCentro = lazy(() => import('@/components/home/MontamosTuCentro').then(m => ({ default: m.MontamosTuCentro })));
const InstructorSection = lazy(() => import('@/components/home/InstructorSection').then(m => ({ default: m.InstructorSection })));
const GalleryPreview = lazy(() => import('@/components/home/GalleryPreview').then(m => ({ default: m.GalleryPreview })));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const SuccessStoriesLogos = lazy(() => import('@/components/home/SuccessStoriesLogos').then(m => ({ default: m.SuccessStoriesLogos })));
const HomeFAQ = lazy(() => import('@/components/home/HomeFAQ').then(m => ({ default: m.HomeFAQ })));
const HomeCTA = lazy(() => import('@/components/home/HomeCTA').then(m => ({ default: m.HomeCTA })));

// Skeleton placeholder para lazy components
const SectionSkeleton = () => (
  <div className="py-16 md:py-24 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="h-8 bg-muted/30 rounded w-1/3 mx-auto mb-4" />
      <div className="h-4 bg-muted/20 rounded w-1/2 mx-auto" />
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <SEO {...seoConfig.home} />
      <MainLayout>
        {/* Componentes críticos above-the-fold - carga síncrona */}
        <HomeHero />
        <FormationsGrid />
        
        {/* Componentes below-the-fold - carga diferida */}
        <Suspense fallback={<SectionSkeleton />}>
          <CompetitiveComparison />
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
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SuccessStoriesLogos />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HomeFAQ />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HomeCTA />
        </Suspense>
      </MainLayout>
    </>
  );
}
