import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HIDDEN_ROUTES = ['/curso-detailing-iniciacion', '/contacto'];

export function SoyNuevoButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const shouldHide = HIDDEN_ROUTES.some(r => location.pathname.startsWith(r));

  useEffect(() => {
    if (shouldHide) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldHide]);

  if (shouldHide || !isVisible) return null;

  return (
    <Link
      to="/curso-detailing-iniciacion"
      className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Soy nuevo — Inscríbete en la Jornada Zero"
    >
      {/* Glow ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-primary-glow to-primary opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500 animate-pulse" />

      {/* Main button */}
      <div
        className={`relative flex items-center gap-2.5 rounded-full border border-primary/40 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/20 transition-all duration-500 ease-out overflow-hidden ${
          isHovered
            ? 'pl-4 pr-5 py-3 scale-105'
            : 'pl-3.5 pr-4 py-2.5 scale-100'
        }`}
      >
        {/* Shimmer sweep */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.12) 50%, transparent 100%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />

        {/* Icon */}
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <Sparkles className="w-4 h-4" />
        </span>

        {/* Label */}
        <span className="relative text-sm font-bold tracking-wide text-foreground whitespace-nowrap">
          Soy nuevo
        </span>

        {/* Live dot */}
        <span className="relative flex h-2 w-2 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      </div>
    </Link>
  );
}
