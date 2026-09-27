import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

const sitemapData = [
  {
    category: 'Cursos',
    links: [
      { name: 'Curso de detailing profesional', url: '/curso-detailing-profesional' },
      { name: 'Curso de car wrapping', url: '/curso-vinilado-vehiculos' },
      { name: 'Curso de PPF (protección de pintura)', url: '/curso-ppf-proteccion-pintura' },
      { name: 'Carrera Detailing (formación completa)', url: '/formacion-profesional-detailing' },
      { name: 'Curso de restauración (próximamente)', url: '/curso-restauracion-vehiculos' },
    ],
  },
  {
    category: 'Si empiezas desde cero',
    links: [
      { name: 'Jornada Zero', url: '/jornada-zero-detailing' },
      { name: 'Up Detail', url: '/up-detail-evento' },
      { name: 'Comparar las dos jornadas', url: '/curso-detailing-iniciacion' },
    ],
  },
  {
    category: 'Cursos por ciudad',
    links: [
      { name: 'Curso de detailing en Madrid', url: '/curso-detailing-madrid' },
      { name: 'Curso de detailing en Barcelona', url: '/curso-detailing-barcelona' },
      { name: 'Curso de detailing en Valencia', url: '/curso-detailing-valencia' },
      { name: 'Curso de detailing en Sevilla', url: '/curso-detailing-sevilla' },
      { name: 'Curso de detailing en Bilbao', url: '/curso-detailing-bilbao' },
    ],
  },
  {
    category: 'Recursos',
    links: [
      { name: 'Blog', url: '/blog' },
      { name: 'Glosario de detailing', url: '/glosario-detailing' },
      { name: 'Calculadora de dilución', url: '/calculadora-dilucion-detailing' },
      { name: 'Marketing para detailers', url: '/marketing-digital-detailing' },
    ],
  },
  {
    category: 'Academia',
    links: [
      { name: 'Inicio', url: '/' },
      { name: 'Quiénes somos', url: '/quienes-somos' },
      { name: 'Contacto', url: '/contacto' },
      { name: 'Privacidad y aviso legal', url: '/politica-privacidad' },
    ],
  },
];

export default function MapaSitio() {
  return (
    <>
      <SEO
        title="Mapa del sitio | Academia Detail"
        description="Todas las páginas de Academia Detail: cursos de detailing, wrapping y PPF, jornadas de iniciación, blog, glosario y herramientas."
        url="/mapa-del-sitio"
      />
      <MainLayout>
        <div className="ds-container pt-2">
          <Breadcrumbs items={[{ name: 'Mapa del sitio', url: '/mapa-del-sitio' }]} />
        </div>
        <section className="ds-container pb-16 pt-4 md:pb-24">
          <h1 className="ds-h1 mb-10 text-foreground md:mb-14">Mapa del sitio</h1>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sitemapData.map((section) => (
              <nav key={section.category} aria-label={section.category}>
                <h2 className="mb-4 border-b border-border pb-2 font-sans text-base font-bold normal-case tracking-normal text-foreground">{section.category}</h2>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <Link to={link.url} className="text-[0.9375rem] text-muted-foreground underline-offset-4 hover:text-brand hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
}
