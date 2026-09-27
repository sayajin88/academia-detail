import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { NEXT_EDITION, STATS, whatsappLink } from '@/data/site';
import { formatPrice } from '@/lib/format';
import type { FormationDetail } from '@/data/formationDetails';

interface CourseHeroProps {
  formation: FormationDetail;
  picture: ImagetoolsPicture;
  /** H1 alternativo (p. ej. páginas por ciudad) */
  heading?: string;
  eyebrow?: string;
  lead?: string;
  breadcrumbs: { name: string; url: string }[];
}

export function CourseHero({ formation, picture, heading, eyebrow, lead, breadcrumbs }: CourseHeroProps) {
  const comingSoon = formation.comingSoon;
  const facts = [
    { icon: Clock, label: 'Duración', value: formation.durationShort },
    { icon: Users, label: 'Grupo', value: `Máx. ${STATS.maxAlumnosGrupo} alumnos` },
    { icon: CalendarDays, label: 'Fechas', value: comingSoon ? 'En preparación' : NEXT_EDITION },
  ];
  const srcSet = Object.values(picture.sources)[0];

  return (
    <section className="border-b border-border bg-background">
      <div className="ds-container pt-2">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="ds-container grid items-center gap-10 pb-14 pt-4 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="ds-eyebrow mb-4">{eyebrow ?? (comingSoon ? 'Próximamente · Alicante' : 'Curso presencial · Alicante')}</p>
          <h1 className="ds-h1 text-foreground">{heading ?? formation.name}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead ?? formation.heroDescription}</p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg border border-border bg-card p-3 md:p-4">
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <f.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {f.label}
                </dt>
                <dd className="mt-1 text-[13px] font-semibold leading-snug text-foreground sm:text-sm md:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>

          {comingSoon ? (
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
                <a href="#lista-espera">
                  Avisarme cuando abráis plazas
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-heading text-4xl leading-none text-foreground">{formatPrice(formation.price)}</span> + IVA
                {formation.levels && formation.levels.length > 1 && <span className="block">por nivel</span>}
              </p>
              <div className="flex flex-col gap-3 sm:ml-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
                  <Link to={`/contacto?curso=${formation.slug}`}>
                    Reservar plaza
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-5 text-base font-semibold">
                  <a href={whatsappLink(`Hola, quiero información sobre el ${formation.name}.`)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-4 w-4" />
                    Preguntar
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="order-1 overflow-hidden rounded-xl lg:order-2">
          <img
            src={picture.img.src}
            srcSet={srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={picture.img.w}
            height={picture.img.h}
            alt={formation.heroAlt ?? formation.name}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="aspect-[4/3] h-auto w-full object-cover lg:aspect-[5/4]"
          />
        </div>
      </div>
    </section>
  );
}
