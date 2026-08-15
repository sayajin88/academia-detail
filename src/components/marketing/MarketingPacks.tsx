import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Check, Flame, ArrowDown, Zap } from "lucide-react";
import { webPacks, growthPacks, waLink, type Pack } from "./marketingData";

/** Parses "1.299€" / "889€" style strings into a number */
const toNumber = (value: string) => Number(value.replace(/[^\d]/g, ""));

interface PricedPack extends Pack {
  featured?: boolean;
}

const orderedPacks: PricedPack[] = [
  { ...webPacks.find((p) => p.id === "landing")! },
  { ...webPacks.find((p) => p.id === "profesional")!, featured: true },
  { ...growthPacks.find((p) => p.id === "seo-geo")! },
];

function PriceBlock({ pack, featured }: { pack: Pack; featured?: boolean }) {
  const now = toNumber(pack.price);
  const before = toNumber(pack.oldPrice);
  const saving = before - now;
  const percent = Math.round((saving / before) * 100);

  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xl md:text-2xl font-semibold text-muted-foreground/70 line-through decoration-primary/70 decoration-2">
          {pack.oldPrice}
        </span>
        <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary-foreground">
          -{percent}%
        </span>
      </div>

      <div className="flex items-end gap-2">
        <span
          className={`font-black leading-none gradient-text ${
            featured ? "text-6xl md:text-7xl" : "text-5xl"
          }`}
        >
          {pack.price}
        </span>
        <span className="text-xs text-muted-foreground mb-2">sin IVA · pago único</span>
      </div>

      {/* Visual discount bar */}
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-primary shadow-primary"
            style={{ width: `${100 - percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-semibold text-primary">
          Te ahorras {saving}€ respecto al precio habitual
        </p>
      </div>
    </div>
  );
}

function PackCard({ pack, index }: { pack: PricedPack; index: number }) {
  const featured = pack.featured;

  return (
    <AnimatedSection
      delay={index * 100}
      animation="fade-up"
      className={`h-full ${featured ? "lg:-my-8 z-10" : ""}`}
    >
      <article
        className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
          featured
            ? "pricing-glow-border bg-card p-8 md:p-10 shadow-primary"
            : "border border-border/60 bg-card/60 p-7 md:p-8 hover:border-primary/40"
        }`}
      >
        {featured && (
          <div
            className="absolute -inset-24 bg-primary/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Corner launch stamp */}
        <span
          className={`pricing-stamp ${featured ? "" : "opacity-60"}`}
          aria-hidden="true"
        >
          Lanzamiento
        </span>

        <div className="relative">
          {pack.badge && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5 ${
                featured
                  ? "bg-primary text-primary-foreground animate-badge-pulse"
                  : "bg-foreground/5 text-muted-foreground border border-border/60"
              }`}
            >
              {featured && <Flame className="w-3 h-3" />}
              {pack.badge}
            </span>
          )}

          <h3
            className={`font-bold text-foreground mb-1 ${
              featured ? "text-3xl md:text-4xl" : "text-2xl"
            }`}
          >
            {pack.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-7">{pack.subtitle}</p>

          <PriceBlock pack={pack} featured={featured} />

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
            variant={featured ? "default" : "outline"}
            className={`w-full ${featured ? "text-base shadow-primary" : ""}`}
            asChild
          >
            <a
              href={waLink(`Hola, me interesa el pack "${pack.name}" (${pack.price} sin IVA).`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {featured ? "Quiero este pack ahora" : "Me interesa este pack"}
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
        {/* Offer ribbon */}
        <AnimatedSection animation="fade-up">
          <div className="pricing-ribbon mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl px-6 py-4 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground">
              <Flame className="w-4 h-4" />
              Precios de lanzamiento
            </span>
            <span className="text-sm font-semibold text-primary-foreground/90">
              Hasta un <strong className="text-2xl font-black align-middle">-65%</strong> · plazas
              limitadas por mes
            </span>
          </div>
        </AnimatedSection>

        <SectionHeading
          badge="Packs"
          title="Todo lo que necesitas para existir en digital"
          subtitle="Elige el punto de partida. Un solo pago, sin cuotas ni permanencias. Todos los precios son sin IVA."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr_1fr] max-w-7xl mx-auto items-center">
          {orderedPacks.map((pack, i) => (
            <div key={pack.id} className={pack.featured ? "order-first lg:order-none" : ""}>
              <PackCard pack={pack} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
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
