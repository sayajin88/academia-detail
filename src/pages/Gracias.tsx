import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { SITE, whatsappLink } from '@/data/site';

export default function Gracias() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'contacto',
        event_label: 'formulario_enviado',
        value: 1,
      });
    }
  }, []);

  return (
    <>
      <SEO
        title="Solicitud recibida | Academia Detail"
        description="Hemos recibido tu solicitud. Te contactaremos en un plazo de 48 horas laborables."
        url="/gracias"
        noindex
      />
      <MainLayout>
        <section className="ds-section">
          <div className="ds-narrow flex flex-col items-center text-center">
            <CheckCircle2 className="h-12 w-12 text-brand" aria-hidden="true" />
            <h1 className="ds-h1 mt-6 text-foreground">Solicitud recibida</h1>
            <p className="ds-lead mt-5 max-w-xl">
              Gracias por escribirnos. Te llegará un email de confirmación y te contactaremos por teléfono o WhatsApp en un
              plazo de 48 horas laborables.
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
                <Link to="/">Volver al inicio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
                <a href={whatsappLink('Hola, acabo de enviar el formulario de contacto de Academia Detail.')} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  ¿Prisa? Escríbenos por WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              También puedes llamarnos al{' '}
              <a href={SITE.phoneHref} className="font-semibold text-brand underline underline-offset-4">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
