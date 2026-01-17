import { useState, useEffect, useRef } from 'react';
import { Calculator, TrendingUp, Building2, FileText, Star, Crown } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  TrendingUp,
  Building2,
  FileText,
};

const CarreraModuloNegocio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
    >
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-background to-gold/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-gold/50 bg-gold/10 backdrop-blur-sm mb-8">
            <Star className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-gold font-bold text-lg uppercase tracking-wider">
              Lo Que Nadie Más Te Enseña
            </span>
            <Star className="w-5 h-5 text-gold animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-monument mb-6">
            <span className="text-foreground">MÓDULO DE </span>
            <span className="gold-gradient-text">NEGOCIO</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gold-light font-medium mb-4 max-w-3xl mx-auto">
            "Porque saber pulir no es suficiente para tener éxito"
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Este módulo exclusivo te enseña a montar y dirigir una empresa de Detailing, Car Wrapping y Custom como un verdadero empresario
          </p>
        </AnimatedSection>

        {/* Business Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {carreraDetailingData.businessModules.map((module, index) => {
            const IconComponent = iconMap[module.icon] || Calculator;
            
            return (
              <div
                key={module.category}
                className={`relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-gold/20 transition-all duration-700 hover:border-gold/50 hover:shadow-gold-glow group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                    <IconComponent className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-monument text-foreground group-hover:text-gold transition-colors">
                    {module.category}
                  </h3>
                </div>

                {/* Items list */}
                <ul className="space-y-3">
                  {module.items.map((item, i) => (
                    <li 
                      key={i}
                      className={`flex items-start gap-3 text-muted-foreground transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 150 + i * 50}ms` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Value callout */}
        <AnimatedSection delay={0.6}>
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 rounded-2xl bg-card border-2 border-gold/30 overflow-hidden">
              {/* Gold glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-10 h-10 text-gold" />
                </div>
                
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-monument text-foreground mb-2">
                    Valor del Módulo: <span className="gold-gradient-text">€2.500</span>
                  </p>
                  <p className="text-muted-foreground">
                    Este módulo <strong className="text-gold">no está disponible por separado</strong>. 
                    Solo puedes acceder a él a través de la Carrera Detailing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonial */}
        <AnimatedSection delay={0.8} className="mt-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl italic text-muted-foreground mb-4">
              "El módulo de negocio me ahorró miles de euros en errores que habría cometido. 
              Ahora sé exactamente cómo calcular precios, gestionar clientes y llevar mis finanzas."
            </p>
            <p className="text-gold font-semibold">
              — Carlos M., Empresario de Detailing
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CarreraModuloNegocio;
