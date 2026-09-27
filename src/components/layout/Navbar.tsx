import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';
import academiaLogo from '@/assets/academia-detail-logo-light.png';

interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

const courseLinks: NavItem[] = [
  { name: 'Curso de Detailing', href: '/curso-detailing-profesional', description: 'Pulido y tratamiento cerámico · 4 días' },
  { name: 'Curso de Car Wrapping', href: '/curso-vinilado-vehiculos', description: 'Vinilado y cambio de color' },
  { name: 'Curso de PPF', href: '/curso-ppf-proteccion-pintura', description: 'Film de protección de pintura' },
  { name: 'Carrera Detailing', href: '/formacion-profesional-detailing', description: 'Programa completo con módulo de negocio' },
  { name: 'Restauración', href: '/curso-restauracion-vehiculos', description: 'Cuero, tapicerías y clásicos', badge: 'Próximamente' },
];

const starterLinks: NavItem[] = [
  { name: 'Jornada Zero', href: '/jornada-zero-detailing', description: 'Tu primer día de detailing' },
  { name: 'Up Detail', href: '/up-detail-evento', description: 'Formación intensiva en 1 día' },
];

const resourceLinks: NavItem[] = [
  { name: 'Glosario de detailing', href: '/glosario-detailing', description: 'Más de 80 términos explicados' },
  { name: 'Calculadora de dilución', href: '/calculadora-dilucion-detailing', description: 'Proporciones exactas de mezcla' },
  { name: 'Marketing para detailers', href: '/marketing-digital-detailing', description: 'Web, SEO y marca para tu centro' },
];

const plainLinks: NavItem[] = [
  { name: 'Quiénes somos', href: '/quienes-somos' },
  { name: 'Blog', href: '/blog' },
];

type MenuKey = 'cursos' | 'recursos' | null;

function DropdownLink({ item }: { item: NavItem }) {
  return (
    <Link
      to={item.href}
      role="menuitem"
      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {item.name}
        {item.badge && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{item.badge}</span>
        )}
      </span>
      {item.description && <span className="text-[13px] text-muted-foreground">{item.description}</span>}
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => (href === '/' ? location.pathname === '/' : location.pathname.startsWith(href));
  const coursesActive = [...courseLinks, ...starterLinks].some((l) => isActive(l.href)) || location.pathname.startsWith('/curso-');
  const resourcesActive = resourceLinks.some((l) => isActive(l.href));

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const topLinkClass = (active: boolean) =>
    cn(
      'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      active ? 'text-brand' : 'text-foreground/85 hover:text-foreground'
    );

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
      >
        <nav
          aria-label="Navegación principal"
          className={cn(
            'relative mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-6 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] duration-300 md:h-16 md:px-6',
            isScrolled || mobileOpen
              ? 'border-white/10 bg-background/85 shadow-2xl shadow-black/40 backdrop-blur-xl'
              : 'border-white/[0.08] bg-background/55 backdrop-blur-lg'
          )}
        >
          {/* Línea de luz burdeos en el borde inferior */}
          <span className="pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden="true" />
          <Link to="/" className="flex shrink-0 items-center" aria-label="Academia Detail, ir al inicio">
            <img
              src={academiaLogo}
              alt="Academia Detail"
              className="h-7 w-auto brightness-0 invert md:h-8"
              width={229}
              height={70}
            />
          </Link>

          {/* Escritorio */}
          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative" onMouseEnter={() => openMenu('cursos')} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={topLinkClass(coursesActive)}
                aria-expanded={open === 'cursos'}
                aria-haspopup="true"
                onClick={() => setOpen(open === 'cursos' ? null : 'cursos')}
              >
                Formaciones
                <ChevronDown className={cn('h-4 w-4 transition-transform', open === 'cursos' && 'rotate-180')} aria-hidden="true" />
              </button>
              {open === 'cursos' && (
                <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-2">
                  <div role="menu" className="grid grid-cols-[1.35fr_1fr] gap-2 rounded-xl border border-border bg-card p-3 shadow-2xl shadow-black/40">
                    <div>
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Cursos</p>
                      {courseLinks.map((item) => (
                        <DropdownLink key={item.href} item={item} />
                      ))}
                    </div>
                    <div className="rounded-lg bg-background/60 p-1">
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Si empiezas desde cero</p>
                      {starterLinks.map((item) => (
                        <DropdownLink key={item.href} item={item} />
                      ))}
                      <Link
                        to="/curso-detailing-iniciacion"
                        role="menuitem"
                        className="mx-3 mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
                      >
                        Comparar las dos jornadas
                        <ArrowUpRight className="h-3.5 w-3.5 rotate-45" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => openMenu('recursos')} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={topLinkClass(resourcesActive)}
                aria-expanded={open === 'recursos'}
                aria-haspopup="true"
                onClick={() => setOpen(open === 'recursos' ? null : 'recursos')}
              >
                Recursos
                <ChevronDown className={cn('h-4 w-4 transition-transform', open === 'recursos' && 'rotate-180')} aria-hidden="true" />
              </button>
              {open === 'recursos' && (
                <div className="absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-2">
                  <div role="menu" className="rounded-xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
                    {resourceLinks.map((item) => (
                      <DropdownLink key={item.href} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {plainLinks.map((item) => (
              <Link key={item.href} to={item.href} className={topLinkClass(isActive(item.href))}>
                {item.name}
              </Link>
            ))}

            <a href={SITE.sistemaDetailUrl} target="_blank" rel="noopener" className={topLinkClass(false)}>
              Sistema Detail
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            </a>

            <Button asChild className="ml-3 h-10 px-5 font-semibold">
              <Link to="/contacto">Inscríbete</Link>
            </Button>
          </div>

          {/* Móvil */}
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa, bajo la cabecera */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 bottom-0 top-0 z-40 flex flex-col bg-background pt-[4.75rem] transition-opacity duration-200 lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
          <Link
            to="/curso-detailing-iniciacion"
            className="mb-3 flex items-center justify-between rounded-xl border border-primary/40 bg-primary/10 px-4 py-3.5"
          >
            <span>
              <span className="block text-sm font-semibold text-foreground">¿Empiezas desde cero?</span>
              <span className="block text-[13px] text-muted-foreground">Jornada Zero y Up Detail, en un día</span>
            </span>
            <ArrowUpRight className="h-4 w-4 rotate-45 text-brand" aria-hidden="true" />
          </Link>

          {([
            ['cursos', 'Formaciones', [...courseLinks, ...starterLinks]],
            ['recursos', 'Recursos', resourceLinks],
          ] as [MenuKey, string, NavItem[]][]).map(([key, label, items]) => (
            <div key={key} className="border-b border-border">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-base font-semibold text-foreground"
                aria-expanded={mobileSection === key}
                onClick={() => setMobileSection(mobileSection === key ? null : key)}
              >
                {label}
                <ChevronDown className={cn('h-5 w-5 text-muted-foreground transition-transform', mobileSection === key && 'rotate-180')} aria-hidden="true" />
              </button>
              {mobileSection === key && (
                <ul className="pb-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2.5 text-[0.9375rem]',
                          isActive(item.href) ? 'bg-white/5 text-brand' : 'text-foreground/85'
                        )}
                      >
                        {item.name}
                        {item.badge && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-muted-foreground">{item.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {plainLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn('block border-b border-border py-4 text-base font-semibold', isActive(item.href) ? 'text-brand' : 'text-foreground')}
            >
              {item.name}
            </Link>
          ))}
          <a
            href={SITE.sistemaDetailUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-between border-b border-border py-4 text-base font-semibold text-foreground"
          >
            <span>
              Sistema Detail
              <span className="block text-[13px] font-normal text-muted-foreground">Software de gestión para centros de detailing</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </a>
        </div>
        <div className="border-t border-border p-4" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}>
          <Button asChild size="lg" className="h-12 w-full text-base font-semibold">
            <Link to="/contacto">Inscríbete o pide información</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
