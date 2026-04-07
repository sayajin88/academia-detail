import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Check, Calendar, Users, Award, ArrowRight, Star } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { useCountUp } from '@/hooks/useCountUp';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FinancingBadge } from '@/components/shared/FinancingBadge';
import { ViaBillPriceTag } from '@/components/formation/ViaBillPriceTag';

interface CarreraPricingProps {
  onCTAClick: () => void;
}

const CarreraPricing = ({ onCTAClick }: CarreraPricingProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { count: priceCount } = useCountUp(carreraDetailingData.price, 2000, isVisible);
  const { count: valueCount } = useCountUp(
    carreraDetailingData.valueBreakdown.reduce((acc, item) => acc + item.value, 0),
    2000,
    isVisible
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-monument mb-3 md:mb-4">
            <span className="text-foreground">TU </span>
            <span className="gold-gradient-text">INVERSIÓN</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Una inversión que transformará tu futuro profesional
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Value Breakdown */}
          <AnimatedSection delay={0.2}>
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-gold/20">
              <h3 className="text-xl md:text-2xl font-monument text-foreground mb-4 md:mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                Desglose del Valor
              </h3>
              
              <div className="space-y-4 mb-8">
                {carreraDetailingData.valueBreakdown.map((item, index) => (
                  <div 
                    key={item.item}
                    className={`flex justify-between items-center py-3 border-b border-border/50 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <span className="text-muted-foreground">{item.item}</span>
                    <span className="text-foreground font-semibold">€{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gold/10 border border-gold/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-foreground font-bold">VALOR TOTAL:</span>
                  <span className="text-2xl font-monument gold-gradient-text">
                    €{valueCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Pricing Card */}
          <AnimatedSection delay={0.4}>
            <div 
              ref={cardRef}
              className="relative p-5 md:p-8 rounded-xl md:rounded-2xl bg-card border-2 border-gold/40 gold-spotlight overflow-hidden"
            >
              {/* Animated gold border */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl gold-border-animated" />
              
              {/* Header */}
              <div className="relative z-10 text-center pb-4 md:pb-6 border-b border-gold/20">
                <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-gold/20 border border-gold/50 mb-4 md:mb-6">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                  <span className="text-gold font-bold uppercase tracking-wider text-xs md:text-sm">
                    Programa Completo
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2 md:space-y-3">
                  <p className="text-muted-foreground line-through text-base md:text-xl">
                    Valor: €{carreraDetailingData.originalValue.toLocaleString()}
                  </p>
                  <p className="text-4xl md:text-6xl font-monument gold-gradient-text">
                    €{priceCount.toLocaleString()}
                  </p>
                  <p className="text-gold text-sm md:text-lg">
                    Ahorras €{(valueCount - carreraDetailingData.price).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="relative z-10 py-4 md:py-6 space-y-3 md:space-y-4">
                {[
                  "4 Formaciones técnicas completas",
                  "Módulo de Negocio exclusivo (€2.500)",
                  "1 mes de práctica en taller real",
                  "Dirigirás el negocio varios días",
                  "Mentoría 6 meses post-formación",
                  "Kit de productos premium",
                  "4 Certificaciones oficiales",
                  "Red de profesionales y proveedores"
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 md:gap-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 60}ms` }}
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                    </div>
                    <span className="text-sm md:text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Next Edition */}
              <div className="relative z-10 flex items-center justify-center gap-2 py-3 md:py-4 border-t border-b border-gold/20 my-3 md:my-4">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                <span className="text-sm md:text-base text-foreground">
                  Próxima edición: <strong className="text-gold">{carreraDetailingData.nextEdition}</strong>
                </span>
              </div>

              {/* CTA */}
              <div className="relative z-10 pt-3 md:pt-4">
                <Button 
                  onClick={onCTAClick}
                  className="w-full h-12 md:h-16 text-base md:text-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-intense transition-all duration-300 font-bold group"
                >
                  <Crown className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Reservar Mi Plaza Ahora</span>
                  <span className="sm:hidden">Reservar Plaza</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-center text-muted-foreground text-xs md:text-sm mt-3 md:mt-4">
                  Financiación disponible hasta 12 meses
                </p>
              </div>

              {/* Urgency Footer */}
              <div className="relative z-10 pt-6 mt-4 border-t border-gold/20 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gold">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Solo {carreraDetailingData.spots} plazas por edición</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                  <Award className="w-4 h-4 text-gold/70" />
                  <span>+{carreraDetailingData.stats.alumni} empresarios ya formados</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CarreraPricing;
