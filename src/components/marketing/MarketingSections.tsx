import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { FaqList } from '@/components/ds/FaqList';
import { funnelSteps, services, processSteps, marketingFaqs } from './marketingData';
// Capturas reales de detailpark.com (la web del centro donde se imparten los cursos) en marcos de dispositivo.
import mockupPacks from '@/assets/marketing/mockup-detailpark-packs-ppf.webp';
import mockupPortada from '@/assets/marketing/mockup-detailpark-portada.webp';

/** Embudo de captación en HTML: horizontal en escritorio, vertical en móvil. */
export function MarketingFunnel() {
  return (
    <Section tone="card" id="por-que" aria-labelledby="porque-title">
      <SectionHeader
        id="porque-title"
        eyebrow="Por qué importa"
        title="Por qué un centro de detailing necesita marketing digital"
        lead="En detailing vendes un resultado visual. Si el cliente no ve tu trabajo antes de escribirte, no lo va a pagar. Así llega hoy un cliente a tu taller:"
      />
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row">
        {funnelSteps.map((step, i) => (
          <li key={step.title} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
            <div className="ds-card flex w-full flex-1 flex-col self-stretch bg-background p-5">
              <p className="ds-eyebrow">
                {String(i + 1).padStart(2, '0')} · {step.eyebrow}
              </p>
              <h3 className="mt-2 font-heading text-[1.75rem] font-normal uppercase leading-none tracking-[0.02em] text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              <ul className="mt-4 hidden flex-wrap gap-2 sm:flex lg:flex-col">
                {step.items.map((item) => (
                  <li key={item} className="rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] font-semibold text-foreground/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ArrowDown className="h-5 w-5 shrink-0 text-brand lg:hidden" aria-hidden="true" />
            <ArrowRight className="hidden h-5 w-5 shrink-0 text-brand lg:block" aria-hidden="true" />
          </li>
        ))}
        <li className="flex lg:w-40">
          <div className="flex w-full flex-col justify-center rounded-xl bg-primary p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">05 · Reservan</p>
            <p className="mt-2 font-heading text-[1.75rem] uppercase leading-none">Coche en tu taller</p>
          </div>
        </li>
      </ol>
    </Section>
  );
}

export function MarketingServices() {
  return (
    <Section id="servicios" aria-labelledby="servicios-title">
      <SectionHeader
        id="servicios-title"
        eyebrow="Servicios"
        title="Web, SEO, GEO y marca para detailing"
        lead="Una dirección visual y digital coherente: desde la web hasta el logotipo de tu taller."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.title} className="ds-card flex gap-4 p-5 sm:flex-col md:p-6">
            <div className="flex shrink-0 items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-brand">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="hidden rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
                {s.tag}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function MarketingShowcase() {
  return (
    <Section tone="card" id="disenos" aria-labelledby="disenos-title">
      <SectionHeader
        id="disenos-title"
        eyebrow="Trabajo de referencia"
        title="Así se ve una web de detailing que convierte"
        lead="Capturas de detailpark.com, la web de nuestro propio centro: foto grande, servicios claros con precio orientativo y el contacto siempre a mano."
      />
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <figure>
          <img
            src={mockupPortada}
            width={1200}
            height={572}
            alt="Portada de detailpark.com con titular grande, botones de presupuesto y WhatsApp y valoración de Google"
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl border border-border"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Portada: qué hace el centro, dónde está y cómo pedir presupuesto, en la primera pantalla.
          </figcaption>
        </figure>
        <figure>
          <img
            src={mockupPacks}
            width={1200}
            height={900}
            alt="Sección de packs de PPF de detailpark.com con tres opciones y precio orientativo, en un monitor"
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto w-full max-w-lg"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Packs de servicio con precio orientativo, alcance y presupuesto en un clic.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export function MarketingProcess() {
  return (
    <Section tone="card" id="proceso" aria-labelledby="proceso-title">
      <SectionHeader
        id="proceso-title"
        eyebrow="Cómo trabajamos"
        title="De la primera llamada a tu web publicada"
        lead="Un proceso simple y sin tecnicismos. Tú te centras en los coches."
      />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.step} className="ds-card flex gap-4 bg-background p-5 sm:flex-col md:p-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{i + 1}</span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function MarketingFaq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" eyebrow="Dudas frecuentes" title="Preguntas frecuentes sobre marketing para detailing" />
      {/* El marcado FAQPage ya lo emite seoConfig.marketingDigital */}
      <FaqList items={marketingFaqs} />
    </Section>
  );
}

const relatedLinks = [
  {
    href: '/formacion-profesional-detailing',
    title: 'Carrera Detailing',
    text: 'Fórmate en la técnica y en el negocio antes de montar tu centro.',
  },
  {
    href: '/jornada-zero-detailing',
    title: 'Jornada Zero',
    text: 'Primer contacto con el detailing profesional en un taller real.',
  },
  {
    href: '/blog',
    title: 'Blog de detailing y negocio',
    text: 'Artículos sobre técnica, precios y cómo hacer crecer tu taller.',
  },
];

export function MarketingLinks() {
  return (
    <Section tone="card" size="sm" aria-labelledby="explorar-title">
      <h2 id="explorar-title" className="mb-6 text-center font-sans text-lg font-bold normal-case tracking-normal text-foreground">
        Formación y recursos para tu negocio de detailing
      </h2>
      <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
        {relatedLinks.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="group ds-card flex h-full flex-col bg-background p-4 transition-colors md:p-5 hover:border-primary/60">
              <span className="font-bold text-foreground group-hover:text-brand">{l.title}</span>
              <span className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{l.text}</span>
              <span className="mt-3 hidden items-center gap-1 text-sm font-semibold text-brand md:inline-flex">
                Ver más
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
