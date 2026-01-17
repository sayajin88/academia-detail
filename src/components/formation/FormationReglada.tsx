import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { GraduationCap, Layers, BadgeCheck } from 'lucide-react';

interface FormationRegladaProps {
  formation: FormationDetail;
}

const icons = [GraduationCap, Layers, BadgeCheck];

export function FormationReglada({ formation }: FormationRegladaProps) {
  if (!formation.formacionRegladaItems) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Formación Profesional"
            title="Formación Reglada de Calidad"
            subtitle="Estándares europeos para una carrera profesional sólida"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {formation.formacionRegladaItems.map((item, index) => {
            const IconComponent = icons[index] || GraduationCap;
            return (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
