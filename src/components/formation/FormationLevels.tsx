import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormationLevelsProps {
  formation: FormationDetail;
}

export function FormationLevels({ formation }: FormationLevelsProps) {
  if (!formation.levels) return null;

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Niveles"
            title="Elige tu nivel de formación"
            subtitle="Cursos adaptados a tu experiencia y objetivos"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {formation.levels.map((level, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <Card
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full ${
                  level.highlighted
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {level.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary py-1 text-center">
                    <span className="text-xs font-bold text-primary-foreground flex items-center justify-center gap-1">
                      <Star className="w-3 h-3" /> MÁS POPULAR
                    </span>
                  </div>
                )}
                
                <CardHeader className={level.highlighted ? 'pt-10' : ''}>
                  <CardTitle className="text-xl text-foreground">{level.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{level.subtitle}</p>
                  {level.duration && (
                    <Badge variant="secondary" className="w-fit mt-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {level.duration}
                    </Badge>
                  )}
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
