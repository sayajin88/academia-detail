import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { valueArguments, services, processSteps, waLink } from "./marketingData";
import socialIllustration from "@/assets/marketing/social.png.asset.json";
import inboundIllustration from "@/assets/marketing/inbound.png.asset.json";
import instalacionesPhoto from "@/assets/instalaciones-curso-ferrari.jpg";
import practicaPhoto from "@/assets/evento-practica-pulidora-real.jpg";
import beforeAfterPhoto from "@/assets/before-after-detailing.jpg";
import formacionPhoto from "@/assets/alumnos-formacion.jpg";
import mockupWeb1 from "@/assets/marketing/mockup-web-1.png.asset.json";
import mockupWeb2 from "@/assets/marketing/mockup-web-2.png.asset.json";
import mockupWeb3 from "@/assets/marketing/mockup-web-3.jpg.asset.json";

export function MarketingValue() {
  return (
    <section id="por-que" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          badge="Por qué importa"
          title="Por qué un centro de detailing necesita marketing digital"
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
          title="Servicios de marketing digital para detailing: web, SEO, GEO y marca"
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
    <section id="marca" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-left">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-primary/10 text-primary border border-primary/30">
              Identidad de marca
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Identidad de marca y logotipo para tu{" "}
              <span className="gradient-text">taller de detailing</span>
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
    <section id="proceso" className="py-16 md:py-24 bg-muted/20 border-y border-border/60">
      <div className="container">
        <SectionHeading
          badge="Cómo trabajamos"
          title="Cómo trabajamos: de la primera llamada a tu web publicada"
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

        <AnimatedSection animation="fade-up" delay={120} className="mt-12">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
            <img
              src={inboundIllustration.url}
              alt="Embudo de captación de clientes: web, email y seguimiento automatizado"
              width={1920}
              height={984}
              loading="lazy"
              decoding="async"
              className="relative w-full rounded-3xl border border-border/60 bg-card/40 p-4 md:p-8 [filter:saturate(0.8)_contrast(1.05)] mix-blend-luminosity opacity-90 hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const workPhotos = [
  {
    src: instalacionesPhoto,
    title: "Instalaciones reales",
    text: "Fotografía profesional de tu taller para que se vea el nivel al que trabajas.",
  },
  {
    src: practicaPhoto,
    title: "Proceso en acción",
    text: "Contenido de proceso: lo que más engancha y más confianza genera en redes.",
  },
  {
    src: beforeAfterPhoto,
    title: "Antes y después",
    text: "El formato que mejor convierte. Lo montamos y lo publicamos por ti.",
  },
  {
    src: formacionPhoto,
    title: "Equipo y marca",
    text: "Fotos de equipo y branding coherente en web, Google y redes sociales.",
  },
];

export function MarketingWork() {
  return (
    <section id="contenido" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading
          badge="Contenido propio"
          title="Contenido y fotografía profesional en tu taller"
          subtitle="No usamos bancos de imágenes: creamos el contenido en tu taller, con tus coches y tu equipo."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workPhotos.map((photo, i) => (
            <AnimatedSection key={photo.title} delay={i * 80} animation="fade-up">
              <figure className="group relative h-full rounded-2xl overflow-hidden border border-border/60">
                <img
                  src={photo.src}
                  alt={`${photo.title} — marketing digital para centros de detailing`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" aria-hidden="true" />
                <figcaption className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="text-base font-semibold text-foreground mb-1">{photo.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{photo.text}</p>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketingShowcase() {
  return (
    <section id="disenos" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <SectionHeading
          badge="Trabajos de referencia"
          title="Diseño web para detailing: así se ve una web que convierte"
          subtitle="Diseño oscuro, foto grande, servicios claros y el botón de contacto siempre a mano. Ni plantillas genéricas ni webs de folleto."
        />

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6 items-center">
          <AnimatedSection animation="fade-up">
            <figure className="relative">
              <div className="absolute inset-8 bg-primary/20 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
              <img
                src={mockupWeb1.url}
                alt="Mockups de una web de detailing y PPF con diseño oscuro y acentos rojos"
                loading="lazy"
                decoding="async"
                className="relative w-full drop-shadow-2xl"
              />
              <figcaption className="mt-4 text-sm text-muted-foreground text-center lg:text-left">
                Web multi-sección: servicios, galería de trabajos y llamada a la acción en cada pantalla.
              </figcaption>
            </figure>
          </AnimatedSection>

          <div className="grid gap-6">
            <AnimatedSection animation="fade-up" delay={100}>
              <figure className="relative">
                <div className="absolute inset-10 bg-primary/15 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
                <img
                  src={mockupWeb2.url}
                  alt="Pantalla de packs de PPF mostrada en un monitor de escritorio"
                  loading="lazy"
                  decoding="async"
                  className="relative w-full drop-shadow-2xl"
                />
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  Packs de servicio explicados con precio, alcance y presupuesto en un clic.
                </figcaption>
              </figure>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={180}>
              <figure className="relative rounded-2xl overflow-hidden border border-border/60">
                <img
                  src={mockupWeb3.url}
                  alt="Diseño de página de automoción con secciones de producto y galería"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
                <figcaption className="p-4 text-sm text-muted-foreground bg-card/70">
                  Jerarquía visual tipo marca de automoción: producto grande, texto justo y contraste alto.
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild className="shadow-primary">
            <a
              href={waLink("Hola, quiero una web como las que mostráis para mi centro de detailing.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quiero una web así
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
