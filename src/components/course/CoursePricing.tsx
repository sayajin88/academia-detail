import { Link } from 'react-router-dom';
import { ArrowRight, Check, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { NEXT_EDITION } from '@/data/site';
import { formatPrice } from '@/lib/format';
import type { FormationDetail } from '@/data/formationDetails';
import certificadosImg from '@/assets/certificados-grupal-curso-detailing.jpg?w=480;800;1100&format=webp&as=picture';

/** Qué incluye + precio (un solo precio real, sin tachados ni cuentas atrás) */
export function CoursePricing({ formation }: { formation: FormationDetail }) {
  const levels = formation.levels && formation.levels.length > 1 ? formation.levels : null;
  return (
    <Section id="precio" aria-labelledby="precio-title">
      <SectionHeader id="precio-title" eyebrow="Precio" title="Qué incluye tu plaza" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div className="flex flex-col gap-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {formation.includes.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/90">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <figure className="overflow-hidden rounded-xl border border-border">
            <Img picture={certificadosImg} alt="Grupo de alumnos con sus certificados de Detail Park" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/9]" />
            <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">
              Al terminar recibes el {formation.certificationTitle ?? 'certificado de Detail Park'}.
            </figcaption>
          </figure>
        </div>

        <div className="ds-card h-fit p-6 md:p-8 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-foreground">{formation.name}</p>
          {levels ? (
            <ul className="mt-4 flex flex-col divide-y divide-border">
              {levels.map((l) => (
                <li key={l.title} className="py-4 first:pt-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-semibold text-foreground">{l.title}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-heading text-2xl text-foreground">{formatPrice(l.price ?? formation.price)}</span> + IVA
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {l.duration} · {l.subtitle}
                  </p>
                  {l.note && <p className="mt-1 text-xs text-muted-foreground">{l.note}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-heading text-5xl leading-none text-foreground">{formatPrice(formation.price)}</span> + IVA
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">{formation.duration}. Financiación disponible.</p>
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-background px-3 py-2.5 text-sm text-foreground">
            <CalendarDays className="h-4 w-4 text-brand" aria-hidden="true" />
            Próxima edición: <strong className="font-semibold">{NEXT_EDITION.toLowerCase()}</strong>
          </p>
          <Button asChild size="lg" className="mt-5 h-12 w-full text-base font-semibold">
            <Link to={`/contacto?curso=${formation.slug}`}>
              Reservar plaza o pedir fechas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sin compromiso: te respondemos con las fechas y los pasos para reservar.</p>
        </div>
      </div>
    </Section>
  );
}
