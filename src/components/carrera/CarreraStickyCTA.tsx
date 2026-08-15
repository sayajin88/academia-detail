import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { carreraDetailingData, formatEuro } from '@/data/carreraDetailingData';

interface CarreraStickyCTAProps {
  onCTAClick: () => void;
}

/**
 * Mobile-only sticky bar with price + primary CTA.
 * Appears once the user scrolls past the hero.
 */
const CarreraStickyCTA = ({ onCTAClick }: CarreraStickyCTAProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShown(window.scrollY > window.innerHeight * 0.8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur-md px-4 py-3 transition-transform duration-300 ${
        isShown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-lg font-monument gold-gradient-text leading-none">
            {formatEuro(carreraDetailingData.price)} €
          </p>
          <p className="text-[11px] text-muted-foreground">
            Ahorras {formatEuro(carreraDetailingData.savings)} €
          </p>
        </div>
        <Button
          onClick={onCTAClick}
          className="h-11 px-5 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground font-bold"
        >
          Reservar plaza
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarreraStickyCTA;
