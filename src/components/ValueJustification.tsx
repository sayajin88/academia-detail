import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Euro, TrendingUp, Sparkles, Gift } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const valueBreakdown = [
  { 
    item: "Acceso completo a taller profesional equipado",
    value: 150,
    displayValue: "€150",
    icon: "🏭"
  },
  { 
    item: "8 horas de práctica supervisada con instructor experto",
    value: 200,
    displayValue: "€200",
    icon: "👨‍🏫"
  },
  { 
    item: "Todos los productos y materiales profesionales incluidos",
    value: 100,
    displayValue: "€100",
    icon: "🧴"
  },
  { 
    item: "Práctica real con vehículos de alta gama",
    value: 80,
    displayValue: "€80",
    icon: "🚗"
  },
  { 
    item: "Certificado de asistencia reconocido",
    value: 50,
    displayValue: "€50",
    icon: "📜"
  },
  { 
    item: "Acceso a comunidad privada de detailers",
    value: 20,
    displayValue: "€20/mes",
    icon: "👥"
  },
  { 
    item: "Comida y refrigerios durante la jornada",
    value: 0,
    displayValue: "Incluido",
    icon: "🍽️"
  }
];

const totalValue = valueBreakdown.reduce((acc, item) => acc + item.value, 0);

interface ValueItemProps {
  item: typeof valueBreakdown[0];
  index: number;
  isVisible: boolean;
}

function ValueItem({ item, index, isVisible }: ValueItemProps) {
  return (
    <div 
      className={`value-item flex items-center justify-between p-4 glass-card rounded-xl hover:border-primary/40 transition-all duration-300 hover-glow group`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: isVisible ? undefined : 0,
        animationPlayState: isVisible ? 'running' : 'paused'
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
        <div className="flex items-center gap-2">
          <CheckCircle className={`w-5 h-5 text-primary flex-shrink-0 feature-check stagger-${index + 1}`} 
            style={{ animationDelay: `${index * 100 + 200}ms` }}
          />
          <span className="text-white/90 group-hover:text-white transition-colors">{item.item}</span>
        </div>
      </div>
      <div className="text-primary font-bold text-lg ml-4 group-hover:scale-110 transition-transform">
        {item.displayValue}
      </div>
    </div>
  );
}

export function ValueJustification() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { count: totalCount, ref: totalRef } = useCountUp(totalValue, 2000);
  const { count: priceCount, ref: priceRef } = useCountUp(199, 1500);
  const { count: savingsCount } = useCountUp(67, 1500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Show total after all items have animated
          setTimeout(() => setShowTotal(true), valueBreakdown.length * 100 + 500);
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-black/30 to-black/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8 shimmer-badge">
            <span className="gradient-text font-bold uppercase tracking-wide flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Desglose de Valor
              <Gift className="w-5 h-5" />
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Por qué vale <span className="gradient-text">€599</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Desglose completo del valor real que recibes en La Jornada Cero
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className={`glass-intense border-primary/30 transition-all duration-500 ${isVisible ? 'urgent-glow' : ''}`}>
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                <Euro className="w-8 h-8 text-primary animate-pulse" />
                Inversión vs Valor Real
              </CardTitle>
              
              {/* Progress bar showing value accumulation */}
              <div className="mt-4 max-w-md mx-auto">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-primary to-primary-glow rounded-full progress-fill`}
                    style={{ 
                      animationPlayState: isVisible ? 'running' : 'paused',
                      animationDuration: `${valueBreakdown.length * 0.1 + 0.5}s`
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {valueBreakdown.map((item, index) => (
                <ValueItem 
                  key={index} 
                  item={item} 
                  index={index}
                  isVisible={isVisible}
                />
              ))}

              {/* Total Value Section */}
              <div className={`mt-8 pt-6 border-t border-white/10 transition-all duration-700 ${showTotal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 border-2 border-primary/40 gradient-border-animated relative overflow-hidden">
                  {/* Sparkle decorations */}
                  <Sparkles className="absolute top-4 left-4 w-6 h-6 text-primary/40 animate-pulse" />
                  <Sparkles className="absolute bottom-4 right-4 w-6 h-6 text-primary/40 animate-pulse" />
                  
                  <div className="grid md:grid-cols-3 gap-6 items-center text-center">
                    <div ref={totalRef} className="relative">
                      <div className="text-white/70 text-sm mb-2 uppercase tracking-wide">Valor Total del Mercado</div>
                      <div className="text-4xl font-black text-white/50 line-through">
                        €{totalCount}+
                      </div>
                    </div>
                    
                    <div className="relative" ref={priceRef}>
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                      <div className="relative celebration-dots">
                        <div className="text-white/70 text-sm mb-2 flex items-center justify-center gap-2 uppercase tracking-wide">
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                          TÚ PAGAS HOY
                          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                        <div className="text-6xl font-black gradient-text mb-2 price-animate discount-badge-3d">
                          €{priceCount}
                        </div>
                        <div className="text-white/70 text-sm">+ IVA</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-white/70 text-sm mb-2 flex items-center justify-center gap-2 uppercase tracking-wide">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        AHORRAS
                      </div>
                      <div className="text-5xl font-black text-green-400 price-animate">
                        {savingsCount}%
                      </div>
                      <div className="text-white/70 text-sm">€400 de descuento</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency Badge */}
              <div className="text-center mt-8">
                <Badge className="shimmer-badge bg-gradient-to-r from-primary via-primary-glow to-primary text-white px-8 py-3 text-base font-bold shadow-lg shadow-primary/30">
                  🔥 Precio de lanzamiento por tiempo limitado
                </Badge>
                <p className="text-white/60 text-sm mt-4">
                  Después de esta promoción, el precio será de <span className="text-primary font-semibold">€299 + IVA</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
