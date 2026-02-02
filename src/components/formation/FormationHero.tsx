import { useState, useEffect } from 'react';
import { Clock, Users, Award, ArrowLeft, Sparkles, Construction, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';

interface FormationHeroProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationHero({ formation, onCTAClick }: FormationHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isComingSoon = formation.comingSoon;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background with aspect-ratio container to prevent CLS */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-muted" />
        <img
          src={formation.image}
          alt={formation.title}
          className={`absolute inset-0 w-full h-full object-cover ${isComingSoon ? 'grayscale-[20%]' : ''}`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
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

        <div className={`max-w-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Coming Soon Badge */}
          {isComingSoon && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4 animate-pulse">
              <Construction className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">
                En Desarrollo
              </span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 shimmer-badge">
            <span className="text-primary font-semibold text-sm">
              {formation.duration}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {formation.title}
          </h1>
          <h2 className="sr-only">
            {formation.slug === 'curso-detailing-profesional' 
              ? 'Curso de pulido de coches y tratamiento cerámico profesional en España'
              : formation.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-white/70 mb-6">
            {formation.subtitle}
          </p>
          <p className="text-white/80 leading-relaxed mb-8 text-lg">
            {formation.heroDescription}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-8">
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
          <Button 
            variant={isComingSoon ? "outline" : "hero"} 
            size="touch" 
            onClick={onCTAClick} 
            className={`ripple-button group ${isComingSoon ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10' : ''}`}
          >
            {isComingSoon ? (
              <>
                <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Avisarme cuando esté disponible
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Reservar Plaza
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
