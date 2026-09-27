import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { formationDetails } from '@/data/formationDetails';
import { formatPrice } from '@/lib/format';
import detailingImg from '@/assets/heroes/hero-detailing.jpg?w=480;720;960&format=webp&as=picture';
import wrappingImg from '@/assets/heroes/hero-wrapping.jpg?w=480;720;960&format=webp&as=picture';
import ppfImg from '@/assets/heroes/hero-ppf.jpg?w=480;720;960&format=webp&as=picture';
import carreraImg from '@/assets/instalaciones-curso-ferrari.jpg?w=640;960;1280&format=webp&as=picture';
import jornadaZeroImg from '@/assets/evento-grupo-coche-rojo.jpg?w=320;480&format=webp&as=picture';
import upDetailImg from '@/assets/evento-clase-completa.jpg?w=320;480&format=webp&as=picture';

const courses = [
  {
    slug: 'curso-detailing-profesional',
    name: 'Curso de Detailing',
    duration: '4 días',
    image: detailingImg,
    alt: 'Alumno puliendo la carrocería de un coche negro con una pulidora roto-orbital',
    text: 'Corrección de pintura, pulido con rotativa y roto-orbital, tratamiento cerámico e interiores.',
  },
  {
    slug: 'curso-vinilado-vehiculos',
    name: 'Curso de Car Wrapping',
    duration: '2 a 4 días',
    image: wrappingImg,
    alt: 'Alumno instalando vinilo en la carrocería de un coche',
    text: 'Vinilado y cambio de color: tensión, calor, curvas, recortes y acabado de bordes.',
  },
  {
    slug: 'curso-ppf-proteccion-pintura',
    name: 'Curso de PPF',
    duration: '2 días',
    image: ppfImg,
    alt: 'Instalación de film de protección de pintura en el frontal de un coche azul',
    text: 'Instalación de film de protección de pintura: corte, colocación en húmedo y zonas complejas.',
  },
];

const starters = [
  {
    href: '/jornada-zero-detailing',
    name: 'Jornada Zero',
    meta: '1 día · 97 € + IVA',
    image: jornadaZeroImg,
    alt: 'Grupo de alumnos alrededor de un coche rojo durante la Jornada Zero',
    text: 'Tu primer contacto con el detailing profesional, de la mano del equipo de Detail Park.',
  },
  {
    href: '/up-detail-evento',
    name: 'Up Detail',
    meta: '1 día intensivo · evento puntual',
    image: upDetailImg,
    alt: 'Alumnos en una sesión de formación en las instalaciones de Detail Park',
    text: 'Aprende lo máximo en el menor tiempo: demostraciones y práctica con profesionales, comida incluida.',
  },
];

export function HomeCourses() {
  return (
    <Section id="formaciones" aria-labelledby="formaciones-title">
      <SectionHeader
        id="formaciones-title"
        eyebrow="Formaciones"
        title="Elige tu curso"
        lead="Cursos intensivos y presenciales en el taller de Detail Park. Todos empiezan desde cero e incluyen material, comida y certificado."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((c) => {
          const detail = formationDetails[c.slug];
          return (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="ds-card group flex flex-col overflow-hidden transition-colors hover:border-white/25"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Img picture={c.image} alt={c.alt} sizes="(min-width: 768px) 33vw, 100vw" className="h-full transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {c.duration}
                </p>
                <h3 className="ds-h3 text-foreground">{c.name}</h3>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{c.text}</p>
                <div className="mt-2 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-heading text-2xl text-foreground">{formatPrice(detail.price)}</span> + IVA
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Ver el curso
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Carrera: programa completo */}
      <Link
        to="/formacion-profesional-detailing"
        className="ds-card group mt-6 grid overflow-hidden transition-colors hover:border-white/25 md:grid-cols-2"
      >
        <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
          <Img picture={carreraImg} alt="Alumnos en las instalaciones de Detail Park junto a un Ferrari rojo" sizes="(min-width: 768px) 50vw, 100vw" className="h-full transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
          <p className="ds-eyebrow">Programa completo</p>
          <h3 className="font-heading text-3xl font-normal uppercase tracking-wide text-foreground md:text-4xl">Carrera Detailing</h3>
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Todas las especialidades más un módulo de negocio: precios, captación de clientes y cómo montar tu propio centro. Para quien quiere dedicarse al detailing.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Ver el programa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>

      {/* Primer contacto */}
      <div className="mt-16">
        <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="ds-eyebrow">Si empiezas desde cero</p>
            <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">Prueba antes con una jornada de un día</h3>
          </div>
          <Link to="/curso-detailing-iniciacion" className="text-sm font-semibold text-brand hover:underline">
            Comparar las jornadas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {starters.map((s) => (
            <Link key={s.href} to={s.href} className="ds-card group grid grid-cols-[112px_1fr] overflow-hidden transition-colors hover:border-white/25 sm:grid-cols-[160px_1fr]">
              <Img picture={s.image} alt={s.alt} sizes="160px" className="h-full" />
              <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                <h4 className="text-lg font-bold text-foreground">{s.name}</h4>
                <p className="text-sm font-semibold text-brand">{s.meta}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Próximamente: <Link to="/curso-restauracion-vehiculos" className="font-semibold text-foreground underline underline-offset-4">curso de restauración</Link> de cuero, tapicerías y coches clásicos.
        </p>
      </div>
    </Section>
  );
}
