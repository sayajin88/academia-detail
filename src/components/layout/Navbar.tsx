import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap, Car, GraduationCap, Palette, ShieldCheck, Wrench, Home, Image, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import academiaLogo from '@/assets/academia-detail-logo-light.png';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const formationLinks = [
  { name: 'Detailing', href: '/curso-detailing-profesional', icon: Car, description: 'Técnicas profesionales' },
  { name: 'Car Wrapping', href: '/curso-vinilado-vehiculos', icon: Palette, description: 'Vinilado de vehículos' },
  { name: 'Paint Protection Film', href: '/curso-ppf-proteccion-pintura', icon: ShieldCheck, description: 'Protección de pintura' },
  { name: 'Restauración', href: '/curso-restauracion-vehiculos', icon: Wrench, description: 'Recuperación integral' },
  { name: 'Carrera Detailing', href: '/formacion-profesional-detailing', icon: GraduationCap, description: 'Programa completo' },
];

const navLinks = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Quiénes Somos', href: '/quienes-somos', icon: Image },
  { name: 'Inscribirse', href: '/contacto', icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const [mobileFormationsOpen, setMobileFormationsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    setMobileFormationsOpen(false);
  }, [location.pathname]);

  // Update pill position based on active link
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      
      const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setPillStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      } else {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [location.pathname, isLoaded]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isFormationsActive = formationLinks.some(link => location.pathname === link.href) || 
                             location.pathname.includes('/curso-');

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-1.5 md:py-2' : 'py-2 md:py-4'
        } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{ transitionProperty: 'opacity, transform, padding', paddingTop: 'max(env(safe-area-inset-top), 0.375rem)' }}
      >
        <div className="container mx-auto px-2 md:px-4">
          {/* Glass Container - Dark theme */}
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'bg-background/90 backdrop-blur-2xl rounded-xl md:rounded-2xl border border-white/10 shadow-lg shadow-black/20 px-3 md:px-6 py-1.5 md:py-3'
                : 'bg-background/70 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 px-3 md:px-6 py-2 md:py-4'
            }`}
          >
            {/* Animated border gradient */}
            <div className={`absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer-border 3s linear infinite',
                }}
              />
            </div>

            {/* Logo */}
            <Link 
              to="/" 
              className={`flex items-center relative z-10 group transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              <div className="relative flex flex-col">
                <img 
                  src={academiaLogo} 
                  alt="Academia Detail - Cursos de detailing profesional en España" 
                  className="h-9 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
                  width={229}
                  height={70}
                />
                {/* Logo glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-primary/20" />
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div 
              ref={navRef}
              className="hidden lg:flex items-center gap-1 relative"
            >
              {/* Animated pill indicator */}
              <div
                className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full transition-all duration-300 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  opacity: isLoaded ? pillStyle.opacity : 0,
                }}
              />

              <Link
                to="/"
                data-active={location.pathname === '/'}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 rounded-lg ${
                  location.pathname === '/' 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '200ms' }}
              >
                Inicio
              </Link>

              {/* Formaciones Dropdown */}
              <div
                className={`relative transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: '250ms' }}
                onMouseEnter={() => setIsFormationsOpen(true)}
                onMouseLeave={() => setIsFormationsOpen(false)}
              >
                <button
                  data-active={isFormationsActive}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isFormationsActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  Formaciones
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isFormationsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu - Dark theme */}
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                    isFormationsOpen 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="relative bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/40 p-3 min-w-[280px]">
                    {/* Dropdown accent */}
                    <div className="absolute -inset-px bg-gradient-to-b from-primary/10 to-transparent rounded-2xl pointer-events-none" />
                    
                    <div className="relative space-y-1">
                      {formationLinks.map((link, index) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group hover:bg-white/5"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="p-2 rounded-lg transition-colors duration-200 bg-white/5 text-foreground/50 group-hover:bg-primary/10 group-hover:text-primary">
                            <link.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {link.name}
                            </p>
                            <p className="text-xs text-foreground/50">{link.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {navLinks.slice(1).map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-active={isActive(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 rounded-lg ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className={`hidden lg:flex items-center gap-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '450ms' }}>
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/34622773555"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
              >
                <Button 
                  size="sm"
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-4 py-2 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/30 hover:scale-105"
                >
                  <WhatsAppIcon className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                  }`} 
                />
                <span 
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`} 
                />
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel - Dark theme */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex flex-col">
              <img 
                src={academiaLogo} 
                alt="Academia Detail - Cursos de detailing profesional en España" 
                className="h-10 w-auto brightness-0 invert"
                width={229}
                height={70}
              />
            </div>
            <button
              className="p-2 text-foreground/60 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}>
            {/* Main Links */}
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 min-h-[52px] ${
                location.pathname === '/' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Inicio</span>
            </Link>

            {/* Formaciones Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileFormationsOpen(!mobileFormationsOpen)}
                className={`flex items-center justify-between w-full px-4 py-4 rounded-xl transition-all duration-200 min-h-[52px] ${
                  isFormationsActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium">Formaciones</span>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-300 ${
                    mobileFormationsOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Sub-links */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileFormationsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 space-y-1 pt-1">
                  {formationLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        location.pathname === link.href
                          ? 'bg-white/10 text-foreground font-medium'
                          : 'text-foreground/50 hover:text-foreground hover:bg-white/5'
                      }`}
                      style={{ animationDelay: `${(index + 2) * 50}ms` }}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Rest of nav links */}
            {navLinks.slice(1).map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-white/5 hover:text-foreground'
                }`}
                style={{ animationDelay: `${(index + 6) * 50}ms` }}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-background/90 backdrop-blur-xl">
            <div className="flex gap-3">
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/34622773555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                aria-label="Contactar por WhatsApp"
              >
                <Button 
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-6 rounded-xl shadow-lg"
                >
                  <WhatsAppIcon className="h-5 w-5 mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes shimmer-border {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}
