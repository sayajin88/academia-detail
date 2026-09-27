import { Link } from 'react-router-dom';
import { ChevronDown, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { SITE } from '@/data/site';
import logo from '@/assets/detail-park-logo-white.png';

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Formaciones',
    links: [
      { name: 'Curso de Detailing', href: '/curso-detailing-profesional' },
      { name: 'Curso de Car Wrapping', href: '/curso-vinilado-vehiculos' },
      { name: 'Curso de PPF', href: '/curso-ppf-proteccion-pintura' },
      { name: 'Carrera Detailing', href: '/formacion-profesional-detailing' },
      { name: 'Jornada Zero', href: '/jornada-zero-detailing' },
      { name: 'Up Detail', href: '/up-detail-evento' },
    ],
  },
  {
    title: 'Cursos por ciudad',
    links: [
      { name: 'Curso de detailing en Madrid', href: '/curso-detailing-madrid' },
      { name: 'Curso de detailing en Barcelona', href: '/curso-detailing-barcelona' },
      { name: 'Curso de detailing en Valencia', href: '/curso-detailing-valencia' },
      { name: 'Curso de detailing en Sevilla', href: '/curso-detailing-sevilla' },
      { name: 'Curso de detailing en Bilbao', href: '/curso-detailing-bilbao' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Glosario de detailing', href: '/glosario-detailing' },
      { name: 'Calculadora de dilución', href: '/calculadora-dilucion-detailing' },
      { name: 'Marketing para detailers', href: '/marketing-digital-detailing' },
      { name: 'Sistema Detail', href: SITE.sistemaDetailUrl, external: true },
    ],
  },
  {
    title: 'Academia',
    links: [
      { name: 'Quiénes somos', href: '/quienes-somos' },
      { name: 'Contacto', href: '/contacto' },
      { name: 'Mapa del sitio', href: '/mapa-del-sitio' },
      { name: 'Privacidad y aviso legal', href: '/politica-privacidad' },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const cls = 'inline-flex items-center gap-1 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground';
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener" className={cls}>
      {link.name}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ) : (
    <Link to={link.href} className={cls}>
      {link.name}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="ds-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="Academia Detail, ir al inicio">
              <img src={logo} alt="Detail Park" className="h-10 w-auto" width={200} height={40} />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Escuela de detailing profesional en las instalaciones de{' '}
              <a href={SITE.detailParkUrl} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
                Detail Park
              </a>
              , en Alicante.
            </p>
            <address className="not-italic text-sm leading-relaxed text-muted-foreground">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                {SITE.street}
                <br />
                {SITE.postalCode} {SITE.city}
              </a>
              <br />
              <a href={SITE.phoneHref} className="font-semibold text-foreground hover:underline">
                {SITE.phone}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="hover:text-foreground">
                {SITE.email}
              </a>
            </address>
            <div className="flex gap-2">
              {SITE.instagram.map((ig) => (
                <a
                  key={ig.href}
                  href={ig.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Instagram ${ig.label}`}
                  title={ig.label}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              ))}
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="YouTube de Detail Park"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Escritorio: columnas abiertas */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="hidden lg:block">
              <h2 className="mb-3 font-sans text-sm font-semibold normal-case tracking-normal text-foreground">{col.title}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Móvil y tableta: columnas plegables */}
          <div className="divide-y divide-border border-y border-border lg:hidden">
            {columns.map((col) => (
              <details key={col.title} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {col.title}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="pb-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.company}</p>
          <p>
            Formación en Alicante para alumnos de toda España y Latinoamérica.
          </p>
        </div>
      </div>
    </footer>
  );
}
