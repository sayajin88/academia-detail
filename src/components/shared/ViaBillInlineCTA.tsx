import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import viabillLogo from '@/assets/brands/viabill-logo-purple.png';

interface ViaBillInlineCTAProps {
  variant?: 'default' | 'compact';
}

export function ViaBillInlineCTA({ variant = 'default' }: ViaBillInlineCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="relative overflow-hidden rounded-xl border border-[#6C28D9]/25 bg-gradient-to-r from-[#6C28D9]/8 via-[#7C3AED]/5 to-[#6C28D9]/8 p-4 md:p-5">
        <div className="absolute inset-0 bg-[length:200%_100%] animate-[viabill-shimmer_4s_linear_infinite] opacity-20"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.2) 50%, transparent 100%)' }}
        />
        <div className="relative flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#6C28D9]/15 border border-[#6C28D9]/25 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#6C28D9]" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Financia tu formación</p>
              <p className="text-xs text-muted-foreground">Desde <span className="text-[#6C28D9] font-bold">50€/mes</span> sin intereses</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <img src={viabillLogo} alt="ViaBill" className="h-4 w-auto opacity-70" width={48} height={16} />
            <Link to="/contacto">
              <Button size="sm" className="bg-[#6C28D9] hover:bg-[#5b21b6] text-white rounded-lg text-xs px-4">
                Saber más
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
        <style>{`
          @keyframes viabill-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-[#6C28D9]/20 bg-gradient-to-br from-[#3b0764] via-[#5b21b6] to-[#7c3aed]">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[length:200%_100%] animate-[viabill-shimmer_4s_linear_infinite] opacity-20"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
          />
          {/* Glow orbs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />

          <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Left: icon + logo */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <img src={viabillLogo} alt="ViaBill" className="h-7 md:h-9 w-auto drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
              </div>
            </div>

            {/* Center: copy */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Financia tu formación sin intereses
              </h3>
              <p className="text-purple-100/80 text-sm md:text-base mb-4 max-w-lg">
                Empieza a formarte hoy y paga cómodamente a plazos. Aprobación inmediata, sin papeleos.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-purple-200">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Desde 50€/mes
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Hasta 12 cuotas
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% seguro
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex-shrink-0">
              <Link to="/contacto">
                <Button className="bg-white text-[#5b21b6] hover:bg-purple-50 font-bold rounded-xl px-6 md:px-8 py-5 md:py-6 text-sm md:text-base shadow-xl shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105 transition-all duration-200 group">
                  Solicitar Financiación
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes viabill-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
