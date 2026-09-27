import { useState, useEffect } from "react";
import { X, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center animate-fade-in">
      <Card className="glass-intense border-primary/50 shadow-glow-intense max-w-lg mx-4 animate-scale-in">
        <CardContent className="p-8 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              ¡ESPERA! Oferta Exclusiva
            </h3>
            <p className="text-white/90 mb-6">
              Antes de irte, aprovecha este <strong>descuento del 40%</strong> válido solo por los próximos 15 minutos
            </p>

            <div className="bg-gradient-primary/20 rounded-xl p-4 mb-6 border border-primary/30">
              <div className="text-3xl font-black gradient-text mb-2">
                <span className="text-white/60 line-through text-xl mr-2">€599</span>
                €199 + IVA
              </div>
              <div className="text-sm text-white/80">Solo hasta las 23:59 de hoy</div>
            </div>

            <div className="space-y-2 text-left mb-6">
              {[
                "Reserva inmediata al evento exclusivo",
                "Certificación oficial incluida", 
                "Práctica en taller real",
                "Garantía de 30 días"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 text-brand" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full mb-4" asChild>
              <a href="/contacto">APROVECHAR OFERTA AHORA</a>
            </Button>

            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-white/80 ml-2">4.9/5 (329 reseñas)</span>
            </div>

            <p className="text-xs text-white/60">
              Esta oferta no se repetirá. Solo válida para nuevos estudiantes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}