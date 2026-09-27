import { lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AboutHero } from '@/components/about/AboutHero';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

// Por debajo de la primera pantalla: carga diferida para no retrasar el LCP.
const AboutStory = lazy(() => import('@/components/about/AboutStory').then((m) => ({ default: m.AboutStory })));
const AboutTeam = lazy(() => import('@/components/about/AboutTeam').then((m) => ({ default: m.AboutTeam })));
const AboutGallerySection = lazy(() => import('@/components/about/AboutGallerySection').then((m) => ({ default: m.AboutGallerySection })));
const AboutVideoChannel = lazy(() => import('@/components/about/AboutVideoChannel').then((m) => ({ default: m.AboutVideoChannel })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

export default function AboutUs() {
  return (
    <>
      <SEO {...seoConfig.aboutUs} />
      <MainLayout>
        <AboutHero />
        <Suspense fallback={<Placeholder />}>
          <AboutStory />
          <AboutTeam />
          <AboutGallerySection />
          <AboutVideoChannel />
          <StudentReviews tone="card" />
          <CtaBand title="¿Quieres aprender en nuestro taller?" />
        </Suspense>
      </MainLayout>
    </>
  );
}
