import { Link } from 'react-router-dom';
import { ArrowRight, Users, Eye, BadgeCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Users, text: 'Llega a nuevos clientes que buscan servicios cerca de ti' },
  { icon: Eye, text: 'Aumenta tu visibilidad y presencia digital profesional' },
  { icon: BadgeCheck, text: 'Ficha verificada con badge de credibilidad y confianza' },
  { icon: Clock, text: 'Solicitud gratuita con revisión en menos de 48 horas' },
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

      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/90 border border-white/20">
          Directorio Profesional
        </span>

        {/* Heading */}
        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight max-w-2xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
        >
          ¿Eres Profesional, Detailer o Tienes un Centro?
        </h3>

        <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed max-w-lg">
          Aparece en nuestro directorio nacional e internacional y conecta con clientes que buscan profesionales de confianza.
        </p>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
          {benefits.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-3 text-left bg-white/10 rounded-xl px-4 py-3 border border-white/10"
            >
              <div className="p-2 rounded-lg bg-white/10 flex-shrink-0 mt-0.5">
                <Icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-primary-foreground/90 font-medium leading-snug">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/centros-detailing-espana/unete">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-3 text-base font-bold shadow-lg shadow-black/20 group"
          >
            Únete Gratis
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}