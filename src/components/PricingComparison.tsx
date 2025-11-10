import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Star } from "lucide-react";

const pricingOptions = [
  {
    name: "Otras Academias",
    price: "€2,500+",
    period: "6-12 meses",
    popular: false,
    features: [
      { text: "Clases teóricas largas", included: true },
      { text: "Práctica limitada", included: true },
      { text: "Horarios rígidos", included: false },
      { text: "Certificación básica", included: true },
      { text: "Sin soporte post-curso", included: false },
      { text: "Material no incluido", included: false },
      { text: "Enfoque generalista", included: true },
      { text: "Sin garantía", included: false }
    ],
    cta: "Muy Caro",
    variant: "outline" as const
  },
  {
    name: "La Jornada Cero",
    price: "€199",
    originalPrice: "€499",
    period: "+ IVA (1 día)",
    popular: true,
    features: [
      { text: "Formación intensiva práctica", included: true },
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
    price: "€0",
    period: "Indefinido",
    popular: false,
    features: [
      { text: "Videos de YouTube", included: true },
      { text: "Sin práctica supervisada", included: false },
      { text: "Información dispersa", included: false },
      { text: "Sin certificación", included: false },
      { text: "Sin soporte", included: false },
      { text: "Gastos en errores", included: false },
      { text: "Resultados inciertos", included: false },
      { text: "Tiempo ilimitado", included: false }
    ],
    cta: "Muy Lento",
    variant: "outline" as const
  }
];

export function PricingComparison() {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
            <span className="gradient-text font-bold uppercase tracking-wide">Comparación de Precios</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Por qué Detail Park es la <span className="gradient-text">mejor opción</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto">
            Compara nuestra propuesta con otras alternativas del mercado
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingOptions.map((option, index) => (
            <Card 
              key={index} 
              className={`relative ${
                option.popular 
                  ? 'glass-intense border-primary shadow-glow-intense scale-105' 
                  : 'glass-card border-white/10'
              } transition-all duration-300 hover-glow`}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-2 font-bold animate-pulse">
                    <Star className="w-4 h-4 mr-1" />
                    MÁS POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  {option.name}
                </CardTitle>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {option.originalPrice && (
                      <span className="text-lg text-red-400 line-through">
                        {option.originalPrice}
                      </span>
                    )}
                    <span className={`text-4xl font-black ${
                      option.popular ? 'gradient-text' : 'text-white'
                    }`}>
                      {option.price}
                    </span>
                  </div>
                  <div className="text-white/70 text-sm">{option.period}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-white' : 'text-white/50'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={option.variant}
                  size="lg" 
                  className="w-full mt-6"
                  disabled={option.variant === "outline"}
                >
                  {option.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block glass-card px-6 py-3 rounded-xl">
            <p className="text-white/90">
              💡 <strong>Ahorra €300</strong> con el precio de lanzamiento - <span className="text-primary">Después será €299</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}