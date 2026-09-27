import { Link } from 'react-router-dom';
import { ArrowRight, Users, Eye, BadgeCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trackDirectoryClick = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'directory_banner_click', {
      event_category: 'engagement',
      event_label: 'blog_directory_banner',
    });
  }
};

const benefits = [
  { icon: Users, text: 'Llega a nuevos clientes cerca de ti' },
  { icon: Eye, text: 'Aumenta tu visibilidad digital' },
  { icon: BadgeCheck, text: 'Ficha verificada con badge' },
  { icon: Clock, text: 'Solicitud gratuita, revisión en 48h' },
];

export function BlogDirectoryBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-glow p-6 md:p-8 my-10">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-green-500/20 text-white/90 border border-green-400/30 animate-pulse">
          <Clock className="h-3 w-3" />
          GRATIS hasta 31 Mar
        </span>

        <h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground leading-tight max-w-xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
        >
          ¿Eres Profesional, Detailer o Tienes un Centro?
        </h3>

        <p className="text-primary-foreground/75 text-sm leading-relaxed max-w-md">
          Aparece en nuestro directorio nacional e internacional y conecta con clientes que buscan profesionales de confianza.
        </p>

        {/* Price chip */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
          <span className="text-xs text-white/60 line-through">4,99 €/mes</span>
          <span className="text-xs font-bold text-green-300">0 €/mes</span>
          <span className="text-[10px] uppercase font-semibold text-white/70">· Oferta limitada</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
          {benefits.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2.5 text-left bg-white/10 rounded-lg px-3 py-2 border border-white/10"
            >
              <Icon className="h-4 w-4 text-primary-foreground flex-shrink-0" />
              <span className="text-xs text-primary-foreground/90 font-medium leading-snug">{text}</span>
            </div>
          ))}
        </div>

        <Link to="/centros-detailing-espana/unete" onClick={trackDirectoryClick}>
          <Button
            size="default"
            className="bg-white text-primary hover:bg-white/90 rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg shadow-black/20 group"
          >
            Únete Gratis — 0 €/mes
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
