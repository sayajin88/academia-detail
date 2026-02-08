import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogCTABanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/[0.03] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
        {/* Text side */}
        <div className="flex-1">
          <h3
            className="text-2xl md:text-3xl font-bold text-primary-foreground leading-tight mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
          >
            Fórmate como Detailer Profesional
          </h3>
          <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed max-w-lg mb-5">
            Aprende la metodología exacta para dominar el detailing y montar tu propio negocio.
            Formación 80% práctica con certificación avalada por Detail Park.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/60 bg-white/10 rounded-full px-3 py-1.5 border border-white/10">
              <Award className="h-3.5 w-3.5" />
              Sello de Calidad Detail Park
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/60 bg-white/10 rounded-full px-3 py-1.5 border border-white/10">
              <Users className="h-3.5 w-3.5" />
              +500 Alumnos Formados
            </span>
          </div>
        </div>

        {/* CTA side */}
        <div className="flex-shrink-0">
          <Link to="/contacto">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-3 text-base font-bold shadow-lg shadow-black/20 w-full lg:w-auto group"
            >
              Inscribirme Ahora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
