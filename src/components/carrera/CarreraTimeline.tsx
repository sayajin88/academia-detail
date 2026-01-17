import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Layers, Users, Crown } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Layers,
  Users,
  Crown,
};

const CarreraTimeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);
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
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-monument mb-4">
            <span className="text-foreground">TU MES DE </span>
            <span className="gold-gradient-text">TRANSFORMACIÓN</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada semana te acerca más a convertirte en empresario del Detailing
          </p>
        </AnimatedSection>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          {/* Timeline bar */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gold -translate-y-1/2 transition-all duration-1000"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
            
            {/* Week markers */}
            <div className="relative flex justify-between">
              {carreraDetailingData.weeklyTimeline.map((week, index) => {
                const IconComponent = iconMap[week.icon] || GraduationCap;
                const delay = index * 0.2;
                
                return (
                  <div
                    key={week.week}
                    className={`relative cursor-pointer transition-all duration-500 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay}s` }}
                    onMouseEnter={() => setActiveWeek(index)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeWeek === index 
                        ? 'bg-gold scale-110 shadow-gold-glow' 
                        : 'bg-card border-2 border-gold/30'
                    }`}>
                      <IconComponent className={`w-7 h-7 transition-colors ${
                        activeWeek === index ? 'text-gold-foreground' : 'text-gold'
                      }`} />
                    </div>
                    <p className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 font-monument whitespace-nowrap transition-colors ${
                      activeWeek === index ? 'text-gold' : 'text-foreground'
                    }`}>
                      Semana {week.week}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active week content */}
          <div className="p-8 rounded-2xl bg-card border border-gold/20 min-h-[200px]">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-monument gold-gradient-text mb-4">
                {carreraDetailingData.weeklyTimeline[activeWeek].title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {carreraDetailingData.weeklyTimeline[activeWeek].description}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {carreraDetailingData.weeklyTimeline[activeWeek].highlights.map((highlight, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {carreraDetailingData.weeklyTimeline.map((week, index) => {
            const IconComponent = iconMap[week.icon] || GraduationCap;
            
            return (
              <div
                key={week.week}
                className={`relative pl-16 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector line */}
                {index < carreraDetailingData.weeklyTimeline.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-full bg-gold/30" />
                )}
                
                {/* Icon */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-gold" />
                </div>
                
                {/* Content */}
                <div className="p-6 rounded-xl bg-card border border-gold/20">
                  <p className="text-gold text-sm font-semibold mb-1">Semana {week.week}</p>
                  <h3 className="text-xl font-monument text-foreground mb-2">
                    {week.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {week.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {week.highlights.map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CarreraTimeline;
