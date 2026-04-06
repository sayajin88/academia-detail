import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CONSENT_KEY = 'academia-detail-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      enableAnalytics();
    }
  }, []);

  const enableAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    enableAnalytics();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card/95 backdrop-blur-xl border-t border-border shadow-lg"
    >
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Usamos cookies propias y de Google Analytics para mejorar
            tu experiencia y analizar el tráfico.
            Puedes aceptarlas o rechazarlas.{' '}
            <Link
              to="/politica-privacidad"
              className="text-primary hover:underline"
            >
              Más información
            </Link>
          </p>
        </div>

        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 sm:hidden text-muted-foreground hover:text-foreground"
          aria-label="Cerrar aviso de cookies"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <Button onClick={handleAccept} size="sm">
            Aceptar
          </Button>
          <Button onClick={handleDecline} variant="outline" size="sm">
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  );
}
