import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Euro, TrendingUp, Sparkles } from "lucide-react";

const valueBreakdown = [
  { 
    item: "Acceso completo a taller profesional equipado",
    value: "€150",
    icon: "🏭"
  },
  { 
    item: "8 horas de práctica supervisada con instructor experto",
    value: "€200",
    icon: "👨‍🏫"
  },
  { 
    item: "Todos los productos y materiales profesionales incluidos",
    value: "€100",
    icon: "🧴"
  },
  { 
    item: "Práctica real con vehículos de alta gama",
    value: "€80",
    icon: "🚗"
  },
  { 
    item: "Certificado de asistencia reconocido",
    value: "€50",
    icon: "📜"
  },
  { 
    item: "Acceso a comunidad privada de detailers",
    value: "€20/mes",
    icon: "👥"
  },
  { 
    item: "Comida y refrigerios durante la jornada",
    value: "Incluido",
    icon: "🍽️"
  }
];

export function ValueJustification() {
  return (
    <section className="py-24 bg-gradient-to-b from-black/30 to-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
            <span className="gradient-text font-bold uppercase tracking-wide">Desglose de Valor</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Por qué vale <span className="gradient-text">€599</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Desglose completo del valor real que recibes en La Jornada Cero
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="glass-intense border-primary/30 shadow-glow-intense">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                <Euro className="w-8 h-8 text-primary" />
                Inversión vs Valor Real
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {valueBreakdown.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 glass-card rounded-xl hover:border-primary/40 transition-all duration-300 hover-glow"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-white/90">{item.item}</span>
                    </div>
                  </div>
                  <div className="text-primary font-bold text-lg ml-4">
                    {item.value}
                  </div>
                </div>
              ))}

              {/* Total Value Section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="bg-gradient-primary/20 rounded-2xl p-8 border-2 border-primary/40">
                  <div className="grid md:grid-cols-3 gap-6 items-center text-center">
                    <div>
                      <div className="text-white/70 text-sm mb-2">VALOR TOTAL DEL MERCADO</div>
                      <div className="text-4xl font-black text-white line-through">€600+</div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative">
                        <div className="text-white/70 text-sm mb-2 flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          TÚ PAGAS HOY
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-5xl font-black gradient-text mb-2">€199</div>
                        <div className="text-white/70 text-sm">+ IVA</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-white/70 text-sm mb-2 flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        AHORRAS
                      </div>
                      <div className="text-4xl font-black text-green-400">67%</div>
                      <div className="text-white/70 text-sm">€400 de descuento</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency Badge */}
              <div className="text-center mt-6">
                <Badge className="bg-gradient-primary text-white px-6 py-2 text-base animate-pulse">
                  🔥 Precio de lanzamiento por tiempo limitado
                </Badge>
                <p className="text-white/60 text-sm mt-3">
                  Después de esta promoción, el precio será de €299 + IVA
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
