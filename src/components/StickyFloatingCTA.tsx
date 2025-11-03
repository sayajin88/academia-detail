import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StickyFloatingCTAProps {
  onCtaClick?: () => void;
}

export function StickyFloatingCTA({ onCtaClick }: StickyFloatingCTAProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(12);

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
        setSpotsLeft(Math.max(0, 12 - count));
      }
    };

    fetchSpotsLeft();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchSpotsLeft, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 z-50 animate-slide-in-right">
      <div className="glass-intense rounded-xl md:rounded-2xl p-3 md:p-4 border border-primary/30 shadow-glow md:max-w-sm mx-auto md:mx-0">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-white text-xs md:text-sm font-semibold truncate">La Jornada Cero - Evento Exclusivo</span>
        </div>
        
        <div className="text-center mb-3 md:mb-4">
          <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
            <span className="text-white/60 line-through text-base mr-2">€999</span>
            €199 + IVA
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-white/80">
            <Users className="w-3 h-3 flex-shrink-0" />
            <span>Solo quedan {spotsLeft} de 12 plazas</span>
          </div>
        </div>

        <Button variant="hero" size="sm" className="w-full group text-sm md:text-base" onClick={onCtaClick}>
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:animate-bounce" />
          RESERVAR PLAZA
        </Button>
      </div>
    </div>
  );
}