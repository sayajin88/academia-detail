import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Eye, MessageCircleQuestion, Presentation, Users } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { Section, SectionHeader } from '@/components/ds/Section';
import { EventHero } from '@/components/jornadas/EventHero';
import { NEXT_EDITION } from '@/data/site';
import { JORNADA_ZERO, JORNADAS_HUB_NAME, UP_DETAIL, upDetailFaqs } from '@/data/jornadas';
import heroImg from '@/assets/evento-clase-completa.jpg?w=640;960;1280&format=webp&as=picture';

// Por debajo de la primera pantalla: carga diferida.
const UpDetailVideos = lazy(() => import('@/components/jornadas/UpDetailSections').then((m) => ({ default: m.UpDetailVideos })));
const UpDetailSpeakers = lazy(() => import('@/components/jornadas/UpDetailSections').then((m) => ({ default: m.UpDetailSpeakers })));
const UpDetailWaitlist = lazy(() => import('@/components/jornadas/UpDetailSections').then((m) => ({ default: m.UpDetailWaitlist })));
const CourseFaq = lazy(() => import('@/components/course/CourseFaq').then((m) => ({ default: m.CourseFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

const points = [
  { icon: Presentation, title: 'Demostraciones en directo', text: 'Técnicas profesionales explicadas paso a paso sobre vehículos reales.' },
  { icon: Eye, title: 'Varios puntos de vista', text: 'Profesionales invitados con especialidades y formas de trabajar distintas.' },
  { icon: MessageCircleQuestion, title: 'Tiempo para preguntar', text: 'Resuelves tus dudas con quien lo está haciendo delante de ti.' },
  { icon: Users, title: 'Contacto con el sector', text: 'Conoces a los ponentes y a otros asistentes con tu misma pasión.' },
];

export default function UpDetail() {
  return (
    <>
      <SEO {...seoConfig.upDetail} />
      <MainLayout>
        <EventHero
          breadcrumbs={[
            { name: JORNADAS_HUB_NAME, url: '/curso-detailing-iniciacion' },
            { name: UP_DETAIL.name, url: `/${UP_DETAIL.slug}` },
          ]}
          eyebrow="Formato intensivo · Alicante"
          title="Up Detail: aprende lo máximo en el menor tiempo"
          lead="Un formato de formación para aprender todo lo posible en el menor tiempo posible. Es más una demostración que un curso y se suele hacer de forma intensiva en un día, en Detail Park."
          facts={[
            { icon: Clock, label: 'Duración', value: UP_DETAIL.duration },
            { icon: Presentation, label: 'Formato', value: 'Demostración' },
            { icon: CalendarDays, label: 'Fechas', value: NEXT_EDITION },
          ]}
          price={UP_DETAIL.price}
          cta={{ label: 'Avisarme de la fecha', href: '#preregistro' }}
          whatsappText="Hola, quiero información sobre Up Detail."
          picture={heroImg}
          alt="Alumnos en una sesión de formación en las instalaciones de Detail Park"
        />

        <Section aria-labelledby="formato-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <SectionHeader id="formato-title" align="left" eyebrow="El formato" title="Qué es Up Detail" className="mb-6" />
              <div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Durante una jornada intensiva ves de cerca cómo trabajan profesionales del detailing y te explican qué hacen y por qué. Es la
                  forma de absorber mucha técnica en poco tiempo.
                </p>
                <p>
                  Si lo que buscas es empezar desde cero practicando tú, la{' '}
                  <Link to={`/${JORNADA_ZERO.slug}`} className="font-semibold text-brand underline underline-offset-4">
                    Jornada Zero
                  </Link>{' '}
                  o el{' '}
                  <Link to="/curso-detailing-profesional" className="font-semibold text-brand underline underline-offset-4">
                    curso de detailing
                  </Link>{' '}
                  encajan mejor.
                </p>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p.title} className="ds-card p-5 md:p-6">
                  <p.icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Suspense fallback={<Placeholder />}>
          <UpDetailVideos />
          <UpDetailSpeakers />
          <UpDetailWaitlist />
          {/* El marcado FAQPage lo genera seoConfig.upDetail */}
          <CourseFaq faqs={upDetailFaqs} title="Preguntas sobre Up Detail" />
          <CtaBand
            title="¿Tienes dudas sobre Up Detail?"
            text="Escríbenos y te contamos cómo es la jornada, quién participa y cuándo será la próxima edición."
            whatsappText="Hola, quiero información sobre Up Detail."
            primaryLabel="Solicitar información"
            primaryHref="/contacto?curso=up-detail-evento"
          />
        </Suspense>
      </MainLayout>
    </>
  );
}
