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
  Scale,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';
import { useCountUp } from '@/hooks/useCountUp';
import { ViaBillPriceTag } from './ViaBillPriceTag';
import { FinancingBadge } from '@/components/shared/FinancingBadge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormationPricingProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

const benefits = [
  { icon: GraduationCap, text: "Certificado oficial" },
  { icon: BookOpen, text: "Material completo" },
  { icon: Users, text: "Grupos máx. 3" },
  { icon: Scale, text: "100% neutral" },
  { icon: HeadphonesIcon, text: "Soporte post-curso" },
  { icon: Coffee, text: "Coffee break incluido" },
  { icon: Award, text: "Comunidad privada" },
  { icon: Briefcase, text: "Bolsa de empleo" },
];

export function FormationPricing({ formation, onCTAClick }: FormationPricingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { count: priceCount, ref: priceRef } = useCountUp(formation.comingSoon ? 0 : formation.price, 1500);
  
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  const isComingSoon = formation.comingSoon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="precios"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${isComingSoon ? 'bg-amber-500/5' : 'bg-primary/5'}`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 ${isComingSoon ? 'bg-amber-500/10 border-amber-500/20' : 'bg-primary/10 border-primary/20'}`}>
            <Sparkles className={`h-4 w-4 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`} />
            <span className={`font-semibold text-sm ${isComingSoon ? 'text-amber-400' : 'text-primary'}`}>Inversión en tu Futuro</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Tu Formación Profesional
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Todo lo que necesitas para convertirte en un profesional del detailing
          </p>
        </div>

        {/* Central Pricing Card */}
        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/30">
            
            {/* Top gradient accent bar */}
            <div className={`h-1.5 ${isComingSoon ? 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600' : 'bg-gradient-to-r from-primary via-primary-glow to-primary'}`} />

            {/* Discount badge */}
            {!isComingSoon && (
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 shadow-lg shadow-green-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  -{discount}%
                </div>
              </div>
            )}

            {/* Coming soon badge */}
            {isComingSoon && (
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1">
                  <Construction className="w-3.5 h-3.5" />
                  En desarrollo
                </div>
              </div>
            )}

            <div className="p-6 md:p-10" ref={priceRef}>
              {/* Price block */}
              <div className="text-center mb-8">
                {isComingSoon ? (
                  <div className="py-4">
                    <span className="text-3xl md:text-4xl font-extrabold text-amber-400">Próximamente</span>
                    <p className="text-sm text-muted-foreground mt-2">Estamos preparando esta formación con todo el detalle que merece</p>
                  </div>
                ) : (
                  <div className="py-2">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <span className="text-lg text-muted-foreground/60 line-through decoration-primary/50">
                        €{formation.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-6xl md:text-8xl font-black tracking-tight text-foreground">
                        €{priceCount.toLocaleString()}
                      </span>
                      <span className="text-base text-muted-foreground font-medium">+ IVA</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Pago único · Financiación disponible</p>
                    <ViaBillPriceTag price={formation.price} />
                    <div className="mt-4">
                      <FinancingBadge price={formation.price} variant="prominent" />
                    </div>
                  </div>
                )}
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/50 text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${400 + i * 60}ms` }}
                  >
                    <b.icon className={`w-5 h-5 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`} />
                    <span className="text-xs font-medium text-foreground leading-tight">{b.text}</span>
                  </div>
                ))}
              </div>

              {/* Convocatoria */}
              <div className={`flex items-center gap-3 p-3.5 rounded-xl border mb-6 ${isComingSoon ? 'bg-amber-500/5 border-amber-500/20' : 'bg-primary/5 border-primary/20'}`}>
                <Calendar className={`w-5 h-5 flex-shrink-0 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{isComingSoon ? 'Disponibilidad' : 'Próxima convocatoria'}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {isComingSoon ? 'Próximamente · Te avisaremos' : 'Febrero 2026 · Consultar fechas'}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={isComingSoon ? "outline" : "hero"}
                size="lg"
                className={`w-full group text-base py-7 font-bold rounded-xl transition-all ${
                  isComingSoon 
                    ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/10' 
                    : 'shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                }`}
                onClick={onCTAClick}
              >
                {isComingSoon ? (
                  <>
                    <Bell className="w-5 h-5 mr-2" />
                    Avisarme Cuando Esté Lista
                  </>
                ) : (
                  <>
                    Reservar Mi Plaza Ahora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* ViaBill financing button */}
              {!isComingSoon && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-3 text-base py-6 font-semibold rounded-xl border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5 text-emerald-400 hover:text-emerald-300 group/vb"
                  onClick={async () => {
                    try {
                      toast.loading('Conectando con ViaBill...', { id: 'viabill' });
                      const { data, error } = await supabase.functions.invoke('viabill-checkout', {
                        body: {
                          amount: formation.price,
                          courseName: formation.title,
                          courseSlug: formation.slug,
                        },
                      });
                      if (error) throw error;
                      const url = data?.redirectUrl || data?.url;
                      if (url) {
                        toast.dismiss('viabill');
                        window.location.href = url;
                      } else {
                        throw new Error('No se recibió URL de pago');
                      }
                    } catch (err: any) {
                      toast.error('Error al iniciar el pago a plazos. Inténtalo de nuevo.', { id: 'viabill' });
                      console.error('ViaBill error:', err);
                    }
                  }}
                >
                  💳 Pagar a Plazos con ViaBill
                </Button>
              )}

              {/* Social proof / urgency */}
              <div className="mt-5 space-y-3">
                {isComingSoon ? (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                    <span className="text-amber-400 font-medium text-xs">Formación en preparación</span>
                  </div>
                ) : (
                  <>
                    {/* Spots bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Plazas ocupadas</span>
                        <span className="text-primary font-bold">2 de 3</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000"
                          style={{ width: isVisible ? '66%' : '0%' }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span className="text-green-400 font-semibold">1 plaza libre</span>
                      </div>
                      <span className="text-border">·</span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                        <span>+500 alumnos formados</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
