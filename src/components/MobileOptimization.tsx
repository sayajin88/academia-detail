import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Star, 
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Award
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileOptimization = ({ isOpen, onToggle }: MobileMenuProps) => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (300px)
      setShowStickyCTA(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onToggle} />
          <div className="fixed right-0 top-0 h-full w-80 glass-intense border-l border-primary/30 p-6 animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Menú</h3>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="space-y-4">
              {[
                { label: "Inicio", href: "#hero" },
                { label: "¿Por qué Detail Park?", href: "#why-us" },
                { label: "Testimonios", href: "#testimonials" },
                { label: "Precios", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "#contact" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 px-4 text-white hover:text-primary transition-colors rounded-lg hover:bg-white/5"
                  onClick={onToggle}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <Button variant="hero" size="lg" className="w-full">
                Acceder Ahora
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>

            {/* Mobile Social Proof */}
            <div className="mt-8 p-4 glass-card rounded-lg">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-white font-bold">4.9/5</div>
                <div className="text-white/70 text-sm">+800 estudiantes</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA - Optimized */}
      {showStickyCTA && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 p-3 z-50 shadow-2xl animate-slide-in-right">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs truncate">La Jornada Cero</p>
              <div className="flex items-center gap-2">
                <p className="text-primary text-base font-black">€299 + IVA</p>
                <span className="text-xs text-white/60 line-through">€999</span>
              </div>
            </div>
            <Button variant="hero" size="sm" className="shrink-0 mobile-touch-target">
              RESERVAR
            </Button>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Sections */}
      <div className="lg:hidden">
        {/* Mobile Hero Enhancements */}
        <section className="px-4">
          <div className="space-y-6">
            {/* Compact Social Proof */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-white/80">800+</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white/80">4.9</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-white/80">Certificado</span>
              </div>
            </div>

            {/* Mobile Video Preview */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Button variant="glass" size="lg" className="rounded-full">
                      <PlayCircle className="w-8 h-8" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="text-white text-sm font-bold">
                      "De 0 a €3,000/mes en 21 días"
                    </div>
                    <div className="text-white/80 text-xs">
                      Testimonio real de Carlos M.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mobile Collapsible Sections */}
        <section className="px-4 py-8 space-y-4">
          {[
            {
              id: "benefits",
              title: "¿Qué incluye el curso?",
              content: [
                "✅ 25+ horas de video HD",
                "✅ Práctica en taller real",
                "✅ Kit de herramientas incluido",
                "✅ Certificado oficial",
                "✅ Soporte 24/7",
                "✅ Garantía 30 días"
              ]
            },
            {
              id: "testimonials",
              title: "Lo que dicen nuestros estudiantes",
              content: [
                "💬 'En 3 semanas tenía mi negocio funcionando' - Carlos M.",
                "💬 'Ahora facturo €4,000 al mes' - Ana R.",
                "💬 'El mejor curso que he hecho' - Miguel S."
              ]
            },
            {
              id: "guarantee",
              title: "Garantía y seguridad",
              content: [
                "🛡️ 30 días de garantía total",
                "🛡️ Pago 100% seguro",
                "🛡️ Acceso inmediato",
                "🛡️ Sin permanencia"
              ]
            }
          ].map((section) => (
            <Card key={section.id} className="glass-card">
              <CardContent className="p-0">
                <button
                  className="w-full p-4 text-left flex items-center justify-between"
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="text-white font-bold">{section.title}</h3>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="space-y-2">
                      {section.content.map((item, index) => (
                        <div key={index} className="text-white/80 text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Mobile Urgency Bar */}
        <section className="px-4 pb-8">
          <Card className="glass-intense border-primary/30">
            <CardContent className="p-4 text-center">
              <Badge variant="destructive" className="mb-2 animate-pulse">
                ¡ÚLTIMAS HORAS!
              </Badge>
              <div className="text-white font-bold mb-1">
                Oferta termina en:
              </div>
              <div className="text-2xl font-black gradient-text mb-3">
                23:45:12
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-white/80">Precio normal: €197</span>
                <span className="text-primary font-bold">Ahora: €47</span>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Aprovechar Oferta
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Mobile Quick Actions */}
        <section className="px-4 pb-20">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Llamar</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">WhatsApp</span>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};