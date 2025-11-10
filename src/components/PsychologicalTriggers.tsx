import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  CheckCircle,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const PsychologicalTriggers = () => {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds
  const [spotsLeft, setSpotsLeft] = useState(12);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch real spots left from database
    const fetchSpotsLeft = async () => {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'completed');
      
      if (!error && count !== null) {
        setSpotsLeft(Math.max(0, 12 - count));
      }
    };

    fetchSpotsLeft();
    const interval = setInterval(fetchSpotsLeft, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Main Urgency Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Countdown Timer */}
            <div className="glass-intense rounded-2xl p-8 mb-8 animate-pulse-glow">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-primary animate-pulse" />
                <Badge variant="destructive" className="animate-bounce">OFERTA DE LANZAMIENTO</Badge>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Precio de lanzamiento finaliza en:
              </h3>
              
              <div className="text-4xl md:text-6xl font-black gradient-text mb-4 animate-glow-pulse">
                {formatTime(timeLeft)}
              </div>
              
              <p className="text-white/80 mb-6">
                Después de este tiempo, el precio será de €299
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">€199</div>
                  <div className="text-white/70 text-sm">Precio Lanzamiento</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-white/60 line-through text-lg">€499</div>
                  <div className="text-white/70 text-sm">Precio Mercado</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">60%</div>
                  <div className="text-white/70 text-sm">Descuento</div>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <div className="text-primary font-bold text-lg">{spotsLeft}</div>
                  <div className="text-white/70 text-sm">Plazas Reales</div>
                </div>
              </div>

              <Button variant="hero" size="xl" className="animate-bounce hover:animate-none">
                <Zap className="w-5 h-5 mr-2" />
                Reservar Mi Plaza Ahora
              </Button>
            </div>

            {/* Real Spots Info */}
            <div className="glass-card rounded-lg p-6">
              <h4 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Disponibilidad Real
              </h4>
              
              <div className="space-y-3">
                <div className="text-white/90">
                  <div className="text-3xl font-black gradient-text mb-2">{spotsLeft} de 12</div>
                  <div className="text-sm text-white/70">plazas disponibles para el evento del 13 de Diciembre</div>
                </div>
                
                <div className="mt-4">
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-primary h-full transition-all duration-1000"
                      style={{ width: `${(spotsLeft / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  Las plazas se actualizan en tiempo real según las reservas confirmadas
                </p>
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
                Garantía de Satisfacción - 30 Días
              </h4>
              
              <p className="text-white/80 mb-6">
                Si asistes a La Jornada Cero y consideras que no cumplió tus expectativas, 
                tienes 30 días para solicitar el reembolso completo del coste de la formación.
              </p>
              
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Proceso simple: envía un email a <strong className="text-white">garantia@detailpark.com</strong> con tu número de inscripción</span>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Devolución procesada en 5-7 días hábiles</span>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Debes haber asistido al menos al 80% de la jornada</span>
                </div>
              </div>
              
              <div className="text-sm text-white/70 italic">
                Confiamos en la calidad de nuestra formación. Tu satisfacción es nuestra prioridad.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};