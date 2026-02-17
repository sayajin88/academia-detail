import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Check, Clock, Star, AlertCircle, Construction, ArrowRight } from 'lucide-react';
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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge={isSingleLevel ? "Formación Intensiva" : "Niveles"}
            title={isSingleLevel ? "Curso Intensivo Completo" : "Elige tu formación intensiva"}
            subtitle={isSingleLevel ? "Aprende desde cero todo lo que necesitas para dominar esta especialidad" : "Cursos intensivos adaptados a tu experiencia y objetivos"}
          />
        </AnimatedSection>

        <div className={`grid ${gridCols} gap-6 lg:gap-8 ${isSingleLevel ? 'max-w-md' : 'max-w-5xl'} mx-auto items-stretch`}>
          {formation.levels.map((level, index) => {
            const isHighlighted = level.highlighted;
            const accentColor = isComingSoon ? 'amber' : 'primary';

            return (
              <AnimatedSection key={index} delay={index * 120}>
                <div
                  className={`relative h-full rounded-2xl transition-all duration-300 group ${
                    isHighlighted 
                      ? 'md:-mt-3 md:mb-3' 
                      : ''
                  }`}
                >
                  {/* Gradient border for highlighted */}
                  {isHighlighted && (
                    <div className={`absolute -inset-px rounded-2xl ${isComingSoon ? 'bg-gradient-to-b from-amber-500 via-amber-500/40 to-amber-500/10' : 'bg-gradient-to-b from-primary via-primary/40 to-primary/10'}`} />
                  )}

                  <div className={`relative h-full flex flex-col rounded-2xl border overflow-hidden bg-card ${
                    isHighlighted 
                      ? 'border-transparent shadow-xl' 
                      : 'border-border/60 hover:border-primary/30 shadow-lg shadow-black/20'
                  } ${isHighlighted ? (isComingSoon ? 'shadow-amber-500/10' : 'shadow-primary/10') : ''}`}>
                    
                    {/* Popular badge */}
                    {isHighlighted && (
                      <div className={`py-2 text-center ${isComingSoon ? 'bg-amber-500' : 'bg-primary'}`}>
                        <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider flex items-center justify-center gap-1.5">
                          {isComingSoon ? (
                            <><Construction className="w-3.5 h-3.5" /> Próximamente</>
                          ) : (
                            <><Star className="w-3.5 h-3.5" /> Más Popular</>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Level number */}
                    <div className={`px-6 ${isHighlighted ? 'pt-6' : 'pt-8'} pb-0`}>
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold mb-4 ${
                        isComingSoon 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                          : isHighlighted 
                            ? 'bg-primary/15 text-primary border border-primary/20' 
                            : 'bg-muted text-muted-foreground border border-border'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Title & subtitle */}
                    <div className="px-6 pb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{level.title}</h3>
                      <p className="text-sm text-muted-foreground">{level.subtitle}</p>

                      {level.duration && (
                        <Badge variant="secondary" className="mt-3">
                          <Clock className="w-3 h-3 mr-1" />
                          {level.duration}
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="px-6 pb-5 border-b border-border/50">
                      {isComingSoon ? (
                        <span className="text-2xl font-bold text-amber-400">Próximamente</span>
                      ) : level.price ? (
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-black ${isHighlighted ? 'text-primary' : 'text-foreground'}`}>
                            €{level.price.toLocaleString('es-ES')}
                          </span>
                          <span className="text-sm text-muted-foreground">+ IVA</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Features */}
                    <div className="px-6 py-5 flex-1">
                      <ul className="space-y-3">
                        {level.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                              isComingSoon ? 'bg-amber-500/10' : 'bg-primary/10'
                            }`}>
                              <Check className={`w-3 h-3 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`} />
                            </div>
                            <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {level.note && (
                        <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <p className="text-xs text-amber-300/80 flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            {level.note}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    {(hasPrice || isComingSoon) && onCTAClick && (
                      <div className="px-6 pb-6">
                        <Button 
                          onClick={onCTAClick}
                          className={`w-full group rounded-xl ${
                            isComingSoon 
                              ? 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10' 
                              : isHighlighted 
                                ? 'shadow-md shadow-primary/20' 
                                : ''
                          }`}
                          variant={isComingSoon ? "outline" : isHighlighted ? "default" : "outline"}
                          size="lg"
                        >
                          {isComingSoon ? 'AVISARME' : 'APUNTARME'}
                          {!isComingSoon && <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
