import { useState, useEffect, useRef } from 'react';
import { Clock, Users, Award, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';
import { useCountUp } from '@/hooks/useCountUp';

interface FormationHeroProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationHero({ formation, onCTAClick }: FormationHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const { count: priceCount, ref: priceRef } = useCountUp(formation.price, 1500);
  
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Spotlight effect for price card
  useEffect(() => {
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
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${formation.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a formaciones
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 shimmer-badge">
              <span className="text-primary font-semibold text-sm">
                {formation.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {formation.title}
            </h1>
            <p className="text-xl text-white/70 mb-6">
              {formation.subtitle}
            </p>
            <p className="text-white/80 leading-relaxed mb-8 max-w-xl">
              {formation.heroDescription}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/70 glass-card px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
                <span>{formation.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 glass-card px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
                <span>Grupos reducidos</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 glass-card px-4 py-2 rounded-full">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificado incluido</span>
              </div>
            </div>

            {/* CTA */}
            <Button variant="hero" size="xl" onClick={onCTAClick} className="ripple-button group">
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Reservar Plaza
            </Button>
          </div>

          {/* Right - Price Card */}
          <div 
            className={`hidden lg:block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div 
              ref={priceCardRef}
              className="pricing-spotlight gradient-border-animated bg-card/95 backdrop-blur-xl rounded-2xl p-8 max-w-sm ml-auto popular-card"
            >
              {/* Discount badge */}
              <div className="absolute -top-3 -right-3">
                <div className="discount-badge-3d bg-gradient-to-r from-primary to-primary-glow text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-primary/30">
                  <Zap className="w-4 h-4 inline mr-1" />
                  -{discount}%
                </div>
              </div>

              <div className="mb-6" ref={priceRef}>
                <span className="text-sm text-muted-foreground line-through">
                  €{formation.originalPrice}
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold gradient-text price-animate">
                    €{priceCount}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {formation.includes.slice(0, 4).map((item, i) => (
                  <li 
                    key={i} 
                    className={`flex items-center gap-2 text-sm text-muted-foreground feature-check stagger-${i + 1} group hover:text-foreground transition-colors`}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                variant="hero"
                size="lg"
                className="w-full ripple-button group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                onClick={onCTAClick}
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Reservar Ahora
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Plazas limitadas • Próximas fechas disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
