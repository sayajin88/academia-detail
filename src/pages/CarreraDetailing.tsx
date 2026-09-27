import { lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { CourseHero } from '@/components/course/CourseHero';
import { CarreraProgram } from '@/components/carrera/CarreraProgram';
import { carreraCourse, carreraDetailingData } from '@/data/carreraDetailingData';
import heroImg from '@/assets/evento-practica-pulidora.jpg?w=640;960;1280&format=webp&as=picture';

// Por debajo de la primera pantalla: carga diferida para no retrasar el LCP.
const CarreraBusiness = lazy(() => import('@/components/carrera/CarreraBusiness').then((m) => ({ default: m.CarreraBusiness })));
const CourseInstructor = lazy(() => import('@/components/course/CourseInstructor').then((m) => ({ default: m.CourseInstructor })));
const CoursePricing = lazy(() => import('@/components/course/CoursePricing').then((m) => ({ default: m.CoursePricing })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const CourseFaq = lazy(() => import('@/components/course/CourseFaq').then((m) => ({ default: m.CourseFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

const breadcrumbs = [
  { name: 'Formaciones', url: '/#formaciones' },
  { name: 'Carrera Detailing', url: '/formacion-profesional-detailing' },
];

export default function CarreraDetailing() {
  const { slug } = carreraDetailingData;
  return (
    <>
      <SEO {...seoConfig.carreraDetailing} />
      <MainLayout>
        <CourseHero
          formation={carreraCourse}
          picture={heroImg}
          breadcrumbs={breadcrumbs}
          eyebrow="Carrera Detailing · 1 mes en Alicante"
          heading="Formación profesional de detailing"
        />
        <CarreraProgram />
        <Suspense fallback={<Placeholder />}>
          <CarreraBusiness />
          {carreraCourse.instructor && <CourseInstructor instructor={carreraCourse.instructor} />}
          <CoursePricing formation={carreraCourse} />
          <StudentReviews tone="card" />
          <CourseFaq faqs={carreraDetailingData.faqs} title="Preguntas sobre la Carrera Detailing" />
          <CtaBand
            title="¿Hablamos de tu Carrera Detailing?"
            text="Escríbenos y te contamos el calendario de la próxima edición, cómo reservar tu plaza y las opciones de pago."
            whatsappText="Hola, quiero información sobre la Carrera Detailing."
            primaryLabel="Pedir información"
            primaryHref={`/contacto?curso=${slug}`}
          />
        </Suspense>
      </MainLayout>
    </>
  );
}
