import { useState, useEffect, useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const CarreraFormaciones = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const totalValue = carreraDetailingData.includedFormations.reduce((acc, f) => acc + f.value, 0);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              Todo en uno
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-monument mb-4">
            <span className="text-foreground">4 FORMACIONES </span>
            <span className="gold-gradient-text">INCLUIDAS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada una de estas formaciones se ofrece por separado, pero en la Carrera Detailing las obtienes todas juntas
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {carreraDetailingData.includedFormations.map((formation, index) => (
            <div
              key={formation.name}
              className={`relative p-6 rounded-xl bg-card border border-gold/20 transition-all duration-700 hover:border-gold/50 hover:shadow-gold-glow group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-6 bg-gold/90 transform rotate-45 translate-x-6 -translate-y-1 flex items-center justify-center">
                  <Check className="w-4 h-4 text-gold-foreground rotate-[-45deg]" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-monument text-foreground group-hover:text-gold transition-colors">
                  {formation.name}
                </h3>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gold line-through opacity-60">
                    €{formation.value}
                  </span>
                  <span className="text-lg text-green-500 font-semibold">
                    INCLUIDO
                  </span>
                </div>

                <p className="text-muted-foreground text-sm">
                  Duración: {formation.duration}
                </p>

                <ul className="space-y-2">
                  {formation.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Total Savings */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/30">
            <p className="text-lg text-muted-foreground mb-2">
              Valor total de las formaciones:
            </p>
            <p className="text-4xl font-monument gold-gradient-text mb-4">
              €{totalValue.toLocaleString()}
            </p>
            <p className="text-foreground">
              <span className="text-gold font-bold">¡Y esto es solo el principio!</span> La Carrera Detailing incluye mucho más...
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CarreraFormaciones;
