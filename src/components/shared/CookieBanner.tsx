import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    (window as Window & { __cookieBannerVisible?: boolean }).__cookieBannerVisible = visible;
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
      className="fixed inset-x-3 bottom-3 z-[52] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="rounded-xl border border-border bg-card p-4 shadow-2xl shadow-black/40">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Usamos cookies de analítica para saber qué páginas se visitan. Solo se activan si las aceptas.{' '}
          <Link to="/politica-privacidad" className="text-brand underline underline-offset-4">
            Más información sobre cookies
          </Link>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button onClick={handleDecline} variant="outline" size="sm" className="h-10 font-semibold">
            Rechazar
          </Button>
          <Button onClick={handleAccept} size="sm" className="h-10 font-semibold">
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
