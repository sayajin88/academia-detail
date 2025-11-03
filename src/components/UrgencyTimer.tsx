import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [spotsLeft, setSpotsLeft] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 25 * 60; // Reset to 25 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSpotsLeft = async () => {
      const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'completed');
      
      if (!error && count !== null) {
        setSpotsLeft(Math.max(0, 10 - count));
      }
    };

    fetchSpotsLeft();
    const interval = setInterval(fetchSpotsLeft, 30000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="glass-intense border-red-500/50 shadow-glow animate-pulse-subtle">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
          <h3 className="text-white font-bold">¡PLAZAS LIMITADAS!</h3>
        </div>
        
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4 mb-4 border border-red-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">Cierre de inscripciones en:</span>
          </div>
          
          <div className="text-3xl font-black text-white mb-2">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          
          <div className="text-sm text-white/80 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Solo quedan <span className="font-bold text-red-400">{spotsLeft} de 10 plazas</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold gradient-text">€299</div>
            <div className="text-xs text-white/70">+ IVA Hoy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400 line-through">€999</div>
            <div className="text-xs text-white/70">+ IVA Normal</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">-70%</div>
            <div className="text-xs text-white/70">Descuento</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}