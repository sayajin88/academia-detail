import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/detail-park-logo-white.png';

const formationLinks = [
  { name: 'Detailing', href: '/formacion/detailing' },
  { name: 'Car Wrapping', href: '/formacion/wrapping' },
  { name: 'Paint Protection Film', href: '/formacion/ppf' },
  { name: 'Restauración', href: '/formacion/restauracion' },
  { name: 'Carrera Detailing', href: '/carrera-detailing', highlight: true },
];

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsFormationsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Detail Park" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Inicio
            </Link>

            {/* Formaciones Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFormationsOpen(true)}
              onMouseLeave={() => setIsFormationsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/formacion') || location.pathname === '/carrera-negocio'
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                Formaciones
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isFormationsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isFormationsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-2 min-w-[220px]">
                    {formationLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          link.highlight
                            ? 'bg-gradient-to-r from-primary/20 to-primary-glow/20 text-primary font-semibold border border-primary/30'
                            : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/galeria"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/galeria' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Galería
            </Link>

            <Link
              to="/contacto"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/contacto' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Contacto
            </Link>

            <Link
              to="/jornada-cero"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/jornada-cero' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Soy nuevo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Inicio
            </Link>

            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Formaciones
              </p>
              <div className="space-y-1 pl-2">
                {formationLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      link.highlight
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/80 hover:bg-muted'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/galeria"
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Galería
            </Link>

            <Link
              to="/contacto"
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Contacto
            </Link>

            <Link
              to="/jornada-cero"
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              Soy nuevo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
