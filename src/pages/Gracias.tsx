import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        title="¡Solicitud Recibida! | Academia Detail"
        description="Tu solicitud ha sido recibida correctamente. Nos pondremos en contacto contigo en menos de 24 horas."
        url="/gracias"
        disableHreflang
      />
      <MainLayout>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¡Solicitud Recibida!
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Hemos recibido tu mensaje correctamente.
              Nos pondremos en contacto contigo en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/">Volver al inicio</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/curso-detailing-profesional">Ver cursos</Link>
              </Button>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
