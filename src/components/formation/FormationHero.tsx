import { useState, useEffect, useRef } from 'react';
import { Clock, Users, Award, ArrowLeft, Sparkles, Zap, Check, Calendar, GraduationCap, BookOpen, Coffee, HeadphonesIcon } from 'lucide-react';
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
              className="pricing-spotlight relative bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl rounded-3xl overflow-hidden max-w-md ml-auto shadow-2xl shadow-black/40 border border-white/10"
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary/20 opacity-50 blur-sm animate-pulse" />
              
              {/* Header with special offer badge */}
              <div className="relative bg-gradient-to-r from-primary via-primary-glow to-primary p-4 text-center">
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />
                <div className="flex items-center justify-center gap-2 text-white font-bold tracking-wide">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="text-sm uppercase">Oferta Especial</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              <div className="relative p-6 pt-8">
                {/* Discount badge */}
                <div className="absolute -top-4 right-6">
                  <div className="discount-badge-3d bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-green-500/30 flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>-{discount}%</span>
                  </div>
                </div>

                {/* Price section */}
                <div className="text-center mb-6 pb-6 border-b border-white/10" ref={priceRef}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-xl text-muted-foreground/70 line-through decoration-red-500 decoration-2">
                      €{formation.originalPrice}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      Precio normal
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-6xl font-extrabold gradient-text price-animate tracking-tight">
                      €{priceCount}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Pago único • Sin cuotas</p>
                </div>

                {/* Benefits list */}
                <ul className="space-y-3 mb-6">
                  {[
                    { icon: GraduationCap, text: "Certificado oficial incluido" },
                    { icon: BookOpen, text: "Material didáctico completo" },
                    { icon: Users, text: "Grupos reducidos (máx. 8)" },
                    { icon: HeadphonesIcon, text: "Soporte post-formación" },
                    { icon: Coffee, text: "Coffee break incluido" },
                    { icon: Award, text: "Acceso a comunidad privada" },
                  ].map((benefit, i) => (
                    <li 
                      key={i} 
                      className={`flex items-center gap-3 text-sm feature-check stagger-${i + 1} group`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Next date */}
                <div className="bg-muted/30 rounded-xl p-4 mb-6 flex items-center gap-3 border border-white/5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Próxima convocatoria</p>
                    <p className="text-sm font-semibold text-foreground">Febrero 2026 • Consultar fechas</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full ripple-button group shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/50 transition-all text-base py-6 font-bold"
                  onClick={onCTAClick}
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Reservar Mi Plaza Ahora
                </Button>

                {/* Urgency & Social proof */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 font-medium">Solo quedan 3 plazas disponibles</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>+500 alumnos ya formados con nosotros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
