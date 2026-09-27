import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

const suggestions = [
  { name: 'Curso de detailing profesional', url: '/curso-detailing-profesional' },
  { name: 'Carrera Detailing', url: '/formacion-profesional-detailing' },
  { name: 'Jornada Zero', url: '/jornada-zero-detailing' },
  { name: 'Blog', url: '/blog' },
  { name: 'Mapa del sitio', url: '/mapa-del-sitio' },
];

const NotFound = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Página no encontrada | Academia Detail</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="ds-section">
        <div className="ds-narrow flex flex-col items-center text-center">
          <p className="ds-eyebrow">Error 404</p>
          <h1 className="ds-h1 mt-4 text-foreground">Esta página no existe</h1>
          <p className="ds-lead mt-5 max-w-xl">
            Puede que la dirección esté mal escrita o que la página se haya movido. Estas son las más visitadas:
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {suggestions.map((s) => (
              <li key={s.url}>
                <Link to={s.url} className="text-[0.9375rem] font-semibold text-brand underline-offset-4 hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
              <Link to="/">
                Volver al inicio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
              <Link to="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFound;
