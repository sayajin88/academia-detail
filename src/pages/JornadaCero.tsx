import { lazy, Suspense } from 'react';
import { CalendarDays, Check, Clock, GraduationCap } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { Section, SectionHeader } from '@/components/ds/Section';
import { EventHero } from '@/components/jornadas/EventHero';
import { NEXT_EDITION } from '@/data/site';
import { formationDetails } from '@/data/formationDetails';
import { JORNADA_ZERO, JORNADAS_HUB_NAME, jornadaZeroFaqs } from '@/data/jornadas';
import heroImg from '@/assets/evento-grupo-coche-rojo.jpg?w=640;960;1280&format=webp&as=picture';

// Por debajo de la primera pantalla: carga diferida.
const JornadaZeroDay = lazy(() => import('@/components/jornadas/JornadaZeroSections').then((m) => ({ default: m.JornadaZeroDay })));
const JornadaZeroPricing = lazy(() => import('@/components/jornadas/JornadaZeroSections').then((m) => ({ default: m.JornadaZeroPricing })));
const CourseInstructor = lazy(() => import('@/components/course/CourseInstructor').then((m) => ({ default: m.CourseInstructor })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const OtherStarts = lazy(() => import('@/components/jornadas/OtherStarts').then((m) => ({ default: m.OtherStarts })));
const CourseFaq = lazy(() => import('@/components/course/CourseFaq').then((m) => ({ default: m.CourseFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

const whatYouDo = [
  'Conocer los productos de un taller profesional: para qué sirve cada uno y cómo se aplica',
  'Lavar y descontaminar un vehículo real con el método del taller',
  'Limpiar un interior a fondo con las herramientas adecuadas',
  'Dar tus primeros pasos con la pulidora y ver cómo se corrige la pintura',
  'Saber qué material conviene comprar primero para no gastar de más',
  'Resolver tus dudas sobre el oficio con el equipo de Detail Park',
];

const forWho = [
  'Quieres saber si el detailing es para ti antes de invertir en un curso completo',
  'Nunca has trabajado en un taller y empiezas desde cero',
  'Te gusta cuidar tu coche y quieres ver cómo lo hace un profesional',
  'Te planteas dedicarte a esto y quieres conocer el día a día real',
];

export default function JornadaCero() {
  const instructor = formationDetails['curso-detailing-profesional'].instructor;

  return (
    <>
      <SEO {...seoConfig.jornadaCero} />
      <MainLayout>
        <EventHero
          breadcrumbs={[
            { name: JORNADAS_HUB_NAME, url: '/curso-detailing-iniciacion' },
            { name: JORNADA_ZERO.name, url: `/${JORNADA_ZERO.slug}` },
          ]}
          eyebrow="Jornada de iniciación · Alicante"
          title="Jornada Zero: tu primer día de detailing profesional"
          lead="Un día en el taller de Detail Park, con su equipo, para descubrir el detailing profesional practicando sobre un vehículo real. Sin experiencia previa y antes de decidir si quieres hacer un curso completo."
          facts={[
            { icon: Clock, label: 'Duración', value: JORNADA_ZERO.duration },
            { icon: GraduationCap, label: 'Nivel', value: 'Desde cero' },
            { icon: CalendarDays, label: 'Fechas', value: NEXT_EDITION },
          ]}
          price={JORNADA_ZERO.price}
          cta={{ label: 'Reservar plaza', href: JORNADA_ZERO.contactHref }}
          whatsappText="Hola, quiero información sobre la Jornada Zero."
          note="Si después haces un curso completo, el importe de la jornada se descuenta."
          picture={heroImg}
          alt="Grupo de alumnos alrededor de un coche rojo en el taller de Detail Park"
        />

        <Section aria-labelledby="haras-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <SectionHeader id="haras-title" align="left" eyebrow="La jornada" title="Qué vas a hacer" className="mb-8" />
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {whatYouDo.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/90 md:text-base">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="ds-card h-fit p-6 md:p-8" aria-labelledby="paraquien-title">
              <h3 id="paraquien-title" className="text-lg font-bold text-foreground">Para quién es</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {forWho.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Suspense fallback={<Placeholder />}>
          <JornadaZeroDay />
          <JornadaZeroPricing />
          {instructor && <CourseInstructor instructor={instructor} />}
          <StudentReviews />
          <OtherStarts show={['up-detail', 'curso']} tone="card" />
          {/* El marcado FAQPage lo genera seoConfig.jornadaCero */}
          <CourseFaq faqs={jornadaZeroFaqs} title="Preguntas sobre la Jornada Zero" />
          <CtaBand
            title="¿Te guardamos plaza?"
            text="Escríbenos y te avisamos de la próxima Jornada Zero, cómo reservar y cualquier duda que tengas. Sin compromiso."
            whatsappText="Hola, quiero información sobre la Jornada Zero."
            primaryLabel="Reservar plaza"
            primaryHref={JORNADA_ZERO.contactHref}
          />
        </Suspense>
      </MainLayout>
    </>
  );
}
