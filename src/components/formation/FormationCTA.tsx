import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface FormationCTAProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationCTA({ formation, onCTAClick }: FormationCTAProps) {
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <AnimatedSection>
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Reserva tu Plaza Ahora
                </h2>
                <p className="text-white/80 mb-6">
                  Las plazas son limitadas para garantizar una formación personalizada. 
                  No pierdas la oportunidad de aprender con los mejores.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                  <a
                    href="tel:+34600000000"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +34 600 000 000
                  </a>
                  <a
                    href="mailto:info@detailpark.es"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    info@detailpark.es
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Price Card */}
            <AnimatedSection delay={200}>
              <div className="bg-white rounded-2xl p-8 text-center">
                <span className="text-sm text-muted-foreground line-through">
                  €{formation.originalPrice}
                </span>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-foreground">
                    €{formation.price}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-bold rounded">
                    -{discount}%
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  {formation.duration} de formación intensiva
                </p>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  onClick={onCTAClick}
                >
                  Reservar Plaza
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Reserva ahora y paga después • Consulta fechas disponibles
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
