import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { getFormationBySlug } from '@/data/formationDetails';
import { CourseHero } from '@/components/course/CourseHero';
import { CourseLearn } from '@/components/course/CourseLearn';
import type { CourseVideo } from '@/components/course/CourseVideos';
import detailingHero from '@/assets/heroes/hero-detailing.jpg?w=640;960;1280&format=webp&as=picture';
import wrappingHero from '@/assets/heroes/hero-wrapping.jpg?w=640;960;1280&format=webp&as=picture';
import ppfHero from '@/assets/heroes/hero-ppf.jpg?w=640;960;1280&format=webp&as=picture';
import restauracionHero from '@/assets/heroes/hero-restauracion.jpg?w=640;960;1280&format=webp&as=picture';

const CourseSyllabus = lazy(() => import('@/components/course/CourseSyllabus').then((m) => ({ default: m.CourseSyllabus })));
const CourseVideos = lazy(() => import('@/components/course/CourseVideos').then((m) => ({ default: m.CourseVideos })));
const CourseInstructor = lazy(() => import('@/components/course/CourseInstructor').then((m) => ({ default: m.CourseInstructor })));
const CoursePricing = lazy(() => import('@/components/course/CoursePricing').then((m) => ({ default: m.CoursePricing })));
const CourseWaitlist = lazy(() => import('@/components/course/CourseWaitlist').then((m) => ({ default: m.CourseWaitlist })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const BrandStrip = lazy(() => import('@/components/ds/BrandStrip').then((m) => ({ default: m.BrandStrip })));
const CourseFaq = lazy(() => import('@/components/course/CourseFaq').then((m) => ({ default: m.CourseFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const heroBySlug: Record<string, ImagetoolsPicture> = {
  'curso-detailing-profesional': detailingHero,
  'curso-vinilado-vehiculos': wrappingHero,
  'curso-ppf-proteccion-pintura': ppfHero,
  'curso-restauracion-vehiculos': restauracionHero,
};

const pathToSlugMap: Record<string, string> = {
  '/curso-detailing-profesional': 'curso-detailing-profesional',
  '/curso-vinilado-vehiculos': 'curso-vinilado-vehiculos',
  '/curso-ppf-proteccion-pintura': 'curso-ppf-proteccion-pintura',
  '/curso-restauracion-vehiculos': 'curso-restauracion-vehiculos',
};

// Vídeos del canal de Detail Park grabados en cada curso
const videosBySlug: Record<string, CourseVideo[]> = {
  'curso-detailing-profesional': [
    { id: 'GWda5NH90YM', title: 'Testimonio de Pedro Cardón, alumno del curso de detailing' },
    { id: 'iJjIZ4Ja7RA', title: 'Testimonio de Matías, alumno del curso de detailing' },
    { id: 'U1qm6XXaQaE', title: 'Testimonio de Juan Emilio, alumno del curso de detailing' },
  ],
  'curso-ppf-proteccion-pintura': [{ id: 'xvfLq467Mis', title: 'Curso de Paint Protection Film en Detail Park, Alicante' }],
  'curso-vinilado-vehiculos': [{ id: '0b8VwDTfxe8', title: 'Curso de wrapping profesional en Alicante' }],
};

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

export default function FormationDetailPage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const slug = pathToSlugMap[location.pathname] || paramSlug;
  const formation = slug ? getFormationBySlug(slug) : undefined;

  if (!formation || !slug) return <Navigate to="/" replace />;

  const videos = videosBySlug[slug];
  const formationSEO = seoConfig.getFormationSEO(slug, formation);
  const breadcrumbs = [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: formation.name, url: `/${slug}` },
  ];

  return (
    <>
      <SEO {...formationSEO} noindex={formation.comingSoon} />
      <MainLayout>
        <CourseHero formation={formation} picture={heroBySlug[slug]} breadcrumbs={breadcrumbs} />
        <CourseLearn formation={formation} />
        <Suspense fallback={<Placeholder />}>
          <CourseSyllabus formation={formation} />
          {formation.comingSoon ? (
            <CourseWaitlist slug={slug} name={formation.name} />
          ) : (
            <>
              {videos && (
                <CourseVideos
                  videos={videos}
                  {...(slug === 'curso-detailing-profesional' && {
                    title: 'Lo cuentan nuestros alumnos',
                    lead: 'Testimonios en vídeo de alumnos del curso, publicados en el canal de Detail Park.',
                  })}
                />
              )}
              {formation.instructor && <CourseInstructor instructor={formation.instructor} />}
              <CoursePricing formation={formation} />
              <BrandStrip group={formation.brandGroup} />
              <StudentReviews tone="card" />
              <CourseFaq faqs={formation.faqs} />
              <CtaBand
                title="¿Reservamos tu plaza?"
                text={`Escríbenos y te contamos las próximas fechas del ${formation.name.toLowerCase()}, cómo reservar y las opciones de pago.`}
                whatsappText={`Hola, quiero información sobre el ${formation.name}.`}
                primaryLabel="Reservar plaza"
                primaryHref={`/contacto?curso=${slug}`}
              />
            </>
          )}
        </Suspense>
      </MainLayout>
    </>
  );
}
