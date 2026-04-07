import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import viabillLogo from '@/assets/brands/viabill.png';

const STORAGE_KEY = 'viabill-bar-dismissed';

export function ViaBillFinancingBar() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === '1';
  });
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setAtFooter(rect.top < window.innerHeight + 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed || atFooter) return null;

  const handleClose = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#5B21B6] via-[#6C28D9] to-[#7C3AED] shadow-2xl shadow-purple-900/40 border-t border-purple-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-2.5 md:py-3">
          {/* Logo + Copy */}
          <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
            <img
              src={viabillLogo}
              alt="ViaBill - Financiación a plazos"
              className="h-5 md:h-7 w-auto flex-shrink-0 brightness-0 invert"
              width={100}
              height={28}
            />
            <div className="hidden sm:block w-px h-6 bg-white/20 flex-shrink-0" />
            <p className="text-white text-xs md:text-sm font-medium truncate md:whitespace-normal">
              <span className="font-bold">Fórmate hoy, paga a plazos</span>
              <span className="hidden md:inline"> · Págalo mientras generas negocio · Sin intereses</span>
            </p>
          </div>

          {/* CTA + Close */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/contacto"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-[#6C28D9] text-xs font-bold hover:bg-white/90 transition-colors"
            >
              Infórmate
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Cerrar barra de financiación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
