import { useState, useEffect, useRef } from 'react';
import { Wrench, Car, Crown, Target, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import eventoInstructorExplicando from '@/assets/evento-instructor-explicando.jpg';
import eventoPracticaPulidoraReal from '@/assets/evento-practica-pulidora-real.jpg';

const experiences = [
  {
    icon: Wrench,
    title: "1 Mes en Taller Real",
    description: "No es una simulación. Trabajarás en nuestro taller profesional con equipamiento de primera línea."
  },
  {
    icon: Car,
    title: "Clientes Reales",
    description: "Desde el primer día trabajarás con vehículos de clientes reales. Coches de alta gama, situaciones reales."
  },
  {
    icon: Target,
    title: "Casos Complejos",
    description: "Te enfrentarás a los retos más difíciles: correcciones severas, instalaciones complicadas, clientes exigentes."
  },
  {
    icon: Crown,
    title: "Dirigirás el Negocio",
    description: "Durante varios días serás tú quien tome las decisiones. Gestionarás el equipo, los clientes y las prioridades."
  },
  {
    icon: Clock,
    title: "Operativa Diaria",
    description: "Vivirás la realidad del día a día: aperturas, cierres, gestión de citas, imprevistos y soluciones."
  }
];

const CarreraExperienciaReal = () => {
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
    <section ref={sectionRef} className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-monument mb-6">
            <span className="text-foreground">EXPERIENCIA </span>
            <span className="gold-gradient-text">100% REAL</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No aprenderás solo teoría. Pasarás 1 mes completo en nuestro taller, 
            trabajando con clientes reales y tomando decisiones de negocio reales.
          </p>
        </AnimatedSection>

        {/* Visual Gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src={eventoInstructorExplicando} 
              alt="Instructor explicando técnicas de detailing"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold">Formación Práctica</p>
              <p className="text-sm text-white/80">Aprende con profesionales reales</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src={eventoPracticaPulidoraReal} 
              alt="Práctica real con pulidora profesional"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold">Práctica Real</p>
              <p className="text-sm text-white/80">Manos a la obra desde el primer día</p>
            </div>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.title}
                className={`relative p-6 rounded-xl bg-card border border-gold/20 transition-all duration-700 hover:border-gold/40 hover:shadow-gold-glow group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-monument text-foreground mb-2 group-hover:text-gold transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Box */}
        <AnimatedSection delay={0.5}>
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden">
              {/* Gold gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20" />
              <div className="absolute inset-0 border-2 border-gold/40 rounded-2xl" />
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Crown className="w-8 h-8 text-gold" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-monument text-foreground mb-4">
                  "Tendrás la oportunidad de manejar y dirigir el negocio durante varios días"
                </h3>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Esta es una experiencia única que no encontrarás en ningún otro curso. 
                  Cuando salgas de aquí, sabrás exactamente qué te espera como empresario.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/30">
                    <span className="text-gold font-bold">30 días</span>
                    <span className="text-muted-foreground">de inmersión</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/30">
                    <span className="text-gold font-bold">+50</span>
                    <span className="text-muted-foreground">vehículos trabajados</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/30">
                    <span className="text-gold font-bold">5 días</span>
                    <span className="text-muted-foreground">como director</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CarreraExperienciaReal;
