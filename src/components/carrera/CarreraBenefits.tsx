import { useState, useEffect, useRef } from 'react';
import { Star, Sparkles, Shield, Layers, ShieldCheck, Paintbrush, Award, Calculator, FileText, PiggyBank, Receipt, TrendingUp, Camera, Share2, Users, Building2, Scale, Wrench, Car, Crown, Target, Clock, Network, Truck, Briefcase, Handshake, MessageCircle, Phone, HelpCircle, RefreshCcw, Gift } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Shield, Layers, ShieldCheck, Paintbrush, Award, Calculator, FileText, PiggyBank, Receipt, TrendingUp, Camera, Share2, Users, Building2, Scale, Wrench, Car, Crown, Target, Clock, Network, Truck, Briefcase, Handshake, MessageCircle, Phone, HelpCircle, RefreshCcw, Gift, Star
};

const categories = [
  { id: 'all', label: 'Todos', count: carreraDetailingData.benefits.length },
  { id: 'tecnico', label: 'Técnico', count: carreraDetailingData.benefits.filter(b => b.category === 'tecnico').length },
  { id: 'negocio', label: 'Negocio', count: carreraDetailingData.benefits.filter(b => b.category === 'negocio').length },
  { id: 'experiencia', label: 'Experiencia', count: carreraDetailingData.benefits.filter(b => b.category === 'experiencia').length },
  { id: 'networking', label: 'Networking', count: carreraDetailingData.benefits.filter(b => b.category === 'networking').length },
  { id: 'soporte', label: 'Soporte', count: carreraDetailingData.benefits.filter(b => b.category === 'soporte').length },
];

const CarreraBenefits = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
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

  const filteredBenefits = activeCategory === 'all' 
    ? carreraDetailingData.benefits 
    : carreraDetailingData.benefits.filter(b => b.category === activeCategory);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Star;
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              {carreraDetailingData.benefits.length}+ Beneficios
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-monument mb-4">
            <span className="text-foreground">TODO LO QUE </span>
            <span className="gold-gradient-text">INCLUYE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada euro de tu inversión está justificado. Mira todo lo que obtienes:
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold text-gold-foreground shadow-gold-glow'
                  : 'bg-card border border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-foreground'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBenefits.map((benefit, index) => {
            const IconComponent = getIcon(benefit.icon);
            
            return (
              <div
                key={benefit.title}
                className={`group p-5 rounded-xl bg-card border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:shadow-gold-glow ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index % 12) * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1 group-hover:text-gold transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <AnimatedSection delay={0.5} className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Y esto es solo lo que hemos podido listar. La experiencia va mucho más allá.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CarreraBenefits;
