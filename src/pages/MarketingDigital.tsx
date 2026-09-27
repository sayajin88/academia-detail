import { lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { MarketingHero } from '@/components/marketing/MarketingHero';

// Por debajo de la primera pantalla: carga diferida para no retrasar el LCP.
const sections = () => import('@/components/marketing/MarketingSections');
const MarketingFunnel = lazy(() => sections().then((m) => ({ default: m.MarketingFunnel })));
const MarketingServices = lazy(() => sections().then((m) => ({ default: m.MarketingServices })));
const MarketingShowcase = lazy(() => sections().then((m) => ({ default: m.MarketingShowcase })));
const MarketingProcess = lazy(() => sections().then((m) => ({ default: m.MarketingProcess })));
const MarketingFaq = lazy(() => sections().then((m) => ({ default: m.MarketingFaq })));
const MarketingLinks = lazy(() => sections().then((m) => ({ default: m.MarketingLinks })));
const MarketingPacks = lazy(() => import('@/components/marketing/MarketingPacks').then((m) => ({ default: m.MarketingPacks })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

const MarketingDigital = () => {
  return (
    <>
      <SEO {...seoConfig.marketingDigital} />
      <MainLayout>
        <MarketingHero />
        <Suspense fallback={<Placeholder />}>
          <MarketingFunnel />
          <MarketingServices />
          <MarketingShowcase />
          <MarketingPacks />
          <MarketingProcess />
          <MarketingFaq />
          <MarketingLinks />
          <CtaBand
            title="¿Qué pack encaja con tu centro?"
            text="Cuéntanos en un mensaje qué haces y dónde estás, y te decimos qué pack encaja mejor y qué puedes esperar. Sin compromiso."
            whatsappText="Hola, quiero información sobre los servicios de marketing digital para mi negocio de detailing."
            primaryLabel="Enviar una consulta"
            primaryHref="/contacto?curso=general"
          />
        </Suspense>
      </MainLayout>
    </>
  );
};

export default MarketingDigital;
