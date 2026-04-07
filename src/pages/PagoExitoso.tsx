import { useSearchParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { CheckCircle, Mail, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagoExitoso() {
  const [params] = useSearchParams();
  const curso = params.get('curso') || '';

  const cursoNames: Record<string, string> = {
    'curso-detailing-profesional': 'Detailing Profesional',
    'curso-vinilado-vehiculos': 'Car Wrapping',
    'curso-ppf-proteccion-pintura': 'Paint Protection Film (PPF)',
    'curso-restauracion-vehiculos': 'Restauración de Vehículos',
  };

  const cursoName = cursoNames[curso] || 'tu curso';

  return (
    <>
      <SEO title="Pago Confirmado | Academia Detail" description="Tu pago ha sido procesado correctamente." noIndex />
      <MainLayout>
        <section className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3">¡Pago Confirmado!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Tu inscripción al curso de <span className="text-foreground font-semibold">{cursoName}</span> ha sido procesada correctamente.
              </p>

              <div className="space-y-4 text-left bg-muted/40 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-3">Próximos pasos:</h3>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Recibirás un <strong className="text-foreground">email de confirmación</strong> con todos los detalles del curso en las próximas horas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Nuestro equipo se pondrá en contacto contigo para confirmar las <strong className="text-foreground">fechas y logística</strong> de tu formación.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="hero" size="lg" className="flex-1">
                  <Link to="/">
                    Volver al Inicio
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link to="/contacto">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
