import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';

const sitemapData = [
  {
    category: 'Cursos de Detailing',
    links: [
      { name: 'Curso Detailing Profesional', url: '/curso-detailing-profesional' },
      { name: 'Curso Car Wrapping', url: '/curso-vinilado-vehiculos' },
      { name: 'Curso PPF Paint Protection Film', url: '/curso-ppf-proteccion-pintura' },
      { name: 'Curso Restauración de Vehículos', url: '/curso-restauracion-vehiculos' },
      { name: 'Formación Profesional Detailing', url: '/formacion-profesional-detailing' },
      { name: 'Jornada Zero — Iniciación', url: '/jornada-zero-detailing' },
      { name: 'Jornadas Intensivas', url: '/curso-detailing-iniciacion' },
    ],
  },
  {
    category: 'Recursos',
    links: [
      { name: 'Blog de Detailing', url: '/blog' },
      { name: 'Glosario de Detailing', url: '/glosario-detailing' },
      { name: 'Calculadora de Dilución', url: '/calculadora-dilucion-detailing' },
      { name: 'Directorio Centros Detailing España', url: '/centros-detailing-espana' },
    ],
  },
  {
    category: 'Academia Detail',
    links: [
      { name: 'Quiénes Somos', url: '/quienes-somos' },
      { name: 'Contacto', url: '/contacto' },
      { name: 'Política de Privacidad', url: '/politica-privacidad' },
    ],
  },
];

export default function MapaSitio() {
  return (
    <>
      <SEO
        title="Mapa del Sitio | Academia Detail"
        description="Navega por todas las páginas de Academia Detail: cursos de detailing, blog, glosario, directorio y más."
        url="/mapa-del-sitio"
      />
      <MainLayout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
              Mapa del Sitio
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sitemapData.map((section) => (
                <div key={section.category}>
                  <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                    {section.category}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.url}>
                        <Link
                          to={link.url}
                          className="text-muted-foreground hover:text-brand transition-colors text-sm flex items-center gap-2"
                        >
                          <span aria-hidden="true">→</span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
