import { Building, Car, Brain, User, Target, Users, X, Check, Trophy } from 'lucide-react';
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
    <section className="hidden md:block py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow effect on Academia Detail side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-2/3 
                        bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Por qué somos diferentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              La Competencia{' '}
              <span className="text-muted-foreground/50">vs</span>{' '}
              <span className="text-primary">Academia Detail</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No todas las academias de detailing son iguales. Descubre qué nos hace únicos.
            </p>
          </div>
        </AnimatedSection>

        {/* Column Headers */}
        <div className="grid grid-cols-[1fr_120px_1fr] gap-6 max-w-6xl mx-auto mb-8">
          {/* Header Competencia */}
          <div className="text-center">
            <span className="text-muted-foreground/60 text-sm uppercase tracking-widest font-medium">
              La Competencia
            </span>
          </div>
          
          {/* Header Aspectos */}
          <div className="text-center">
            <span className="text-muted-foreground/40 text-xs uppercase tracking-widest">
              Aspecto
            </span>
          </div>
          
          {/* Header Academia Detail */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                            bg-primary/10 border border-primary/30">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                Academia Detail
              </span>
              <span className="flex items-center gap-1 text-xs text-primary/80 font-medium">
                <Trophy className="w-3 h-3" />
                Winner
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2
                          bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          {/* Rows */}
          <div className="space-y-4">
            {comparisonData.map((item, index) => {
              const Icon = item.icon;
              const delay = index * 80;
              
              return (
                <AnimatedSection key={item.aspect} delay={delay / 1000} animation="fade-up">
                  <div className="grid grid-cols-[1fr_120px_1fr] gap-6 items-center group">
                    {/* Competition Card - Ghost/Loser Style */}
                    <div className="relative p-5 rounded-xl bg-muted/10 border border-muted/20 
                                    hover:border-muted/40 transition-all duration-300
                                    hover:bg-muted/15">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center
                                        group-hover:scale-105 transition-transform duration-300">
                          <X className="w-5 h-5 text-destructive/50" />
                        </div>
                        <span className="text-muted-foreground/70 text-sm leading-relaxed">
                          {item.competition}
                        </span>
                      </div>
                    </div>

                    {/* Center Timeline Node */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative z-10 w-14 h-14 rounded-full bg-background 
                                      border-2 border-primary/40 flex items-center justify-center 
                                      group-hover:scale-110 group-hover:border-primary 
                                      transition-all duration-300
                                      shadow-[0_0_20px_hsl(var(--primary)/0.2)]
                                      group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="mt-2 text-xs text-muted-foreground/50 font-medium text-center">
                        {item.aspect}
                      </span>
                    </div>

                    {/* Academia Detail Card - Winner Style with Glow */}
                    <div className="relative p-5 rounded-xl bg-card border border-primary/30 
                                    shadow-[0_0_30px_hsl(var(--primary)/0.12)] 
                                    hover:shadow-[0_0_50px_hsl(var(--primary)/0.2)]
                                    hover:border-primary/50 transition-all duration-500
                                    overflow-hidden group/card">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 rounded-xl 
                                      bg-gradient-to-r from-primary/5 via-transparent to-primary/5
                                      opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center
                                        group-hover:scale-110 group-hover:bg-primary/30 
                                        transition-all duration-300">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium text-sm leading-relaxed">
                          {item.academiaDetail}
                        </span>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute -top-10 -right-10 w-20 h-20 
                                      bg-primary/10 rounded-full blur-2xl 
                                      group-hover/card:bg-primary/15 transition-colors duration-500" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl 
                            bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
                            border border-primary/30 
                            shadow-[0_0_40px_hsl(var(--primary)/0.1)]
                            hover:shadow-[0_0_60px_hsl(var(--primary)/0.15)]
                            hover:border-primary/40 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <span className="text-foreground font-bold text-lg">
                Aquí no hay teoría vacía, solo resultados reales
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
