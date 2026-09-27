import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import detailingImg from '@/assets/heroes/hero-detailing.jpg?w=320;480;640&format=webp&as=picture';
import wrappingImg from '@/assets/heroes/hero-wrapping.jpg?w=320;480;640&format=webp&as=picture';
import ppfImg from '@/assets/heroes/hero-ppf.jpg?w=320;480;640&format=webp&as=picture';
import negocioImg from '@/assets/formacion-detailing-2.jpg?w=320;480;640&format=webp&as=picture';

const photos: Record<string, { picture: ImagetoolsPicture; alt: string }> = {
  'curso-detailing-profesional': { picture: detailingImg, alt: 'Alumno puliendo la carrocería de un coche negro' },
  'curso-vinilado-vehiculos': { picture: wrappingImg, alt: 'Alumno instalando vinilo en la carrocería de un coche' },
  'curso-ppf-proteccion-pintura': { picture: ppfImg, alt: 'Alumnos instalando film de protección en el frontal de un coche' },
};

interface CardProps {
  n: number;
  picture: ImagetoolsPicture;
  alt: string;
  duration: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  internal?: boolean;
}

function ProgramCard({ n, picture, alt, duration, title, text, href, linkLabel, internal = true }: CardProps) {
  const linkClass = 'mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand underline-offset-4 hover:underline';
  return (
    <li className="flex gap-4 overflow-hidden rounded-xl border border-border bg-background p-4 sm:flex-col sm:gap-0 sm:p-0">
      <div className="w-24 shrink-0 overflow-hidden rounded-lg sm:w-full sm:rounded-none">
        <Img picture={picture} alt={alt} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 96px" className="aspect-square sm:aspect-[4/3]" />
      </div>
      <div className="flex flex-1 flex-col sm:p-5">
        <p className="flex items-baseline gap-2 text-xs text-muted-foreground">
          <span className="font-heading text-2xl leading-none text-brand">{String(n).padStart(2, '0')}</span>
          {duration}
        </p>
        <h3 className="mt-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
        {internal ? (
          <Link to={href} className={linkClass}>
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <a href={href} className={linkClass}>
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
}

/** Qué incluye la Carrera: los tres cursos técnicos + taller y negocio */
export function CarreraProgram() {
  const { specialities } = carreraDetailingData;
  return (
    <Section tone="card" aria-labelledby="programa-title">
      <SectionHeader
        id="programa-title"
        eyebrow="El programa"
        title="Tres especialidades y un módulo de negocio"
        lead="Los tres cursos técnicos de la academia completos, práctica en el taller con coches de clientes y lo necesario para montar tu propio centro."
      />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {specialities.map((s, i) => (
          <ProgramCard
            key={s.slug}
            n={i + 1}
            picture={photos[s.slug].picture}
            alt={photos[s.slug].alt}
            duration={s.duration}
            title={s.name}
            text={s.text}
            href={`/${s.slug}`}
            linkLabel="Ver el temario"
          />
        ))}
        <ProgramCard
          n={specialities.length + 1}
          picture={negocioImg}
          alt="Daniel López explica a un grupo de alumnos en el taller de Detail Park"
          duration="Resto del mes"
          title="Taller y negocio"
          text="Práctica con coches de clientes junto al equipo de Detail Park y módulo de negocio para montar tu centro."
          href="#negocio"
          linkLabel="Ver el módulo de negocio"
          internal={false}
        />
      </ol>
    </Section>
  );
}
