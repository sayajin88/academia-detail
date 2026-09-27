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
    <Section id="formaciones" decor="glow" aria-labelledby="formaciones-title">
      <SectionHeader
        id="formaciones-title"
        eyebrow="Formaciones"
        title="Elige tu"
        accent="curso"
        lead="Cursos intensivos y presenciales en el taller de Detail Park. Todos empiezan desde cero e incluyen material, comida y certificado."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((c, i) => {
          const detail = formationDetails[c.slug];
          return (
            <Link
              key={c.slug}
              to={`/${c.slug}`}
              className="ds-card ds-card-hover ds-reveal group relative flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Img picture={c.image} alt={c.alt} sizes="(min-width: 768px) 33vw, 100vw" className="h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" aria-hidden="true" />
                <span className="ds-glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.duration}
                </span>
                <span className="absolute right-4 top-3 font-heading text-5xl leading-none text-white/25" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="relative -mt-6 flex flex-1 flex-col gap-3 p-6 pt-0">
                <h3 className="ds-h3 text-foreground">{c.name}</h3>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{c.text}</p>
                <div className="mt-2 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-heading text-[1.75rem] leading-none text-foreground">{formatPrice(detail.price)}</span> + IVA
                  </p>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-brand transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Ver el curso</span>
                  </span>
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-brand transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      {/* Carrera: programa completo, a toda anchura sobre la foto */}
      <Link
        to="/formacion-profesional-detailing"
        className="ds-reveal group relative mt-6 block overflow-hidden rounded-2xl border border-white/10"
      >
        <Img
          picture={carreraImg}
          alt="Alumnos en las instalaciones de Detail Park junto a un Ferrari rojo"
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="absolute inset-0 h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
        <div className="relative flex min-h-[340px] max-w-xl flex-col justify-center gap-4 p-7 md:min-h-[400px] md:p-12">
          <p className="ds-pill self-start">Programa completo</p>
          <h3 className="font-heading text-4xl font-normal uppercase leading-none tracking-wide text-white md:text-5xl">
            Carrera <span className="ds-text-gradient">Detailing</span>
          </h3>
          <p className="text-[0.9375rem] leading-relaxed text-white/80 md:text-base">
            Un mes con todas las especialidades, práctica en el taller con coches de clientes y un módulo de negocio para montar tu propio centro.
          </p>
          <span className="ds-btn-glow mt-2 inline-flex items-center gap-2 self-start rounded-lg px-5 py-3 text-sm font-semibold text-white">
            Ver el programa
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>

      {/* Primer contacto */}
      <div className="mt-16">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-start gap-3">
            <p className="ds-pill">Si empiezas desde cero</p>
            <h3 className="text-xl font-bold text-foreground md:text-2xl">Prueba antes con una jornada de un día</h3>
          </div>
          <Link to="/curso-detailing-iniciacion" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            Comparar las jornadas
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {starters.map((s) => (
            <Link key={s.href} to={s.href} className="ds-card ds-card-hover ds-reveal group grid grid-cols-[120px_1fr] overflow-hidden sm:grid-cols-[180px_1fr]">
              <div className="overflow-hidden">
                <Img picture={s.image} alt={s.alt} sizes="180px" className="h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-1.5 p-4 sm:p-6">
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
