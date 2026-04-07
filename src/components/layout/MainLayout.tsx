import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ViaBillFinancingBar } from '@/components/shared/ViaBillFinancingBar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip navigation link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main role="main" id="main-content" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}