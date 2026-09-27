import { Link } from 'react-router-dom';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { formationDetails } from '@/data/formationDetails';
import { JORNADA_ZERO, UP_DETAIL } from '@/data/jornadas';
import { formatPrice } from '@/lib/format';
import jornadaZeroImg from '@/assets/evento-grupo-coche-rojo.jpg?w=320;480&format=webp&as=picture';
import upDetailImg from '@/assets/evento-clase-completa.jpg?w=320;480&format=webp&as=picture';
import detailingImg from '@/assets/heroes/hero-detailing.jpg?w=320;480&format=webp&as=picture';

type Key = 'jornada-zero' | 'up-detail' | 'curso';

const options: Record<Key, { href: string; name: string; meta: string; text: string; image: ImagetoolsPicture; alt: string }> = {
  'jornada-zero': {
    href: `/${JORNADA_ZERO.slug}`,
    name: 'Jornada Zero',
    meta: `${JORNADA_ZERO.duration} · ${formatPrice(JORNADA_ZERO.price)} + IVA`,
    text: 'Tu primer contacto con el detailing profesional, practicando sobre un vehículo real.',
    image: jornadaZeroImg,
    alt: 'Grupo de alumnos alrededor de un coche rojo en el taller de Detail Park',
  },
  'up-detail': {
    href: `/${UP_DETAIL.slug}`,
    name: 'Up Detail',
    meta: `${UP_DETAIL.duration} · evento puntual`,
    text: 'Aprende lo máximo en el menor tiempo: demostraciones y práctica con profesionales, comida incluida.',
    image: upDetailImg,
    alt: 'Alumnos en una sesión de formación en las instalaciones de Detail Park',
  },
  curso: {
    href: '/curso-detailing-profesional',
    name: 'Curso de Detailing',
    meta: `4 días · ${formatPrice(formationDetails['curso-detailing-profesional'].price)} + IVA`,
    text: 'Si ya lo tienes claro: el curso completo para trabajar como detailer profesional.',
    image: detailingImg,
    alt: 'Alumno puliendo la carrocería de un coche negro con una pulidora roto-orbital',
  },
};

/** Enlaces a las otras formas de empezar (sin repetir la página actual). */
export function OtherStarts({ show, tone = 'card' }: { show: Key[]; tone?: 'default' | 'card' }) {
  return (
    <Section tone={tone} size="sm" aria-labelledby="otras-title">
      <SectionHeader id="otras-title" align="left" eyebrow="Otras opciones" title="Otras formas de empezar" className="mb-8 md:mb-10" />
      <div className="grid gap-6 md:grid-cols-2">
        {show.map((key) => {
          const o = options[key];
          return (
            <Link
              key={key}
              to={o.href}
              className="ds-card group grid grid-cols-[112px_1fr] overflow-hidden bg-background transition-colors hover:border-white/25 sm:grid-cols-[160px_1fr]"
            >
              <Img picture={o.image} alt={o.alt} sizes="160px" className="h-full" />
              <div className="flex flex-col gap-1.5 p-4 sm:p-5">
                <h3 className="text-lg font-bold text-foreground">{o.name}</h3>
                <p className="text-sm font-semibold text-brand">{o.meta}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{o.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
