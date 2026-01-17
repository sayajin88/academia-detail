import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Clock, Users, Award, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { useCountUp } from '@/hooks/useCountUp';
import heroImage from '@/assets/hero-detailing.jpg';

interface CarreraHeroProps {
  onCTAClick: () => void;
}

const CarreraHero = ({ onCTAClick }: CarreraHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const priceCount = useCountUp(carreraDetailingData.price, 2000, isVisible);

  useEffect(() => {
    setIsVisible(true);
    
    // Spotlight effect
    const card = priceCardRef.current;
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Carrera Detailing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        {/* Gold particles effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 left-1/4 w-1 h-1 bg-gold-light rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-60 right-1/3 w-2 h-2 bg-gold rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-gold-light rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-gold rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/50 bg-gold/10 backdrop-blur-sm">
              <Crown className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-gold font-semibold text-sm tracking-wider uppercase shimmer-badge-gold">
                Programa Exclusivo
              </span>
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-monument leading-none">
              <span className="text-foreground">CARRERA</span>
              <br />
              <span className="gold-gradient-text">DETAILING</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gold-light font-medium">
              {carreraDetailingData.subtitle}
            </p>

            <p className="text-lg text-muted-foreground max-w-lg">
              {carreraDetailingData.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/20">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-foreground font-semibold">{carreraDetailingData.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/20">
                <Users className="w-5 h-5 text-gold" />
                <span className="text-foreground font-semibold">Solo {carreraDetailingData.spots} plazas</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-gold/20">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-foreground font-semibold">4 Certificaciones</span>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden pt-4">
              <Button 
                onClick={onCTAClick}
                className="w-full h-14 text-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-glow transition-all duration-300 font-bold"
              >
                Reservar Mi Plaza <ArrowRight className="ml-2" />
              </Button>
              <p className="text-center text-gold/80 text-sm mt-2">
                Próxima edición: {carreraDetailingData.nextEdition}
              </p>
            </div>
          </div>

          {/* Right - Price Card (Desktop only) */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div 
              ref={priceCardRef}
              className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-md border-2 border-gold/30 gold-spotlight overflow-hidden group"
            >
              {/* Animated gold border */}
              <div className="absolute inset-0 rounded-2xl gold-border-animated" />
              
              {/* Header */}
              <div className="relative z-10 text-center pb-6 border-b border-gold/20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 mb-4">
                  <Crown className="w-4 h-4 text-gold" />
                  <span className="text-gold font-bold text-sm uppercase tracking-wider">
                    Inversión en Tu Futuro
                  </span>
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <p className="text-muted-foreground line-through text-lg">
                    Valor: €{carreraDetailingData.originalValue.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-5xl font-monument gold-gradient-text">
                      €{priceCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="relative z-10 py-6 space-y-3">
                {[
                  "4 Formaciones técnicas completas",
                  "Módulo de Negocio exclusivo",
                  "1 mes en taller real",
                  "Dirigirás el negocio varios días",
                  "Mentoría 6 meses post-curso",
                  "Kit de productos premium"
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 group/item"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Next Edition */}
              <div className="relative z-10 flex items-center justify-center gap-2 py-4 border-t border-b border-gold/20">
                <Calendar className="w-5 h-5 text-gold" />
                <span className="text-foreground">
                  Próxima edición: <strong className="text-gold">{carreraDetailingData.nextEdition}</strong>
                </span>
              </div>

              {/* CTA Button */}
              <div className="relative z-10 pt-6">
                <Button 
                  onClick={onCTAClick}
                  className="w-full h-14 text-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-intense transition-all duration-300 font-bold group"
                >
                  <Crown className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Reservar Mi Plaza
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Urgency */}
              <div className="relative z-10 pt-4 space-y-2 text-center">
                <p className="text-gold flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Solo {carreraDetailingData.spots} plazas por edición
                </p>
                <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-gold/70" />
                  +{carreraDetailingData.stats.alumni} empresarios formados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarreraHero;
