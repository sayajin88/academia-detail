import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Gauge, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import practicaImage from '@/assets/evento-practica-pulidora-real.jpg';

const highlights = [
  { icon: Clock, label: '1 Día Intensivo', description: 'Formación completa en una jornada' },
  { icon: ShieldCheck, label: 'Sin Compromiso', description: 'Prueba antes de decidirte' },
  { icon: Gauge, label: 'Taller 100% Real', description: 'Práctica desde el primer minuto' },
];

export function JornadaZeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-primary/20 bg-card shadow-xl shadow-primary/5">
          {/* Subtle gradient accent on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary" />

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Column */}
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px]">
              <img
                src={practicaImage}
                alt="Alumno practicando detailing con pulidora durante la Jornada Zero"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
              {/* Overlay for text readability on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/80" />
              
              {/* Price badge floating on image */}
              <div className="absolute bottom-4 left-4 lg:bottom-auto lg:top-6 lg:left-6 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                97€ <span className="text-sm font-normal opacity-90">+ IVA</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              {/* Badge */}
              <span className="inline-flex items-center self-start px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-4">
                ¿Nuevo en el Detailing?
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Jornada Zero:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
                  Tu Primera Experiencia
                </span>
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Un día intensivo diseñado para quienes quieren probar el detailing profesional antes de comprometerse con una formación completa. Ideal para principiantes y curiosos que buscan descubrir su pasión.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center p-3 rounded-xl bg-muted/50 border border-border/50"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
                <Button asChild variant="hero" size="xl" className="w-full sm:w-auto min-h-[52px]">
                  <Link to="/curso-detailing-iniciacion">
                    Reservar Mi Jornada Zero
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Discount note */}
              <p className="text-xs text-muted-foreground italic">
                💡 Si después quieres continuar, el importe se descuenta de cualquier curso completo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
