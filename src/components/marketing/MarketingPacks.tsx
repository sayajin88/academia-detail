import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";
import { webPacks, growthPacks, waLink, type Pack } from "./marketingData";

function PackCard({ pack, index }: { pack: Pack; index: number }) {
  return (
    <AnimatedSection delay={index * 100} animation="fade-up" className="h-full">
      <article
        className={`marketing-card relative h-full rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-300 ${
          pack.popular
            ? "border border-primary/50 bg-card shadow-primary hover:-translate-y-1"
            : "border border-border/60 bg-card/70 hover:border-primary/30 hover:-translate-y-1"
        }`}
      >
        {pack.popular && (
          <div className="absolute -inset-16 bg-primary/10 blur-3xl pointer-events-none" aria-hidden="true" />
        )}

        <div className="relative">
          {pack.badge && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-5 ${
                pack.popular
                  ? "bg-primary text-primary-foreground animate-badge-pulse"
                  : "bg-foreground/5 text-muted-foreground border border-border/60"
              }`}
            >
              {pack.popular && <Sparkles className="w-3 h-3" />}
              {pack.badge}
            </span>
          )}

          <h3 className="text-2xl font-bold text-foreground mb-1">{pack.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{pack.subtitle}</p>

          <div className="flex items-end gap-3 mb-1">
            <span className={`text-5xl font-black ${pack.popular ? "gradient-text" : "text-foreground"}`}>
              {pack.price}
            </span>
            <span className="text-lg text-muted-foreground line-through mb-1.5">{pack.oldPrice}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-7">Precio sin IVA · pago único</p>

          <ul className="space-y-3 mb-8">
            {pack.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            variant={pack.popular ? "default" : "outline"}
            className="w-full"
            asChild
          >
            <a
              href={waLink(`Hola, me interesa el pack "${pack.name}" (${pack.price} sin IVA).`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Me interesa este pack
            </a>
          </Button>
        </div>
      </article>
    </AnimatedSection>
  );
}

export function MarketingPacks() {
  return (
    <section id="packs" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          badge="Packs de página web"
          title="Elige el punto de partida de tu presencia digital"
          subtitle="Precios de lanzamiento para alumnos y centros de detailing. Todos los precios son sin IVA."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
          {webPacks.map((pack, i) => (
            <PackCard key={pack.id} pack={pack} index={i} />
          ))}
        </div>

        {/* Growth packs */}
        <div className="mt-20 md:mt-28">
          <SectionHeading
            badge="Potencia y posicionamiento"
            title="Ya tienes web. Ahora que te encuentren"
            subtitle="Optimización para Google y para los buscadores de inteligencia artificial que ya recomiendan negocios locales."
          />

          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            {growthPacks.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 glass-card px-5 py-3 rounded-full border border-border/60">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Todos los precios mostrados son <strong className="text-foreground">sin IVA</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
