import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { Section } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { SITE, STATS } from '@/data/site';
import danielImg from '@/assets/daniel-lopez-team.jpg?w=400;656&format=webp&as=picture';

export function HomeInstructor() {
  return (
    <Section aria-labelledby="formador-title">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl md:max-w-none">
          <Img picture={danielImg} alt={`${SITE.founder}, fundador de Detail Park y formador de Academia Detail`} sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[4/5] object-top" />
        </div>
        <div className="flex flex-col gap-5">
          <p className="ds-eyebrow">Tu formador</p>
          <h2 id="formador-title" className="ds-h2 text-foreground">{SITE.founder}</h2>
          <p className="text-base font-semibold text-foreground/90">
            {SITE.founderRole} · más de {SITE.founderYears} años en el detailing profesional
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Soy detailer desde que tengo uso de razón. Hoy dirijo Detail Park en Alicante, donde tratamos cada semana coches de
            clientes, desde utilitarios hasta deportivos de alta gama. Todo lo que enseño en la academia es lo que hacemos
            en el taller: técnica, producto y también cómo cobrar y organizar el trabajo.
          </p>
          <blockquote className="border-l-2 border-primary pl-4 text-base italic text-foreground/85">
            “Formamos en grupos pequeños porque nos importa más la calidad que la cantidad.”
          </blockquote>
          <p className="text-sm text-muted-foreground">
            Ya han pasado por la academia <strong className="text-foreground">{STATS.alumnos} alumnos</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link to="/quienes-somos" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Conoce la academia y las instalaciones
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={SITE.instagram[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {SITE.instagram[1].label}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
