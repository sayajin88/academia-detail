import { lazy, Suspense, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeCourses } from '@/components/home/HomeCourses';
import { SEO } from '@/components/SEO';
import { generateHomeSEO } from '@/utils/seoCore';
import { formations } from '@/data/formations';
import { formationDetails } from '@/data/formationDetails';

// Por debajo de la primera pantalla: carga diferida para no retrasar el LCP.
const HomeWhy = lazy(() => import('@/components/home/HomeWhy').then((m) => ({ default: m.HomeWhy })));
const HomeInstructor = lazy(() => import('@/components/home/HomeInstructor').then((m) => ({ default: m.HomeInstructor })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const HomeBusiness = lazy(() => import('@/components/home/HomeBusiness').then((m) => ({ default: m.HomeBusiness })));
const BrandStrip = lazy(() => import('@/components/ds/BrandStrip').then((m) => ({ default: m.BrandStrip })));
const HomeFaq = lazy(() => import('@/components/home/HomeFaq').then((m) => ({ default: m.HomeFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

export default function Home() {
  const homeSEO = useMemo(() => generateHomeSEO(formations, formationDetails), []);

  return (
    <>
      <SEO {...homeSEO} />
      <MainLayout overlapHeader>
        <HomeHero />
        <HomeCourses />
        <Suspense fallback={<Placeholder />}>
          <HomeWhy />
          <HomeInstructor />
          <StudentReviews tone="card" />
          <BrandStrip />
          <HomeBusiness />
          <HomeFaq />
          <CtaBand />
        </Suspense>
      </MainLayout>
    </>
  );
}
