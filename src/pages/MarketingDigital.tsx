import { MainLayout } from "@/components/layout/MainLayout";
import { SEO } from "@/components/SEO";
import { seoConfig } from "@/utils/seoConfig";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import {
  MarketingValue,
  MarketingServices,
  MarketingBranding,
  MarketingProcess,
  MarketingWork,
  MarketingShowcase,
} from "@/components/marketing/MarketingSections";
import { MarketingPacks } from "@/components/marketing/MarketingPacks";
import { marketingFaqs, waLink } from "@/components/marketing/marketingData";

const MarketingDigital = () => {
  return (
    <>
      <SEO {...seoConfig.marketingDigital} />
      <MainLayout>
        <MarketingHero />
        <MarketingValue />
        <MarketingServices />
        <MarketingShowcase />
        <MarketingPacks />
        <MarketingBranding />
        <MarketingWork />
        <MarketingProcess />

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <SectionHeading badge="Dudas frecuentes" title="Preguntas frecuentes" />
            <Accordion type="single" collapsible className="w-full">
              {marketingFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`} className="border-border/60">
                  <AccordionTrigger className="text-left text-base font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden border-t border-border/60">
          <div className="absolute inset-0 -z-10 marketing-aurora opacity-80" aria-hidden="true" />
          <div className="container relative text-center max-w-3xl">
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
                Que tu marca hable de ti <span className="gradient-text">antes de que llegues</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-9">
                Cuéntanos en un mensaje qué haces y dónde estás. Te decimos qué pack encaja mejor y
                qué resultados puedes esperar. Sin compromiso.
              </p>
              <Button size="lg" asChild className="text-base shadow-primary">
                <a
                  href={waLink("Hola, quiero información sobre los servicios de marketing digital para mi negocio de detailing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar por WhatsApp
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default MarketingDigital;
