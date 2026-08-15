import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Globe, Search, Bot } from "lucide-react";
import { waLink } from "./marketingData";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const pills = [
  { icon: Globe, label: "Web", value: "Conversión" },
  { icon: Search, label: "SEO", value: "Visibilidad" },
  { icon: Bot, label: "GEO para IA", value: "Nuevo canal" },
];

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 marketing-aurora" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 marketing-grid opacity-[0.18]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden="true" />

      <div className="container relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Marketing digital para centros de detailing
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-[1.05] text-foreground mb-6">
            Tu trabajo es espectacular.
            <span className="block gradient-text marketing-shine">Que tu marca también lo sea.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10">
            Diseño web, SEO, posicionamiento en buscadores de IA e identidad de marca para
            detailers que quieren vivir de esto. Más visibilidad, más confianza y más
            clientes escribiéndote por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Button size="lg" asChild className="w-full sm:w-auto text-base shadow-primary">
              <a
                href={waLink("Hola, me interesa el servicio de marketing digital para mi negocio de detailing.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Hablar por WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
              <a href="#packs">
                Ver packs y precios
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Floating pills */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto lg:mx-0">
            {pills.map((pill, i) => (
              <div
                key={pill.label}
                className="glass-card rounded-xl px-5 py-4 flex items-center gap-3 border border-border/60 animate-float-gentle"
                style={{ animationDelay: `${i * 600}ms` }}
              >
                <span className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <pill.icon className="w-5 h-5 text-primary" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-foreground">{pill.label}</span>
                  <span className="block text-xs text-muted-foreground">{pill.value}</span>
                </span>
              </div>
            ))}
          </div>
          </div>

          {/* Hero illustration */}
          <div className="relative order-first lg:order-none">
            <div className="absolute inset-6 bg-primary/25 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
            <img
              src={heroIllustration.url}
              alt="Estrategia de marketing digital y redes sociales para centros de detailing"
              width={1080}
              height={960}
              loading="eager"
              decoding="async"
              className="relative w-full max-w-md mx-auto animate-float-gentle drop-shadow-2xl [filter:saturate(0.85)_contrast(1.05)] mix-blend-luminosity opacity-95 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
