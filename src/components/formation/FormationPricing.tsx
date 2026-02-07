import { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Coffee, 
  HeadphonesIcon, 
  Users, 
  Award,
  Briefcase,
  Construction,
  Bell,
  Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';
import { useCountUp } from '@/hooks/useCountUp';

interface FormationPricingProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationPricing({ formation, onCTAClick }: FormationPricingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const { count: priceCount, ref: priceRef } = useCountUp(formation.comingSoon ? 0 : formation.price, 1500);
  
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  const isComingSoon = formation.comingSoon;

  // Intersection observer for animations
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

  const benefits = [
    { icon: GraduationCap, text: "Certificado oficial incluido", description: "Acredita tu formación profesional" },
    { icon: BookOpen, text: "Material didáctico completo", description: "Guías, manuales y recursos digitales" },
    { icon: Users, text: "Grupos personalizados (máx. 3)", description: "Atención 100% individualizada" },
    { icon: Scale, text: "Formación 100% neutral", description: "Sin ataduras a marcas: Aprende a elegir lo mejor" },
    { icon: HeadphonesIcon, text: "Soporte post-formación", description: "Resolvemos tus dudas después del curso" },
    { icon: Coffee, text: "Coffee break incluido", description: "Descansos con refrigerios incluidos" },
    { icon: Award, text: "Acceso a comunidad privada", description: "Red de profesionales del sector" },
    { icon: Briefcase, text: "Bolsa de empleo exclusiva", description: "Conectamos talento con oportunidades" },
  ];

  return (
    <section 
      id="precios"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Background decorations - subtle red glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm">Inversión en tu Futuro</span>
            <span className="text-primary font-semibold text-sm">Inversión en tu Futuro</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tu Formación Profesional
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Todo lo que necesitas para convertirte en un profesional del detailing automotriz
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Benefits */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              Lo Que Incluye
            </h3>
            
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <li 
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{benefit.text}</p>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Price Card */}
          <div 
            className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div 
              ref={priceCardRef}
              className="pricing-spotlight relative bg-card backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-border sticky top-24"
            >
              {/* Animated border glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-40 blur-sm animate-pulse ${isComingSoon ? 'bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20' : 'bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30'}`} />
              
              {/* Header with special offer badge */}
              <div className={`relative p-4 text-center ${isComingSoon ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600' : 'bg-gradient-to-r from-primary via-primary-glow to-primary'}`}>
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />
                <div className="flex items-center justify-center gap-2 text-white font-bold tracking-wide">
                  {isComingSoon ? (
                    <>
                      <Construction className="w-5 h-5" />
                      <span className="text-sm uppercase">En Desarrollo</span>
                      <Construction className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      <span className="text-sm uppercase">Oferta Especial</span>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </>
                  )}
                </div>
              </div>

              <div className="relative p-6 pt-8">
                {/* Discount badge - only show if not coming soon */}
                {!isComingSoon && (
                  <div className="absolute -top-4 right-6">
                    <div className="discount-badge-3d bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-green-500/30 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span>-{discount}%</span>
                    </div>
                  </div>
                )}

                {/* Price section */}
                <div className="text-center mb-6 pb-6 border-b border-white/10" ref={priceRef}>
                  {isComingSoon ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-extrabold text-amber-400 tracking-tight">
                          Próximamente
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Estamos preparando esta formación con todo el detalle que merece
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-xl text-muted-foreground/70 line-through decoration-red-500 decoration-2">
                          €{formation.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          Precio normal
                        </span>
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl md:text-7xl font-extrabold gradient-text price-animate tracking-tight">
                          €{priceCount.toLocaleString()}
                        </span>
                        <span className="text-lg text-muted-foreground">+ IVA</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Pago único • Financiación disponible</p>
                    </>
                  )}
                </div>

                {/* Duration info */}
                <div className="bg-muted/30 rounded-xl p-4 mb-6 flex items-center gap-3 border border-white/5">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isComingSoon ? 'bg-amber-500/20' : 'bg-primary/20'}`}>
                    <Calendar className={`w-5 h-5 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isComingSoon ? 'Disponibilidad' : 'Próxima convocatoria'}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {isComingSoon ? 'Próximamente • Te avisaremos' : 'Febrero 2026 • Consultar fechas'}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={isComingSoon ? "outline" : "hero"}
                  size="lg"
                  className={`w-full ripple-button group transition-all text-base py-6 font-bold ${
                    isComingSoon 
                      ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10' 
                      : 'shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/50'
                  }`}
                  onClick={onCTAClick}
                >
                  {isComingSoon ? (
                    <>
                      <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Avisarme Cuando Esté Lista
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Reservar Mi Plaza Ahora
                    </>
                  )}
                </Button>

                {/* Urgency & Social proof */}
                <div className="mt-5 space-y-3">
                  {isComingSoon ? (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                      </span>
                      <span className="text-amber-400 font-medium">Formación en preparación</span>
                    </div>
                  ) : (
                    <>
                       {/* Progress bar for spots */}
                       <div className="space-y-2">
                         <div className="flex justify-between text-xs text-muted-foreground">
                           <span>Plazas ocupadas</span>
                           <span className="text-primary font-bold">2 de 3</span>
                         </div>
                         <div className="h-3 bg-muted rounded-full overflow-hidden">
                           <div 
                             className={`h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000 ${isVisible ? 'animate-pulse' : ''}`}
                             style={{ width: isVisible ? '66%' : '0%' }}
                           />
                         </div>
                       </div>
                      
                       <div className="flex items-center justify-center gap-2 text-sm">
                         <span className="relative flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                         </span>
                         <span className="text-green-400 font-bold">¡Solo queda 1 plaza disponible!</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>+500 alumnos ya formados con nosotros</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}