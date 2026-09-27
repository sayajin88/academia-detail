import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

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

  // Dispatch custom event so other floating bars can listen
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('cookie-banner-visibility', { detail: { visible } }));
  }, [visible]);

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
      className="fixed bottom-14 left-0 right-0 z-[52] px-3 pb-2 md:px-6 md:pb-3 animate-fade-in"
    >
      <div className="mx-auto max-w-2xl rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/30 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <Cookie className="h-5 w-5 text-brand flex-shrink-0 hidden sm:block" />
          <p className="flex-1 text-xs md:text-sm text-muted-foreground leading-snug">
            Usamos cookies para mejorar tu experiencia.{' '}
            <Link to="/politica-privacidad" className="text-brand hover:underline">
              Más info
            </Link>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={handleAccept} size="sm" className="text-xs h-8 px-3">
              Aceptar
            </Button>
            <Button onClick={handleDecline} variant="ghost" size="sm" className="text-xs h-8 px-2 text-muted-foreground">
              Rechazar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
