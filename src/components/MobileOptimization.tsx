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
  onCtaClick?: () => void;
}

export const MobileOptimization = ({ isOpen, onToggle, onCtaClick }: MobileMenuProps) => {
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
                  className="block py-3 px-4 text-white hover:text-brand transition-colors rounded-lg hover:bg-white/5"
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
                <div className="text-white/70 text-sm">218 alumnos</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA - Now handled by StickyFloatingCTA component */}
    </>
  );
};