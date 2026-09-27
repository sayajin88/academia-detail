import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogCTABanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary p-5 md:p-6">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-1.5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
          >
            Fórmate como Detailer Profesional
          </h3>
          <p className="text-primary-foreground/70 text-xs md:text-sm leading-relaxed max-w-lg">
            Formación 80% práctica con certificación avalada por Detail Park.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary-foreground/60 bg-white/10 rounded-full px-2.5 py-1 border border-white/10">
              <Award className="h-3 w-3" />
              Sello Detail Park
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary-foreground/60 bg-white/10 rounded-full px-2.5 py-1 border border-white/10">
              <Users className="h-3 w-3" />
              218 Alumnos
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link to="/contacto" className="flex-shrink-0">
          <Button
            size="sm"
            className="bg-white text-primary hover:bg-white/90 rounded-lg px-6 text-sm font-bold w-full md:w-auto group"
          >
            Inscribirme
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
