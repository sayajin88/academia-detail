import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Heart, Briefcase, Wrench, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    title: 'Vivimos del Detailing',
    subtitle: 'No de la formación',
    description: 'Nuestro negocio principal es el taller. Los cursos son una extensión de nuestra experiencia real, no nuestra fuente principal de ingresos. Esto garantiza que enseñamos lo que funciona de verdad.',
    highlights: [
      'Taller activo con clientes reales',
      'Ingresos reales del negocio, no de cursos',
      'Conocimiento probado en el mercado',
    ],
  },
  {
    icon: Briefcase,
    title: 'Técnica + Gestión',
    subtitle: 'El combo ganador',
    description: 'No solo enseñamos a pulir. Enseñamos a presupuestar, comunicar con el cliente, gestionar KPIs y rentabilizar cada servicio. La mayoría de centros cierran por mala gestión, no por falta de técnica.',
    highlights: [
      'Presupuestos y comunicación con clientes',
      'KPIs y métricas de negocio',
      'Estrategias de rentabilidad probadas',
    ],
  },
  {
    icon: Wrench,
    title: 'Entorno Real',
    subtitle: 'Sin simulaciones',
    description: 'Aprenderás en un taller activo, con coches de clientes reales y decisiones de negocio reales. Nada de simulaciones en aulas: aquí se aprende trabajando de verdad.',
    highlights: [
      'Práctica en vehículos de clientes',
      'Decisiones de negocio en tiempo real',
      'Experiencia transferible desde día uno',
    ],
  },
];

export function AboutPhilosophy() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-brand text-sm font-medium mb-4">
              Nuestra Filosofía
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo Que Nos Hace Diferentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tres pilares que definen nuestra forma de enseñar y que garantizan 
              que saldrás preparado para el mundo real del detailing.
            </p>
          </div>
        </AnimatedSection>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={pillar.title} delay={index * 0.15}>
              <div className="group h-full bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon className="w-7 h-7 text-brand" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-1">{pillar.title}</h3>
                <p className="text-brand text-sm font-medium mb-4">{pillar.subtitle}</p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Differentiator Banner */}
        <AnimatedSection delay={0.5} className="mt-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 rounded-2xl p-8 md:p-10 text-center">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-30 overflow-hidden">
              <div 
                className="absolute inset-0 w-[200%]"
                style={{
                  background: 'linear-gradient(90deg, transparent 25%, hsl(var(--primary) / 0.3) 50%, transparent 75%)',
                  animation: 'shimmer-border 3s linear infinite',
                  willChange: 'transform',
                }}
              />
            </div>

            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-bold mb-3">
                "Somos el <span className="text-brand">único centro de formación</span> en España 
                donde vivimos del Detailing, no de la formación."
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Esta es la diferencia que te garantiza un aprendizaje real y aplicable. 
                Aprende de quienes viven de esto cada día, no de quienes solo enseñan.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
