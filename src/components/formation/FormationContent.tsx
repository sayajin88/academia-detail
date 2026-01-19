import { Check, Target, BookOpen } from 'lucide-react';
import { FormationDetail } from '@/data/formationDetails';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface FormationContentProps {
  formation: FormationDetail;
}

export function FormationContent({ formation }: FormationContentProps) {
  // Dynamic titles based on formation type for SEO
  const isDetailing = formation.slug === 'curso-detailing-profesional';
  const learnTitle = isDetailing 
    ? "Módulos de Detallado Interior Avanzado" 
    : "¿Qué aprenderás?";

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Who */}
          <AnimatedSection>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  ¿Para quién es esta formación?
                </h2>
              </div>

              <ul className="space-y-4">
                {formation.forWho.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* What You Learn */}
          <AnimatedSection delay={150}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {learnTitle}
                </h2>
              </div>

              <ul className="space-y-4">
                {formation.whatYouLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
