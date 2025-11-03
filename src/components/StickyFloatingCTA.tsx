import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StickyFloatingCTAProps {
  onCtaClick?: () => void;
}

export function StickyFloatingCTA({ onCtaClick }: StickyFloatingCTAProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 800;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchSpotsLeft, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className="glass-intense rounded-2xl p-4 border border-primary/30 shadow-glow max-w-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-semibold">La Jornada Cero - Evento Exclusivo</span>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-2xl font-bold gradient-text mb-1">€999 → €299 + IVA</div>
          <div className="flex items-center justify-center gap-1 text-xs text-white/80">
            <Users className="w-3 h-3" />
            <span>Solo quedan {spotsLeft} de 10 plazas</span>
          </div>
        </div>

        <Button variant="hero" size="sm" className="w-full group" onClick={onCtaClick}>
          <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          RESERVAR PLAZA
        </Button>
      </div>
    </div>
  );
}