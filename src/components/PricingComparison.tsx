import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Star, Sparkles, Zap, Users } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const pricingOptions = [
  {
    name: "Otras Academias",
    price: 2500,
    priceDisplay: "€2,500+",
    period: "6-12 meses",
    popular: false,
    features: [
      { text: "Clases teóricas largas", included: true },
      { text: "Práctica limitada", included: true },
      { text: "Horarios rígidos", included: false },
      { text: "Certificación básica", included: true },
      { text: "Sin soporte post-evento", included: false },
      { text: "Material no incluido", included: false },
      { text: "Enfoque generalista", included: true },
      { text: "Sin garantía", included: false }
    ],
    cta: "Muy Caro",
    variant: "outline" as const
  },
  {
    name: "La Jornada Cero",
    price: 199,
    priceDisplay: "€199",
    originalPrice: "€599",
    period: "+ IVA (1 día)",
    popular: true,
    features: [
      { text: "Práctica intensiva de 1 día", included: true },
      { text: "Acceso completo al taller", included: true },
      { text: "Horarios flexibles", included: true },
      { text: "Certificación profesional", included: true },
      { text: "Soporte de por vida", included: true },
      { text: "Todo el material incluido", included: true },
      { text: "Enfoque en resultados", included: true },
      { text: "Garantía 30 días", included: true }
    ],
    cta: "¡EMPEZAR AHORA!",
    variant: "hero" as const
  },
  {
    name: "Autodidacta",
    price: 0,
    priceDisplay: "€0",
    period: "Indefinido",
    popular: false,
    features: [
      { text: "Videos de YouTube", included: true },
      { text: "Sin práctica supervisada", included: false },
      { text: "Información dispersa", included: false },
      { text: "Sin certificación", included: false },
      { text: "Sin soporte post-evento", included: false },
      { text: "Gastos en errores", included: false },
      { text: "Resultados inciertos", included: false },
      { text: "Tiempo ilimitado", included: false }
    ],
    cta: "Muy Lento",
    variant: "outline" as const
  }
];

interface PricingCardProps {
  option: typeof pricingOptions[0];
  index: number;
  isVisible: boolean;
}

function PricingCard({ option, index, isVisible }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { count: priceCount, ref: priceRef } = useCountUp(option.price, 1500);

  // Spotlight effect
  useEffect(() => {
    const card = cardRef.current;
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
    <div 
      ref={cardRef}
      className={`card-entrance ${isVisible ? 'visible' : ''} pricing-spotlight`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Card 
        className={`relative h-full transition-all duration-500 ${
          option.popular 
            ? 'gradient-border-animated popular-card scale-105 z-10' 
            : 'glass-card border-white/10 hover:border-white/20'
        }`}
      >
        {option.popular && (
          <>
            {/* Glow effect behind popular card */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10" />
            
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <Badge className="shimmer-badge bg-gradient-to-r from-primary via-primary-glow to-primary text-white px-6 py-2.5 font-bold shadow-lg shadow-primary/30">
                <Star className="w-4 h-4 mr-2 animate-pulse" />
                MÁS POPULAR
                <Star className="w-4 h-4 ml-2 animate-pulse" />
              </Badge>
            </div>
          </>
        )}

        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className={`text-2xl font-bold mb-4 ${option.popular ? 'gradient-text' : 'text-white'}`}>
            {option.name}
          </CardTitle>
          
          <div className="space-y-3" ref={priceRef}>
            <div className="flex items-center justify-center gap-3">
              {option.originalPrice && (
                <span className="text-lg text-red-400 line-through opacity-70">
                  {option.originalPrice}
                </span>
              )}
              <span className={`text-5xl font-black price-animate ${
                option.popular ? 'gradient-text' : 'text-white'
              }`}>
                {option.popular ? `€${priceCount}` : option.priceDisplay}
              </span>
            </div>
            <div className="text-white/60 text-sm font-medium">{option.period}</div>
            
            {option.popular && (
              <div className="flex items-center justify-center gap-2 text-brand text-sm font-semibold">
                <Zap className="w-4 h-4" />
                <span>Ahorro de €400</span>
                <Zap className="w-4 h-4" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pb-8">
          <div className="space-y-3">
            {option.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className={`flex items-center gap-3 feature-check stagger-${featureIndex + 1}`}
                style={{ animationDelay: `${(index * 150) + (featureIndex * 50)}ms` }}
              >
                {feature.included ? (
                  <div className="relative">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${option.popular ? 'text-brand' : 'text-brand/70'}`} />
                    {option.popular && (
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm -z-10" />
                    )}
                  </div>
                ) : (
                  <X className="w-5 h-5 text-red-400/70 flex-shrink-0" />
                )}
                <span className={`text-sm ${
                  feature.included 
                    ? option.popular ? 'text-white font-medium' : 'text-white/80' 
                    : 'text-white/40'
                }`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <Button 
            variant={option.variant}
            size="lg" 
            className={`w-full mt-8 ripple-button ${
              option.popular 
                ? 'shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300' 
                : ''
            }`}
            disabled={option.variant === "outline"}
          >
            {option.popular && <Sparkles className="w-4 h-4 mr-2" />}
            {option.cta}
            {option.popular && <Sparkles className="w-4 h-4 ml-2" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function PricingComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewingCount] = useState(Math.floor(Math.random() * 5) + 3);

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
    <section ref={sectionRef} className="py-24 bg-black/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8 shimmer-badge">
            <span className="gradient-text font-bold uppercase tracking-wide">Comparación de Precios</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Por qué Detail Park es la <span className="gradient-text">mejor opción</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto">
            Compara nuestra propuesta con otras alternativas del mercado
          </p>
          
          {/* People viewing indicator */}
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/60 to-primary border-2 border-background" />
              ))}
            </div>
            <Users className="w-4 h-4 text-brand" />
            <span className="text-white/80 text-sm">
              <span className="text-brand font-semibold">{viewingCount}</span> personas viendo esto ahora
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {pricingOptions.map((option, index) => (
            <PricingCard 
              key={index} 
              option={option} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block glass-card px-6 py-4 rounded-xl urgent-glow">
            <p className="text-white/90 text-lg">
              💡 <strong className="text-brand">Ahorra €300</strong> con el precio de lanzamiento - 
              <span className="text-brand ml-1">Después será €299</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
