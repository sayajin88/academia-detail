import { ReactNode, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { whatsappLink } from '@/data/site';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';

interface MainLayoutProps {
  children: ReactNode;
  /** Oculta el botón flotante de WhatsApp (p. ej. si la página ya tiene una barra fija propia) */
  hideWhatsApp?: boolean;
}

export function MainLayout({ children, hideWhatsApp = false }: MainLayoutProps) {
  // El aviso de cookies ocupa la parte baja en móvil: mientras se ve, el botón de WhatsApp se aparta.
  const [cookieBanner, setCookieBanner] = useState(
    () => typeof window !== 'undefined' && Boolean((window as Window & { __cookieBannerVisible?: boolean }).__cookieBannerVisible)
  );
  useEffect(() => {
    const onChange = (e: Event) => setCookieBanner(Boolean((e as CustomEvent<{ visible: boolean }>).detail?.visible));
    window.addEventListener('cookie-banner-visibility', onChange);
    return () => window.removeEventListener('cookie-banner-visibility', onChange);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enlace para saltar al contenido (teclado y lectores de pantalla) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 md:pt-[72px]">
        {children}
      </main>
      <Footer />
      {!hideWhatsApp && !cookieBanner && (
        <a
          href={whatsappLink('Hola, quiero información sobre los cursos de Academia Detail.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 md:bottom-6 md:right-6"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
    </div>
  );
}
