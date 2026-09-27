import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, SectionHeader } from '@/components/ds/Section';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { whatsappLink } from '@/data/site';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import { packs } from './marketingData';

/** Los tres packs, con su precio (única vez que aparecen los precios en la página). */
export function MarketingPacks() {
  return (
    <Section id="packs" aria-labelledby="packs-title">
      <SectionHeader
        id="packs-title"
        eyebrow="Packs y precios"
        title="Precios de páginas web para centros de detailing"
        lead="Un solo pago, sin cuotas ni permanencia: la web es tuya. Todos los precios son sin IVA."
      />
      <div className="grid items-start gap-5 lg:grid-cols-3">
        {packs.map((pack) => (
          <article
            key={pack.id}
            aria-labelledby={`pack-${pack.id}`}
            className={cn('ds-card flex h-full flex-col p-6 md:p-7', pack.featured && 'border-primary ring-1 ring-primary')}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-[0.14em]', pack.featured ? 'text-brand' : 'text-muted-foreground')}>
              {pack.label}
            </p>
            <h3 id={`pack-${pack.id}`} className="mt-3 scroll-mt-28 text-xl font-bold text-foreground">
              {pack.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{pack.subtitle}</p>
            <p className="mt-5 flex items-baseline gap-2 border-b border-border pb-5">
              <span className="font-heading text-5xl leading-none text-foreground">{formatPrice(pack.price)}</span>
              <span className="text-sm text-muted-foreground">+ IVA · pago único</span>
            </p>
            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {pack.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant={pack.featured ? 'default' : 'outline'} className="mt-7 h-12 w-full text-base font-semibold">
              <a href={whatsappLink(`Hola, me interesa el pack «${pack.name}» para mi centro de detailing.`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                Me interesa este pack
              </a>
            </Button>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
        ¿Necesitas logotipo, identidad de marca, rotulación o ayuda con las redes? Depende del alcance, así que lo
        presupuestamos tras una breve conversación por WhatsApp.
      </p>
    </Section>
  );
}
