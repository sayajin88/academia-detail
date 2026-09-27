import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Img } from '@/components/ds/Img';
import { formationDetails } from '@/data/formationDetails';
import { STATS } from '@/data/site';
import { formatPrice } from '@/lib/format';
import { normalizeCategory } from './blogUtils';
import detailingImg from '@/assets/heroes/hero-detailing.jpg?w=480;720;960&format=webp&as=picture';
import wrappingImg from '@/assets/heroes/hero-wrapping.jpg?w=480;720;960&format=webp&as=picture';
import ppfImg from '@/assets/heroes/hero-ppf.jpg?w=480;720;960&format=webp&as=picture';
import restauracionImg from '@/assets/heroes/hero-restauracion.jpg?w=480;720;960&format=webp&as=picture';
import carreraImg from '@/assets/instalaciones-curso-ferrari.jpg?w=480;720;960&format=webp&as=picture';

export type PromoCourse =
  | 'curso-detailing-profesional'
  | 'curso-vinilado-vehiculos'
  | 'curso-ppf-proteccion-pintura'
  | 'curso-restauracion-vehiculos'
  | 'formacion-profesional-detailing';

const COURSES: Record<PromoCourse, { name: string; image: ImagetoolsPicture; alt: string; text: string; duration?: string }> = {
  'curso-detailing-profesional': {
    name: 'Curso de Detailing Profesional',
    image: detailingImg,
    alt: 'Alumno puliendo la carrocería de un coche negro con una pulidora roto-orbital',
    text: 'Corrección de pintura, pulido con rotativa y roto-orbital, tratamiento cerámico e interiores, con coches reales en el taller.',
  },
  'curso-vinilado-vehiculos': {
    name: 'Curso de Car Wrapping',
    image: wrappingImg,
    alt: 'Alumno instalando vinilo en la carrocería de un coche',
    text: 'Vinilado y cambio de color: tensión, calor, curvas, recortes y acabado de bordes.',
  },
  'curso-ppf-proteccion-pintura': {
    name: 'Curso de PPF',
    image: ppfImg,
    alt: 'Instalación de film de protección de pintura en el frontal de un coche azul',
    text: 'Instalación de film de protección de pintura: corte, colocación en húmedo y zonas complejas.',
  },
  'curso-restauracion-vehiculos': {
    name: 'Curso de Restauración',
    image: restauracionImg,
    alt: 'Restauración del interior de un vehículo',
    text: 'Restauración de cuero, tapicerías y coches clásicos.',
  },
  'formacion-profesional-detailing': {
    name: 'Carrera Detailing',
    image: carreraImg,
    alt: 'Alumnos en las instalaciones de Detail Park junto a un Ferrari rojo',
    text: 'Todas las especialidades más un módulo de negocio: precios, captación de clientes y cómo montar tu propio centro.',
    duration: 'Programa completo',
  },
};

/** Curso que mejor encaja con la categoría de un artículo. */
export function courseForBlogCategory(category: string): PromoCourse {
  switch (normalizeCategory(category)) {
    case 'ppf':
      return 'curso-ppf-proteccion-pintura';
    case 'wrapping':
      return 'curso-vinilado-vehiculos';
    case 'negocios':
      return 'formacion-profesional-detailing';
    default:
      return 'curso-detailing-profesional';
  }
}

interface CoursePromoProps {
  course: PromoCourse;
  eyebrow?: string;
  className?: string;
}

/** Único bloque promocional de artículos y fichas: el curso relacionado. */
export function CoursePromo({ course, eyebrow = 'Aprende a hacerlo en el taller', className }: CoursePromoProps) {
  const info = COURSES[course];
  const detail = formationDetails[course];
  const comingSoon = detail?.comingSoon;
  const meta = [
    detail?.durationShort ?? info.duration,
    comingSoon ? 'Próximamente' : detail ? `${formatPrice(detail.price)} + IVA` : null,
    comingSoon ? null : `Máx. ${STATS.maxAlumnosGrupo} alumnos por grupo`,
  ].filter(Boolean);

  return (
    <aside className={`ds-card grid overflow-hidden sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] ${className ?? ''}`} aria-label="Curso relacionado">
      <div className="aspect-[16/9] overflow-hidden sm:aspect-auto">
        <Img picture={info.image} alt={info.alt} sizes="(min-width: 640px) 280px, 100vw" className="h-full" />
      </div>
      <div className="flex flex-col gap-3 p-5 md:p-6">
        <p className="ds-eyebrow">{eyebrow}</p>
        <p className="ds-h3 font-bold text-foreground">{info.name}</p>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{info.text}</p>
        <p className="text-sm text-muted-foreground">{meta.join(' · ')}</p>
        <div className="mt-1">
          <Button asChild className="h-11 px-5 font-semibold">
            <Link to={`/${course}`}>
              {course === 'formacion-profesional-detailing' ? 'Ver el programa' : 'Ver el curso'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
