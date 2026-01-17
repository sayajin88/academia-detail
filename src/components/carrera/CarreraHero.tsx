import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Clock, Users, Award, ArrowRight, Sparkles, ChevronDown, Euro } from 'lucide-react';
import { carreraDetailingData } from '@/data/carreraDetailingData';
import { useCountUp } from '@/hooks/useCountUp';
import heroImage from '@/assets/heroes/hero-carrera.jpg';

interface CarreraHeroProps {
  onCTAClick: () => void;
}

const CarreraHero = ({ onCTAClick }: CarreraHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const priceCount = useCountUp(carreraDetailingData.price, 2000, isVisible);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: Clock, label: '1 Mes', sublabel: 'Intensivo' },
    { icon: Users, label: `${carreraDetailingData.spots}`, sublabel: 'Plazas' },
    { icon: Award, label: '4', sublabel: 'Certificaciones' },
    { icon: Euro, label: `${priceCount.toLocaleString()}`, sublabel: 'Inversión' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Carrera Detailing" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Enhanced Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold animate-float opacity-40"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Gold Frame - Desktop Only */}
      <div className="hidden lg:block absolute inset-16 xl:inset-24 pointer-events-none">
        <div className="absolute inset-0 border border-gold/20 rounded-3xl" />
        <div className="absolute inset-0 rounded-3xl gold-frame-animated opacity-40" />
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold/60 rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-gold/60 rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-gold/60 rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold/60 rounded-br-lg" />
      </div>

      {/* Content - Fully Centered */}
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        {/* Premium Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/50 bg-gold/10 backdrop-blur-sm mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Crown className="w-4 h-4 text-gold animate-pulse" />
          <span className="text-gold font-semibold text-sm tracking-[0.2em] uppercase shimmer-badge-gold">
            Programa Exclusivo
          </span>
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
        </div>

        {/* Main Title with Reveal Effect */}
        <div className={`mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-monument leading-none tracking-tight">
            <span className="block text-foreground hero-text-reveal">CARRERA</span>
            <span className="block gold-gradient-text hero-text-reveal" style={{ animationDelay: '0.3s' }}>
              DETAILING
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-gold-light font-medium mb-4 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {carreraDetailingData.subtitle}
        </p>

        <p 
          className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {carreraDetailingData.tagline}
        </p>

        {/* Stats Bar - Horizontal on Desktop, 2x2 Grid on Mobile */}
        <div 
          className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-card/60 backdrop-blur-md rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <span className="block text-xl sm:text-2xl font-monument text-foreground leading-none">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm text-gold/80 uppercase tracking-wider">
                  {stat.sublabel}
                </span>
              </div>
              {/* Separator line - hidden on last item and on mobile */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div 
          className={`mb-8 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button 
            onClick={onCTAClick}
            className="relative h-14 sm:h-16 px-8 sm:px-12 text-base sm:text-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-intense transition-all duration-300 font-bold group overflow-hidden cta-shimmer"
          >
            <Crown className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="relative z-10">Reservar Mi Plaza</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Urgency & Next Edition Info */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 text-gold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
            </span>
            <span className="font-semibold">Solo {carreraDetailingData.spots} plazas disponibles</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gold/30" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Próxima edición:</span>
            <span className="text-gold font-semibold">{carreraDetailingData.nextEdition}</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gold/30" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="w-4 h-4 text-gold/70" />
            <span>+{carreraDetailingData.stats.alumni} empresarios formados</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gold/60 uppercase tracking-widest">Descubre más</span>
        <ChevronDown className="w-6 h-6 text-gold/60" />
      </div>

      {/* Inline Styles for new animations */}
      <style>{`
        .hero-text-reveal {
          animation: textReveal 1s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        .gold-frame-animated {
          background: linear-gradient(90deg, 
            transparent, 
            hsl(45 93% 47% / 0.3), 
            transparent
          );
          background-size: 200% 100%;
          animation: frameShimmer 3s ease-in-out infinite;
        }
        
        @keyframes frameShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .cta-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: translateX(-100%);
          animation: ctaShimmer 2.5s ease-in-out infinite;
        }
        
        @keyframes ctaShimmer {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
        
        .shimmer-badge-gold {
          background: linear-gradient(
            90deg,
            hsl(45 93% 47%) 0%,
            hsl(45 93% 67%) 50%,
            hsl(45 93% 47%) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 3s linear infinite;
        }
        
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

export default CarreraHero;
