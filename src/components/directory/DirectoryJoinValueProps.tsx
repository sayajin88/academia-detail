import { TrendingUp, MapPin, BadgeCheck, MessageCircle, Search, Lock, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { value: "+15.000", label: "visitas/mes en nuestras webs", icon: TrendingUp },
  { value: "Top 1", label: "en Google en detailing España", icon: Search },
  { value: "218", label: "alumnos certificados", icon: BadgeCheck },
];

const advantages = [
  {
    icon: Search,
    title: "Visibilidad SEO garantizada",
    description: "Tu ficha aparece en las primeras posiciones de Google gracias a nuestra autoridad de dominio y estructura SEO programática.",
  },
  {
    icon: Lock,
    title: "Exclusividad en tu zona",
    description: "Plazas limitadas por ciudad para que no compitas con decenas de perfiles. Cuanto antes te registres, mejor posición.",
  },
  {
    icon: BadgeCheck,
    title: "Verificado por Academia Detail",
    description: "Badge de confianza que te diferencia. Los clientes saben que eres un profesional formado y avalado.",
  },
  {
    icon: MessageCircle,
    title: "Contacto directo con clientes",
    description: "WhatsApp, teléfono, Instagram y web visibles desde tu ficha. Sin intermediarios ni comisiones.",
  },
];

export function DirectoryJoinValueProps() {
  return (
    <div className="bg-card/50 rounded-2xl border border-border/50 p-6 md:p-8 space-y-8">
      {/* Métricas de impacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <m.icon className="w-5 h-5 text-primary" />
              <span className="text-3xl font-black text-primary">{m.value}</span>
            </div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Ventajas clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advantages.map((a) => (
          <Card key={a.title} className="border-border/50">
            <CardContent className="p-4 flex gap-3 items-start">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2 shrink-0">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Banner de precio */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-full px-6 py-3">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground line-through">4,99 €/mes</span>
          <span className="text-lg font-black text-green-500">0 €/mes</span>
        </div>
        <p className="text-xs text-muted-foreground">Oferta de lanzamiento limitada — después 4,99 €/mes</p>
      </div>
    </div>
  );
}
