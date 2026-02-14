import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trustBadges = [
  { icon: CheckCircle, label: 'Solicitud gratuita' },
  { icon: Clock, label: 'Revisión en 48h' },
  { icon: ShieldCheck, label: 'Ficha profesional verificada' },
];

export function DirectoryJoinBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-glow p-8 md:p-12 mt-12">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 right-1/4 w-32 h-32 bg-white/[0.03] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Text side */}
        <div className="flex-1">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-white/10 text-white/90 border border-white/20">
            Directorio Profesional
          </span>

          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
          >
            Aparece en el Directorio y Llega a Nuevos Clientes
          </h3>

          <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed max-w-lg mb-6">
            Muestra tus servicios, tu experiencia y tu ubicación a clientes que buscan
            profesionales de confianza cerca de ellos. Totalmente gratuito.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/70 bg-white/10 rounded-full px-3 py-1.5 border border-white/10"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA side */}
        <div className="flex-shrink-0">
          <Link to="/directorio/unete">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-3 text-base font-bold shadow-lg shadow-black/20 w-full lg:w-auto group"
            >
              Únete Gratis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
