import { MainLayout } from '@/components/layout/MainLayout';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutHistory } from '@/components/about/AboutHistory';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutStats } from '@/components/about/AboutStats';
import { AboutGallerySection } from '@/components/about/AboutGallerySection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JornadaZeroSection } from '@/components/shared/JornadaZeroSection';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import detailParkLogo from '@/assets/detail-park-logo.webp';

export default function AboutUs() {
  return (
    <>
      <SEO {...seoConfig.aboutUs} />
      <MainLayout>
        {/* Hero Section */}
        <AboutHero />

        {/* Detail Park Logo Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
          <div className="container flex flex-col items-center gap-4">
            <img
              src={detailParkLogo}
              alt="Detail Park - Empresa que potencia Academia Detail"
              className="h-20 md:h-28 lg:h-36 w-auto object-contain"
              loading="lazy"
            />
            <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
              Academia Detail está potenciada por{' '}
              <a
                href="https://www.detailpark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Detail Park
              </a>
              , referente en Detailing profesional desde 2017.
            </p>
          </div>
        </section>

        {/* History Timeline */}
        <AboutHistory />

        {/* Philosophy / Differentiators */}
        <AboutPhilosophy />

        {/* Stats Section */}
        <AboutStats />

        {/* Gallery Section */}
        <AboutGallerySection />

        {/* Jornada Zero Section */}
        <JornadaZeroSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para Aprender de los que Viven del Detailing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a nuestra academia y aprende de profesionales que trabajan en el taller cada día.
              Formación real, en entorno real, con resultados reales.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/">
                Ver Formaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
