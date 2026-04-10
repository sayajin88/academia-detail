import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, CreditCard, Clock, ShieldCheck } from 'lucide-react';
import viabillLogo from '@/assets/brands/viabill-logo-purple.png';

const STORAGE_KEY = 'viabill-bar-dismissed';

const messages = [
  { icon: CreditCard, text: 'Fórmate hoy, paga a plazos', highlight: 'Sin intereses' },
  { icon: Clock, text: 'Págalo mientras generas negocio', highlight: 'Desde 50€/mes' },
  { icon: ShieldCheck, text: 'Financiación 100% segura', highlight: 'Aprobación inmediata' },
];

export function ViaBillFinancingBar() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === '1';
  });
  const [atFooter, setAtFooter] = useState(false);
  const [activeMsg, setActiveMsg] = useState(0);
  const [animating, setAnimating] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveMsg((prev) => (prev + 1) % messages.length);
        setAnimating(false);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (dismissed || atFooter) return null;

  const handleClose = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  const current = messages[activeMsg];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b0764] via-[#5b21b6] to-[#7c3aed]" />
      <div className="absolute inset-0 bg-[length:200%_100%] animate-[shimmer-bg_3s_linear_infinite] opacity-30"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
      />
      {/* Top glow line — pulsante */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300/80 to-transparent animate-pulse" />
      {/* Glow aura */}
      <div className="absolute -top-3 left-0 right-0 h-6 bg-gradient-to-b from-purple-500/20 to-transparent blur-sm pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center gap-3 md:gap-4 py-3 md:py-3.5">
          {/* Logo */}
          <img
            src={viabillLogo}
            alt="ViaBill"
            className="h-5 md:h-6 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]"
            width={90}
            height={24}
          />

          <div className="w-px h-5 bg-white/25 flex-shrink-0" />

          {/* Rotating message — centrado */}
          <div className="overflow-hidden h-6 relative min-w-[180px] md:min-w-[280px]">
            <div
              className={`flex items-center gap-2 absolute inset-0 justify-center transition-all duration-400 ${
                animating ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            >
              <Icon className="w-4 h-4 text-purple-200 flex-shrink-0" />
              <p className="text-white text-xs md:text-sm font-medium whitespace-nowrap">
                {current.text}
                <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-white/15 text-purple-100 backdrop-blur-sm border border-white/10">
                  {current.highlight}
                </span>
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/25 flex-shrink-0" />

          {/* CTA — visible en todas las resoluciones */}
          <Link
            to="/contacto"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#5b21b6] text-[11px] md:text-xs font-bold shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105 transition-all duration-200 flex-shrink-0"
          >
            <span className="hidden sm:inline">Infórmate</span>
            <span className="sm:hidden">Info</span>
            <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </Link>

          {/* Close */}
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white flex-shrink-0"
            aria-label="Cerrar barra de financiación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-bg {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
