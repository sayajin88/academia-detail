import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE, whatsappLink } from '@/data/site';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CtaBandProps {
  title?: string;
  text?: string;
  /** Mensaje con el que se abre WhatsApp */
  whatsappText?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

/** Bloque final de contacto, igual en todas las páginas. */
export function CtaBand({
  title = '¿Hablamos de tu formación?',
  text = 'Cuéntanos qué quieres aprender y te explicamos qué curso encaja contigo, las próximas fechas y cómo reservar tu plaza.',
  whatsappText = 'Hola, quiero información sobre los cursos de Academia Detail.',
  primaryLabel = 'Solicitar información',
  primaryHref = '/contacto',
}: CtaBandProps) {
  return (
    <section className="bg-background ds-section-sm" aria-labelledby="cta-title">
      <div className="ds-container">
        <div className="ds-reveal relative isolate overflow-hidden rounded-3xl border border-white/10 px-6 py-14 text-center md:px-12 md:py-20">
          {/* Fondo: burdeos con luz y retícula */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#a12a3d] via-primary to-[#4a1119]" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/15 blur-[90px]" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-black/30 blur-[90px]" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 opacity-[0.12]"
            style={{
              backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.6) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div className="flex flex-col items-center gap-6">
            <h2 id="cta-title" className="ds-h2 max-w-3xl text-white">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{text}</p>
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full bg-white bg-none px-7 text-base font-semibold text-primary shadow-xl shadow-black/25 hover:bg-white/90 sm:w-auto">
                <Link to={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 w-full border-white/40 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/15 hover:text-white sm:w-auto">
                <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/80">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="hover:underline">{SITE.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
