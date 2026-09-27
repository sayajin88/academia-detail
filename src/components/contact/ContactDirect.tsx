import { Clock, ExternalLink, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { SITE, whatsappLink } from '@/data/site';

const nextSteps = [
  'Recibes un email de confirmación con tu solicitud.',
  'Te llamamos o te escribimos por WhatsApp en un plazo de 48 horas laborables.',
  'Te contamos fechas, precio y cómo reservar, y resolvemos tus dudas. Sin compromiso.',
];

/** Contacto directo (WhatsApp, teléfono, email, dirección), horario y qué pasa después. */
export function ContactDirect({ whatsappText }: { whatsappText: string }) {
  const rows = [
    { icon: Phone, label: 'Teléfono', value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    {
      icon: MapPin,
      label: 'Dirección (Detail Park)',
      value: `${SITE.street}, ${SITE.postalCode} ${SITE.city}`,
      href: SITE.mapsUrl,
      external: true,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="ds-card p-5 md:p-6">
        <h2 className="font-sans text-lg font-bold normal-case tracking-normal text-foreground">¿Prefieres hablar directamente?</h2>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Es la forma más rápida de resolver una duda concreta.
        </p>
        <Button asChild size="lg" className="mt-5 h-12 w-full bg-[#25D366] text-base font-semibold text-white hover:bg-[#25D366]/90">
          <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-5 w-5" />
            Escribir por WhatsApp
          </a>
        </Button>

        <ul className="mt-5 divide-y divide-border">
          {rows.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-3 py-3.5"
              >
                <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted-foreground">{r.label}</span>
                  <span className="block break-words font-semibold text-foreground group-hover:text-brand">{r.value}</span>
                </span>
                {r.external && <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
              </a>
            </li>
          ))}
          <li className="flex items-start gap-3 py-3.5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>
              <span className="block text-xs text-muted-foreground">Horario</span>
              <span className="block font-semibold text-foreground">Lunes a viernes, de 7:00 a 17:30</span>
              <span className="block text-sm text-muted-foreground">Sábados y domingos, cerrado</span>
            </span>
          </li>
        </ul>

        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
          {SITE.instagram.map((ig) => (
            <a key={ig.href} href={ig.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {ig.label}
            </a>
          ))}
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <Youtube className="h-4 w-4" aria-hidden="true" />
            YouTube
          </a>
        </div>
      </div>

      <div className="ds-card p-5 md:p-6">
        <h2 className="font-sans text-lg font-bold normal-case tracking-normal text-foreground">Qué pasa cuando nos escribes</h2>
        <ol className="mt-4 flex flex-col gap-4">
          {nextSteps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-brand">
                {i + 1}
              </span>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
