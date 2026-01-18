import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 9, suffix: '+', label: 'Años de experiencia' },
  { value: 500, suffix: '+', label: 'Vehículos tratados' },
  { value: 200, suffix: '+', label: 'Alumnos formados' },
];

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2000);
  
  return (
    <AnimatedSection delay={delay} className="text-center">
      <div ref={ref} className="relative">
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary-foreground/70 bg-clip-text text-transparent">
          {count}{suffix}
        </span>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">{label}</p>
      </div>
    </AnimatedSection>
  );
}

export function AboutStats() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Nuestros Números
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              Resultados que Hablan por Sí Solos
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem 
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
