import { Building, Car, Brain, User, Target, Users, X, Check } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const comparisonData = [
  {
    aspect: "Instalaciones",
    competition: "Aulas y espacios de formación",
    academiaDetail: "Taller 100% operativo con clientes reales",
    icon: Building
  },
  {
    aspect: "Práctica",
    competition: "Coches propios o simulación",
    academiaDetail: "Vehículos de clientes de alta gama",
    icon: Car
  },
  {
    aspect: "Formación",
    competition: "Solo técnica y productos",
    academiaDetail: "Técnica + Negocio + Mentalidad Empresario",
    icon: Brain
  },
  {
    aspect: "Instructor",
    competition: "Profesores de formación",
    academiaDetail: "Empresario activo que vive del taller",
    icon: User
  },
  {
    aspect: "Objetivo",
    competition: "Certificar alumnos",
    academiaDetail: "Crear empresarios rentables",
    icon: Target
  },
  {
    aspect: "Post-formación",
    competition: "Diploma y adiós",
    academiaDetail: "Mentoría continua + Red de contactos",
    icon: Users
  }
];

export function CompetitiveComparison() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-primary font-medium text-sm">⚡ Por qué somos diferentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              La Competencia vs{' '}
              <span className="text-primary">Academia Detail</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No todas las academias de detailing son iguales. Descubre qué nos hace únicos.
            </p>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center font-bold text-lg text-muted-foreground">
                Aspecto
              </div>
              <div className="text-center font-bold text-lg text-muted-foreground">
                La Competencia
              </div>
              <div className="text-center font-bold text-lg text-primary">
                Academia Detail
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {comparisonData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.aspect}
                    className="grid grid-cols-3 gap-4 items-center bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Aspect */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-semibold text-sm md:text-base">{item.aspect}</span>
                    </div>

                    {/* Competition */}
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <X className="w-5 h-5 text-destructive flex-shrink-0" />
                      <span className="text-xs md:text-sm">{item.competition}</span>
                    </div>

                    {/* Academia Detail */}
                    <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm font-medium text-foreground">{item.academiaDetail}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-primary font-semibold">
                  ✅ Aquí no hay teoría vacía, solo resultados reales
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}