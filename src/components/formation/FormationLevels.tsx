import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Star, AlertCircle, Construction } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FormationLevelsProps {
  formation: FormationDetail;
  onCTAClick?: () => void;
}

export function FormationLevels({ formation, onCTAClick }: FormationLevelsProps) {
  if (!formation.levels) return null;

  const hasPrice = formation.levels.some(level => level.price);
  const isSingleLevel = formation.levels.length === 1;
  const isComingSoon = formation.comingSoon;
  const gridCols = isSingleLevel 
    ? 'md:grid-cols-1' 
    : formation.levels.length === 2 
      ? 'md:grid-cols-2' 
      : 'md:grid-cols-3';

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge={isSingleLevel ? "Formación" : "Niveles"}
            title={isSingleLevel ? "Curso Completo" : "Elige tu formación"}
            subtitle={isSingleLevel ? "Todo lo que necesitas para dominar esta especialidad" : "Cursos adaptados a tu experiencia y objetivos"}
          />
        </AnimatedSection>

        <div className={`grid ${gridCols} gap-8 ${isSingleLevel ? 'max-w-lg' : 'max-w-4xl'} mx-auto`}>
          {formation.levels.map((level, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <Card
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col ${
                  level.highlighted
                    ? isComingSoon 
                      ? 'border-amber-500 shadow-lg shadow-amber-500/20 md:scale-105'
                      : 'border-primary shadow-lg shadow-primary/20 md:scale-105'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {level.highlighted && (
                  <div className={`absolute top-0 left-0 right-0 py-1.5 text-center ${isComingSoon ? 'bg-amber-500' : 'bg-primary'}`}>
                    <span className="text-xs font-bold text-primary-foreground flex items-center justify-center gap-1">
                      {isComingSoon ? (
                        <>
                          <Construction className="w-3 h-3" /> PRÓXIMAMENTE
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3" /> MÁS POPULAR
                        </>
                      )}
                    </span>
                  </div>
                )}
                
                <CardHeader className={`text-center ${level.highlighted ? 'pt-12' : 'pt-6'}`}>
                  <CardTitle className="text-xl md:text-2xl text-foreground">{level.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{level.subtitle}</p>
                  
                  {level.duration && (
                    <Badge variant="secondary" className="w-fit mx-auto mt-3">
                      <Clock className="w-3 h-3 mr-1" />
                      {level.duration}
                    </Badge>
                  )}
                  
                  {/* Price or Coming Soon */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    {isComingSoon ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-amber-500">
                          Próximamente
                        </span>
                      </div>
                    ) : level.price ? (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl md:text-5xl font-bold text-primary">
                          €{level.price.toLocaleString('es-ES')}
                        </span>
                        <span className="text-muted-foreground text-sm">+ iva</span>
                      </div>
                    ) : null}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 shrink-0 mt-0.5 ${isComingSoon ? 'text-amber-500' : 'text-primary'}`} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {level.note && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <p className="text-xs text-amber-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {level.note}
                      </p>
                    </div>
                  )}
                  
                  {(hasPrice || isComingSoon) && onCTAClick && (
                    <Button 
                      onClick={onCTAClick}
                      className={`w-full mt-6 ${isComingSoon ? 'border-amber-500 text-amber-500 hover:bg-amber-500/10' : ''}`}
                      variant={isComingSoon ? "outline" : level.highlighted ? "default" : "outline"}
                      size="lg"
                    >
                      {isComingSoon ? 'AVISARME' : 'APUNTARME'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
