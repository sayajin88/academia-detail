import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { valueArguments, services, processSteps, waLink } from "./marketingData";

export function MarketingValue() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          badge="Por qué importa"
          title="En este negocio se vende por los ojos"
          subtitle="Puedes tener el mejor acabado de tu ciudad. Si el cliente no lo ve antes de llamarte, no lo va a pagar."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valueArguments.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80} animation="fade-up">
              <article className="group h-full glass-card rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
                <span className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-primary transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketingServices() {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-muted/20 border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 marketing-grid opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <SectionHeading
          badge="Servicios"
          title="Todo lo que tu negocio necesita para verse grande"
          subtitle="Una dirección visual y digital coherente: desde la web hasta el logotipo de tu taller."
        />

        <AnimatedSection animation="fade-up" className="mb-10">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-primary/30 bg-card/50 backdrop-blur-sm p-6 md:p-10 overflow-hidden">
            <div className="absolute -inset-10 bg-primary/10 blur-3xl pointer-events-none" aria-hidden="true" />
            <img
              src={socialIllustration.url}
              alt="Estrategia de contenidos y redes sociales para un centro de detailing"
              width={1920}
              height={984}
              loading="lazy"
              decoding="async"
              className="relative w-full [filter:saturate(0.8)_contrast(1.05)] mix-blend-luminosity opacity-90 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
            />
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 70} animation="fade-up">
              <article className="marketing-card group relative h-full rounded-2xl border border-border/60 bg-card/70 p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-5">
                  <span className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground border border-border/60">
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const brandingItems = [
  "Logotipo profesional y versiones para todos los usos",
  "Paleta de colores y tipografías propias",
  "Rotulación de local y vehículo",
  "Plantillas para Instagram, TikTok y presupuestos",
  "Manual de marca para que todo sea coherente",
];

export function MarketingBranding() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/30">
              Identidad de marca
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Un logotipo no es un dibujo. Es tu <span className="gradient-text">precio por hora</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              La imagen de tu empresa es lo primero que ve un cliente que no te conoce. Trabajamos
              tu identidad completa para que tu negocio transmita el nivel de trabajo que realmente
              haces.
            </p>
            <ul className="space-y-3 mb-8">
              {brandingItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <a
                href={waLink("Hola, me interesa el diseño de logotipo e identidad de marca para mi negocio de detailing.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir presupuesto de marca
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="slide-right" delay={120}>
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { title: "Antes", text: "Logo genérico, fotos oscuras, sin web. El cliente regatea el precio." },
                  { title: "Después", text: "Marca reconocible, fotos cuidadas y web propia. El cliente acepta el presupuesto." },
                ].map((block, i) => (
                  <div
                    key={block.title}
                    className={`glass-card rounded-2xl p-6 border ${
                      i === 1 ? "border-primary/40 animate-glow-border" : "border-border/60"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        i === 1 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {block.title}
                    </span>
                    <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export function MarketingProcess() {
  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y border-border/60">
      <div className="container">
        <SectionHeading
          badge="Cómo trabajamos"
          title="De la primera conversación a tu web publicada"
          subtitle="Un proceso simple y sin tecnicismos. Tú te centras en los coches."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 90} animation="fade-up">
              <div className="relative h-full rounded-2xl border border-border/60 bg-card/70 p-6 overflow-hidden">
                <span className="absolute -top-3 -right-2 text-6xl font-black text-primary/10 select-none">
                  {step.step}
                </span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
