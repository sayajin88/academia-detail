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
    <>
      {/* Desktop CTA */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50 animate-slide-in-right">
        <div className="glass-intense rounded-2xl p-4 border border-primary/30 shadow-glow max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
            <span className="text-white text-sm font-semibold truncate">La Jornada Cero - Evento Exclusivo</span>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-2xl font-bold gradient-text mb-1">
              <span className="text-white/60 line-through text-base mr-2">€599</span>
              €97 + IVA
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-white/80">
              <Users className="w-3 h-3 flex-shrink-0" />
              <span>Plazas cerradas · Próxima fecha por confirmar</span>
            </div>
          </div>

          <Button variant="hero" size="sm" className="w-full group text-base" onClick={onCtaClick}>
            <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Avísame cuando abran plazas
          </Button>
        </div>
      </div>

      {/* Mobile Sticky CTA - Compact bar at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-primary/30 shadow-2xl" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-xs truncate">Jornada Zero</p>
            <div className="flex items-center gap-2">
              <p className="text-brand text-base font-black">€97 + IVA</p>
              <span className="text-xs text-white/50 line-through">€599</span>
            </div>
          </div>
          <Button variant="hero" size="sm" className="shrink-0 min-h-[44px] px-5" onClick={onCtaClick}>
            Avísame
          </Button>
        </div>
      </div>
    </>
  );
}