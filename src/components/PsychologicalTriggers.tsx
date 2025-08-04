import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  Eye,
  ShoppingCart,
  Star
} from "lucide-react";

export const PsychologicalTriggers = () => {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds
  const [spotsLeft, setSpotsLeft] = useState(23);
  const [recentPurchases, setRecentPurchases] = useState([
    { name: "Carlos M.", location: "Madrid", time: "hace 2 min" },
    { name: "Ana R.", location: "Barcelona", time: "hace 5 min" },
    { name: "Miguel S.", location: "Valencia", time: "hace 8 min" }
  ]);
  const [showPurchaseNotification, setShowPurchaseNotification] = useState(false);
  const [currentViewers, setCurrentViewers] = useState(247);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Spots scarcity simulation
    const spotsTimer = setInterval(() => {
      if (Math.random() < 0.3) {
        setSpotsLeft(prev => Math.max(prev - 1, 15));
      }
    }, 45000);

    return () => clearInterval(spotsTimer);
  }, []);

  useEffect(() => {
    // Live purchase notifications
    const purchaseTimer = setInterval(() => {
      const names = ["David G.", "Laura F.", "Roberto P.", "Sofia M.", "Andrés K.", "Carmen L."];
      const locations = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza"];
      
      const newPurchase = {
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: "hace 1 min"
      };

      setRecentPurchases(prev => [newPurchase, ...prev.slice(0, 2)]);
      setShowPurchaseNotification(true);

      setTimeout(() => setShowPurchaseNotification(false), 4000);
    }, 25000);

    return () => clearInterval(purchaseTimer);
  }, []);

  useEffect(() => {
    // Live viewers counter
    const viewersTimer = setInterval(() => {
      setCurrentViewers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(prev + change, 200);
      });
    }, 8000);

    return () => clearInterval(viewersTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Scarcity Indicator */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 animate-fade-in">
        <div className="glass-intense rounded-lg p-4 max-w-xs border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-white font-bold text-sm">¡Plazas Limitadas!</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black gradient-text">{spotsLeft}</div>
            <div className="text-white/80 text-xs">plazas restantes</div>
          </div>
          <div className="mt-3">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-1000 animate-pulse"
                style={{ width: `${(spotsLeft / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Viewers Indicator */}
      <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
        <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <Eye className="w-4 h-4 text-white/80" />
          <span className="text-white text-sm font-medium">{currentViewers}</span>
          <span className="text-white/70 text-xs">viendo</span>
        </div>
      </div>

      {/* Purchase Notification Popup */}
      {showPurchaseNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
          <Alert className="glass-intense border-primary/30 w-80">
            <ShoppingCart className="h-4 w-4 text-primary" />
            <AlertDescription className="text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{recentPurchases[0]?.name}</div>
                  <div className="text-white/70 text-sm">
                    {recentPurchases[0]?.location} • {recentPurchases[0]?.time}
                  </div>
                  <div className="text-primary text-sm font-medium">
                    Se unió a Detail Park ✅
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Urgency Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Countdown Timer */}
            <div className="glass-intense rounded-2xl p-8 mb-8 animate-pulse-glow">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-primary animate-pulse" />
                <Badge variant="destructive" className="animate-bounce">OFERTA LIMITADA</Badge>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Esta oferta desaparece en:
              </h3>
              
              <div className="text-4xl md:text-6xl font-black gradient-text mb-4 animate-glow-pulse">
                {formatTime(timeLeft)}
              </div>
              
              <p className="text-white/80 mb-6">
                Después de este tiempo, el precio vuelve a €197
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">€47</div>
                  <div className="text-white/70 text-sm">Precio Actual</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-white/60 line-through text-lg">€197</div>
                  <div className="text-white/70 text-sm">Precio Normal</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">76%</div>
                  <div className="text-white/70 text-sm">Descuento</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">{spotsLeft}</div>
                  <div className="text-white/70 text-sm">Plazas</div>
                </div>
              </div>

              <Button variant="hero" size="xl" className="animate-bounce hover:animate-none">
                <Zap className="w-5 h-5 mr-2" />
                Reservar Mi Plaza Ahora
              </Button>
            </div>

            {/* Social Proof Bar */}
            <div className="glass-card rounded-lg p-6">
              <h4 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Últimas inscripciones
              </h4>
              
              <div className="space-y-3">
                {recentPurchases.map((purchase, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {purchase.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{purchase.name}</div>
                        <div className="text-white/60 text-xs">{purchase.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary text-sm font-bold">Inscrito</div>
                      <div className="text-white/60 text-xs">{purchase.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9/5 puntuación</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span>89% éxito comprobado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-8">
              <span className="gradient-text">Garantía Total</span> de Satisfacción
            </h3>
            
            <div className="glass-intense rounded-2xl p-8 border-primary/30">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4">
                Garantía de Devolución de 30 Días
              </h4>
              
              <p className="text-white/80 mb-6">
                Si no estás 100% satisfecho con el curso o no ves resultados reales en 30 días, 
                te devolvemos tu dinero completo. Sin preguntas, sin complicaciones.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>30 días completos</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>100% del dinero</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Proceso automático</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};