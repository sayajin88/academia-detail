import { useSearchParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { XCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PagoCancelado() {
  const [params] = useSearchParams();
  const curso = params.get('curso') || '';

  const cursoLinks: Record<string, string> = {
    'curso-detailing-profesional': '/curso-detailing-profesional',
    'curso-vinilado-vehiculos': '/curso-vinilado-vehiculos',
    'curso-ppf-proteccion-pintura': '/curso-ppf-proteccion-pintura',
    'curso-restauracion-vehiculos': '/curso-restauracion-vehiculos',
  };

  const backUrl = cursoLinks[curso] || '/';

  return (
    <>
      <SEO title="Pago Cancelado | Academia Detail" description="El pago no se ha completado." />
      <MainLayout>
        <section className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3">Pago No Completado</h1>
              <p className="text-muted-foreground text-lg mb-8">
                El proceso de pago ha sido cancelado. No se ha realizado ningún cargo. Puedes volver a intentarlo cuando quieras.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="hero" size="lg" className="flex-1">
                  <Link to={backUrl}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Curso
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link to="/contacto">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    ¿Necesitas Ayuda?
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
