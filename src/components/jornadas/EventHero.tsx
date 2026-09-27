import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { Img } from '@/components/ds/Img';
import { whatsappLink } from '@/data/site';
import { formatPrice } from '@/lib/format';

export interface HeroFact {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface EventHeroProps {
  breadcrumbs: { name: string; url: string }[];
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  facts: HeroFact[];
  price: number;
  /** Botón principal: ruta interna (/contacto…) o ancla de la página (#…) */
  cta: { label: string; href: string };
  whatsappText: string;
  /** Línea breve bajo los botones (p. ej. el descuento) */
  note?: ReactNode;
  picture: ImagetoolsPicture;
  alt: string;
}

/** Cabecera de las jornadas de un día. Misma estructura que CourseHero. */
export function EventHero({ breadcrumbs, eyebrow, title, lead, facts, price, cta, whatsappText, note, picture, alt }: EventHeroProps) {
  const isAnchor = cta.href.startsWith('#');
  return (
    <section className="border-b border-border bg-background">
      <div className="ds-container pt-2">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="ds-container grid items-center gap-10 pb-14 pt-4 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="ds-eyebrow mb-4">{eyebrow}</p>
          <h1 className="ds-h1 text-foreground">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>

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

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-heading text-4xl leading-none text-foreground">{formatPrice(price)}</span> + IVA
            </p>
            <div className="flex flex-col gap-3 sm:ml-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
                {isAnchor ? (
                  <a href={cta.href}>
                    {cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link to={cta.href}>
                    {cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-5 text-base font-semibold">
                <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Preguntar
                </a>
              </Button>
            </div>
          </div>
          {note && <p className="mt-4 text-sm text-muted-foreground">{note}</p>}
        </div>

        <div className="order-1 overflow-hidden rounded-xl lg:order-2">
          <Img picture={picture} alt={alt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] lg:aspect-[5/4]" />
        </div>
      </div>
    </section>
  );
}
