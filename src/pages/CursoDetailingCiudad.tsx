import { lazy, Suspense } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { BedDouble, Car, MapPin, Plane, TrainFront } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { CourseHero } from '@/components/course/CourseHero';
import { formationDetails } from '@/data/formationDetails';
import { SITE } from '@/data/site';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/utils/seoConfig';
import heroImg from '@/assets/heroes/hero-detailing.jpg?w=640;960;1280&format=webp&as=picture';
import tallerImg from '@/assets/instalaciones-curso-ferrari.jpg?w=480;800;1100&format=webp&as=picture';

// Por debajo de la primera pantalla: carga diferida para no retrasar el LCP.
const CourseLearn = lazy(() => import('@/components/course/CourseLearn').then((m) => ({ default: m.CourseLearn })));
const CourseSyllabus = lazy(() => import('@/components/course/CourseSyllabus').then((m) => ({ default: m.CourseSyllabus })));
const CoursePricing = lazy(() => import('@/components/course/CoursePricing').then((m) => ({ default: m.CoursePricing })));
const StudentReviews = lazy(() => import('@/components/ds/StudentReviews').then((m) => ({ default: m.StudentReviews })));
const CourseFaq = lazy(() => import('@/components/course/CourseFaq').then((m) => ({ default: m.CourseFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

interface TravelOption {
  mode: 'tren' | 'coche' | 'avion';
  text: string;
}

interface CityInfo {
  nombre: string;
  /** Entradilla del hero */
  lead: string;
  /** Cómo llegar a Alicante (tiempos aproximados) */
  travel: TravelOption[];
  /** Consejo para organizar el viaje */
  tip: string;
  /** Respuesta a «¿El curso se imparte en {ciudad}?» */
  whereAnswer: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const cityData: Record<string, CityInfo> = {
  madrid: {
    nombre: 'Madrid',
    lead:
      'El curso se imparte en Detail Park, nuestro taller de Alicante, a unas 2 h 30 min de Madrid en tren. Cuatro días de pulido, corrección de pintura, cerámicos e interiores, en grupos de máximo 3 alumnos.',
    travel: [
      { mode: 'tren', text: 'Unas 2 h 30 min en tren de alta velocidad hasta la estación de Alicante, con salidas cada día.' },
      { mode: 'coche', text: 'Unas 4 h por la A-3 y la A-31 (unos 420 km).' },
    ],
    tip: 'Lo más cómodo es llegar en tren la tarde anterior al primer día y volver al terminar el cuarto.',
    whereAnswer:
      'No. Todos los cursos son presenciales en Detail Park, en Alicante (Calle Metalurgias, 13). Desde Madrid se llega en unas 2 h 30 min en tren de alta velocidad, y te ayudamos a buscar alojamiento cerca del taller.',
    seoTitle: 'Curso de Detailing para alumnos de Madrid | Taller real en Alicante',
    seoDescription:
      'Curso de detailing presencial de 4 días en un taller real de Alicante, a unas 2 h 30 min de Madrid en tren. Grupos de máximo 3 alumnos, comida incluida y certificado.',
    seoKeywords:
      'curso detailing Madrid, formación detailing Madrid, academia detailing Madrid, aprender detailing Madrid, curso pulido coches Madrid, detailing profesional Madrid',
  },
  barcelona: {
    nombre: 'Barcelona',
    lead:
      'El curso se imparte en Detail Park, nuestro taller de Alicante, a algo más de una hora de Barcelona en avión. Cuatro días de pulido, corrección de pintura, cerámicos e interiores, en grupos de máximo 3 alumnos.',
    travel: [
      { mode: 'avion', text: 'Vuelo directo de algo más de 1 h hasta el aeropuerto de Alicante-Elche.' },
      { mode: 'tren', text: 'Unas 5 h en tren por el corredor mediterráneo.' },
      { mode: 'coche', text: 'Unas 5 h 30 min por la AP-7 (unos 530 km).' },
    ],
    tip: 'Si vienes en avión, reserva la llegada la tarde anterior: las jornadas empiezan por la mañana y duran unas 8 horas.',
    whereAnswer:
      'No. Todos los cursos son presenciales en Detail Park, en Alicante (Calle Metalurgias, 13). Desde Barcelona hay vuelo directo de algo más de una hora al aeropuerto de Alicante-Elche, y te ayudamos a buscar alojamiento cerca del taller.',
    seoTitle: 'Curso de Detailing para alumnos de Barcelona | Taller real en Alicante',
    seoDescription:
      'Curso de detailing presencial de 4 días en un taller real de Alicante, a algo más de una hora de Barcelona en avión. Grupos de máximo 3 alumnos, comida incluida y certificado.',
    seoKeywords:
      'curso detailing Barcelona, formación detailing Barcelona, academia detailing Barcelona, aprender detailing Barcelona, curso pulido coches Barcelona, detailing profesional Barcelona',
  },
  valencia: {
    nombre: 'Valencia',
    lead:
      'El curso se imparte en Detail Park, nuestro taller de Alicante, a unas 2 horas de Valencia. Cuatro días de pulido, corrección de pintura, cerámicos e interiores, en grupos de máximo 3 alumnos.',
    travel: [
      { mode: 'tren', text: 'Entre 1 h 30 min y 2 h en tren hasta la estación de Alicante, según el servicio.' },
      { mode: 'coche', text: 'Unas 2 h por la A-7 o la AP-7 (unos 170 km).' },
    ],
    tip: 'Desde Valencia se puede ir y volver cada día, pero con jornadas de unas 8 horas suele compensar dormir en Alicante durante el curso.',
    whereAnswer:
      'No. Todos los cursos son presenciales en Detail Park, en Alicante (Calle Metalurgias, 13). Desde Valencia se llega en unas 2 horas en tren o en coche.',
    seoTitle: 'Curso de Detailing para alumnos de Valencia | Taller real en Alicante',
    seoDescription:
      'Curso de detailing presencial de 4 días en un taller real de Alicante, a unas 2 horas de Valencia en tren o en coche. Grupos de máximo 3 alumnos, comida incluida y certificado.',
    seoKeywords:
      'curso detailing Valencia, formación detailing Valencia, academia detailing Valencia, aprender detailing Valencia, curso pulido coches Valencia, detailing profesional Valencia',
  },
  sevilla: {
    nombre: 'Sevilla',
    lead:
      'El curso se imparte en Detail Park, nuestro taller de Alicante. Desde Sevilla es un viaje largo, así que lo organizamos para que aproveches la estancia: cuatro días intensivos de pulido, corrección de pintura, cerámicos e interiores.',
    travel: [
      { mode: 'coche', text: 'Unas 6 h por la A-92 y la A-7 (unos 600 km).' },
      { mode: 'tren', text: 'Con transbordo en Madrid: calcula unas 5 h 30 min o más en total.' },
      { mode: 'avion', text: 'Consulta vuelos al aeropuerto de Alicante-Elche; según la temporada puede haber conexión directa.' },
    ],
    tip: 'Con un viaje de varias horas, lo habitual es llegar el día anterior y volver al día siguiente de terminar.',
    whereAnswer:
      'No. Todos los cursos son presenciales en Detail Park, en Alicante (Calle Metalurgias, 13). Desde Sevilla se llega en unas 6 horas en coche o en tren con transbordo en Madrid, y te ayudamos a buscar alojamiento cerca del taller.',
    seoTitle: 'Curso de Detailing para alumnos de Sevilla | Taller real en Alicante',
    seoDescription:
      '¿Quieres aprender detailing desde Sevilla? Curso presencial de 4 días en un taller real de Alicante. Grupos de máximo 3 alumnos, comida incluida, certificado y ayuda con el alojamiento.',
    seoKeywords:
      'curso detailing Sevilla, formación detailing Sevilla, academia detailing Sevilla, aprender detailing Andalucía, curso pulido coches Sevilla, detailing profesional Sevilla',
  },
  bilbao: {
    nombre: 'Bilbao',
    lead:
      'El curso se imparte en Detail Park, nuestro taller de Alicante, a menos de dos horas de Bilbao en avión. Cuatro días de pulido, corrección de pintura, cerámicos e interiores, en grupos de máximo 3 alumnos.',
    travel: [
      { mode: 'avion', text: 'Vuelo directo de alrededor de 1 h 30 min hasta el aeropuerto de Alicante-Elche.' },
      { mode: 'coche', text: 'Más de 7 h (unos 800 km); normalmente compensa el avión.' },
      { mode: 'tren', text: 'Con transbordo en Madrid.' },
    ],
    tip: 'Si vienes en avión, reserva la llegada la tarde anterior: las jornadas empiezan por la mañana y duran unas 8 horas.',
    whereAnswer:
      'No. Todos los cursos son presenciales en Detail Park, en Alicante (Calle Metalurgias, 13). Desde Bilbao hay vuelo directo al aeropuerto de Alicante-Elche, y te ayudamos a buscar alojamiento cerca del taller.',
    seoTitle: 'Curso de Detailing para alumnos de Bilbao | Taller real en Alicante',
    seoDescription:
      '¿Eres de Bilbao? Curso de detailing presencial de 4 días en un taller real de Alicante, con vuelo directo desde Bilbao. Grupos de máximo 3 alumnos, comida incluida y certificado.',
    seoKeywords:
      'curso detailing Bilbao, formación detailing País Vasco, academia detailing Bilbao, aprender detailing País Vasco, curso pulido coches Bilbao, detailing profesional Bilbao',
  },
};

const travelIcon = { tren: TrainFront, coche: Car, avion: Plane } as const;
const travelLabel = { tren: 'En tren', coche: 'En coche', avion: 'En avión' } as const;

/** Sección propia de cada ciudad: cómo llegar a Alicante y dónde alojarse */
function CityTravel({ city }: { city: CityInfo }) {
  return (
    <Section tone="card" aria-labelledby="viaje-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <SectionHeader
            id="viaje-title"
            align="left"
            eyebrow={`Si vienes desde ${city.nombre}`}
            title={`Cómo llegar a Alicante desde ${city.nombre}`}
            lead="El curso es presencial en nuestro taller de Alicante. Tiempos aproximados:"
            className="mb-8"
          />
          <ul className="flex flex-col gap-3">
            {city.travel.map((t) => {
              const Icon = travelIcon[t.mode];
              return (
                <li key={t.mode} className="flex gap-4 rounded-xl border border-border bg-background p-4 md:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">{travelLabel[t.mode]}</h3>
                    <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                </li>
              );
            })}
            <li className="flex gap-4 rounded-xl border border-border bg-background p-4 md:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand">
                <BedDouble className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Alojamiento</h3>
                <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Te ayudamos a buscar alojamiento cerca del taller (no está incluido en el precio). {city.tip}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <figure className="flex h-fit flex-col overflow-hidden rounded-xl border border-border bg-background">
          <Img picture={tallerImg} alt="Instalaciones de Detail Park en Alicante durante una formación" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3]" />
          <figcaption className="flex gap-3 p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <div className="text-[0.9375rem] leading-relaxed">
              <p className="font-semibold text-foreground">Detail Park, {SITE.city}</p>
              <p className="text-muted-foreground">
                {SITE.street}, {SITE.postalCode} {SITE.city}. Desde la estación de tren o el aeropuerto de Alicante-Elche se llega en taxi o en coche.
              </p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand underline underline-offset-4">
                Ver en Google Maps
              </a>
            </div>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export default function CursoDetailingCiudad() {
  // Las rutas son fijas (/curso-detailing-madrid…) y no traen :ciudad: se saca de la URL.
  const params = useParams<{ ciudad: string }>();
  const { pathname } = useLocation();
  const ciudad = params.ciudad ?? pathname.replace(/^\/curso-detailing-/, '').replace(/\/$/, '');

  const data = ciudad ? cityData[ciudad] : undefined;
  const formation = formationDetails['curso-detailing-profesional'];

  if (!data) return <Navigate to="/curso-detailing-profesional" replace />;

  const breadcrumbs = [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: formation.name, url: `/${formation.slug}` },
    { name: `Alumnos de ${data.nombre}`, url: `/curso-detailing-${ciudad}` },
  ];

  // Máximo 10 preguntas: la de la ciudad primero; la de marcas se queda en la página del curso.
  const faqs = [
    { question: `¿El curso de detailing se imparte en ${data.nombre}?`, answer: data.whereAnswer },
    ...formation.faqs.filter((f) => !f.question.includes('marcas')),
  ].slice(0, 10);

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        url={`/curso-detailing-${ciudad}`}
        keywords={data.seoKeywords}
        image="https://academiadetail.com/og-curso-detailing.jpg"
        schema={[
          generateBreadcrumbSchema([{ name: 'Inicio', url: '/' }, ...breadcrumbs.slice(1)]),
          generateFAQSchema(faqs),
        ]}
      />
      <MainLayout>
        <CourseHero
          formation={formation}
          picture={heroImg}
          breadcrumbs={breadcrumbs}
          eyebrow={`Desde ${data.nombre} · Curso presencial en Alicante`}
          heading={`Curso de detailing para alumnos de ${data.nombre}`}
          lead={data.lead}
        />
        <CityTravel city={data} />
        <Suspense fallback={<Placeholder />}>
          <CourseLearn formation={formation} />
          <CourseSyllabus formation={formation} />
          <CoursePricing formation={formation} />
          <StudentReviews tone="card" />
          <CourseFaq faqs={faqs} />
          <CtaBand
            title={`¿Vienes desde ${data.nombre}?`}
            text="Escríbenos y te contamos las próximas fechas del curso, cómo reservar tu plaza y cómo organizar el viaje y el alojamiento."
            whatsappText={`Hola, soy de ${data.nombre} y quiero información sobre el ${formation.name}.`}
            primaryLabel="Reservar plaza"
            primaryHref={`/contacto?curso=${formation.slug}`}
          />
        </Suspense>
      </MainLayout>
    </>
  );
}
