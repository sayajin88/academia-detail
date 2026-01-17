import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Award, Headphones, UserCheck, Building, Briefcase } from 'lucide-react';

interface FormationAdvantagesProps {
  formation: FormationDetail;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  HeadphonesIcon: Headphones,
  UserCheck,
  Building,
  Briefcase,
};

export function FormationAdvantages({ formation }: FormationAdvantagesProps) {
  if (!formation.advantages) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Ventajas"
            title="¿Por qué elegir nuestra academia?"
            subtitle="Formación de calidad con experiencia real en taller"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {formation.advantages.map((advantage, index) => {
            const IconComponent = iconMap[advantage.icon] || Award;
            return (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {advantage.title}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
