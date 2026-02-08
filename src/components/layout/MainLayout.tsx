import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SoyNuevoButton } from '@/components/shared/SoyNuevoButton';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main role="main" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <SoyNuevoButton />
    </div>
  );
}