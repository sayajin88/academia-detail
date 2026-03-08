import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, Mail, Sparkles, Zap, Users, Construction, Bell, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useCountUp } from '@/hooks/useCountUp';

interface FormationCTAProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationCTA({ formation, onCTAClick }: FormationCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [spotsLeft] = useState(Math.floor(Math.random() * 5) + 3);
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);
  const { count: priceCount, ref: priceRef } = useCountUp(formation.comingSoon ? 0 : formation.price, 1500);
  
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  const isComingSoon = formation.comingSoon;

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

  // Spotlight effect
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
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${isComingSoon ? 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600' : 'bg-gradient-to-br from-primary via-primary to-primary-glow'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
      
      {/* Animated background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <AnimatedSection>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                  {isComingSoon ? (
                    <>
                      <Construction className="w-4 h-4 text-white" />
                      <span className="text-white/90 text-sm font-medium">
                        Formación en desarrollo
                      </span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white/90 text-sm font-medium">
                        Solo <span className="font-bold">{spotsLeft}</span> plazas disponibles
                      </span>
                    </>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {isComingSoon ? '¿Te interesa esta formación?' : 'Reserva tu Plaza Ahora'}
                </h2>
                <p className="text-white/80 mb-8 text-lg">
                  {isComingSoon 
                    ? 'Déjanos tus datos y te avisaremos en cuanto esté disponible. Serás de los primeros en enterarte.'
                    : 'Las plazas son limitadas para garantizar una formación personalizada. No pierdas la oportunidad de aprender con los mejores.'
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                  <a
                    href="tel:+34622773555"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass-card px-4 py-2 rounded-full hover:scale-105"
                  >
                    <Phone className="h-4 w-4" />
                    +34 622 773 555
                  </a>
                  <a
                    href="mailto:info@academiadetail.com"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass-card px-4 py-2 rounded-full hover:scale-105"
                  >
                    <Mail className="h-4 w-4" />
                    info@academiadetail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Price Card */}
            <AnimatedSection delay={200}>
              <div 
                ref={priceCardRef}
                className={`pricing-spotlight bg-white rounded-2xl p-8 text-center relative overflow-hidden transition-all duration-500 ${isVisible ? 'popular-card shadow-2xl' : ''}`}
              >
                {/* Badge */}
                {!isComingSoon && (
                  <div className="absolute -top-1 -right-1">
                    <div className="discount-badge-3d bg-gradient-to-r from-primary to-primary-glow text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl font-bold shadow-lg">
                      <Zap className="w-4 h-4 inline mr-1" />
                      -{discount}%
                    </div>
                  </div>
                )}

                {isComingSoon && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl font-bold shadow-lg">
                      <Construction className="w-4 h-4 inline mr-1" />
                      Próximamente
                    </div>
                  </div>
                )}

                <div ref={priceRef}>
                  {isComingSoon ? (
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-amber-600">
                        Próximamente
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        €{formation.originalPrice}
                      </span>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-6xl font-bold text-foreground price-animate">
                          €{priceCount}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {isComingSoon ? 'Formación en preparación' : `${formation.duration} de formación intensiva`}
                </p>

                <Button
                  variant={isComingSoon ? "outline" : "hero"}
                  size="touch"
                  className={`w-full group ripple-button transition-all duration-300 ${
                    isComingSoon 
                      ? 'border-amber-500 text-amber-600 hover:bg-amber-50 hover:scale-[1.02]' 
                      : 'shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]'
                  }`}
                  onClick={onCTAClick}
                >
                  {isComingSoon ? (
                    <>
                      <Bell className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Avisarme cuando esté lista
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Reservar Plaza
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${isComingSoon ? 'bg-amber-500' : 'bg-green-500'}`} />
                  {isComingSoon 
                    ? 'Te notificaremos por email cuando esté disponible'
                    : 'Reserva ahora y paga después • Consulta fechas disponibles'
                  }
                </p>
                
                {/* Urgency bar - only show if not coming soon */}
                {!isComingSoon && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Plazas ocupadas</span>
                      <span className="text-primary font-bold">{8 - spotsLeft}/8</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full progress-fill"
                        style={{ width: `${((8 - spotsLeft) / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
