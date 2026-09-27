import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Quote } from 'lucide-react';
import { Section } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { SITE, STATS } from '@/data/site';
import danielImg from '@/assets/daniel-lopez-team.jpg?w=400;656&format=webp&as=picture';

export function HomeInstructor() {
  return (
    <Section decor="glow" aria-labelledby="formador-title">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="ds-reveal relative mx-auto w-full max-w-sm md:max-w-none">
          {/* Marco con brillo burdeos */}
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/60 via-primary/10 to-transparent blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <Img picture={danielImg} alt={`${SITE.founder}, fundador de Detail Park y formador de Academia Detail`} sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[4/5] object-top" />
          </div>
          <div className="ds-glass absolute -bottom-5 -right-3 rounded-2xl px-5 py-4 md:-right-6">
            <p className="font-heading text-4xl leading-none text-white">+{SITE.founderYears}</p>
            <p className="mt-1 text-xs text-white/75">años en el detailing</p>
          </div>
          <div className="ds-glass absolute -left-3 top-6 rounded-2xl px-4 py-3 md:-left-6">
            <p className="font-heading text-3xl leading-none text-white">{STATS.alumnos}</p>
            <p className="mt-1 text-xs text-white/75">alumnos formados</p>
          </div>
        </div>
        <div className="ds-reveal flex flex-col gap-5">
          <p className="ds-pill self-start">Tu formador</p>
          <h2 id="formador-title" className="ds-h2 text-foreground">
            {SITE.founder.split(' ')[0]} <span className="ds-text-gradient">{SITE.founder.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-base font-semibold text-foreground/90">{SITE.founderRole}</p>
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Soy detailer desde que tengo uso de razón. Hoy dirijo Detail Park en Alicante, donde tratamos cada semana coches de
            clientes, desde utilitarios hasta deportivos de alta gama. Todo lo que enseño en la academia es lo que hacemos
            en el taller: técnica, producto y también cómo cobrar y organizar el trabajo.
          </p>
          <blockquote className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 pl-14 text-base italic text-foreground/90">
            <Quote className="absolute left-5 top-5 h-6 w-6 text-brand" aria-hidden="true" />
            Formamos en grupos pequeños porque nos importa más la calidad que la cantidad.
          </blockquote>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link to="/quienes-somos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
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
