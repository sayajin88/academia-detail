import { Link } from "react-router-dom";
import { ChevronDown, Play, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImage from "@/assets/heroes/hero-home.jpg";

export function HomeHero() {
  const isMobile = useIsMobile();

  const scrollToFormations = () => {
    document.getElementById("formaciones")?.scrollIntoView({ behavior: "smooth" });
  };

  // YouTube video ID for background
  const videoId = "1JS81ZxslpI";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background for Desktop / Image for Mobile */}
      {isMobile ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          {/* Fallback image behind video */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${heroImage})` }} 
          />
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=17&enablejsapi=1&origin=${window.location.origin}`}
            title="Video de fondo Detail Park - Taller 100% Real"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: "none" }}
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge - Emphasizing Real Workshop */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">🔧 El ÚNICO Centro con Taller 100% Real</span>
          </div>

          {/* Main Title - SEO Optimized H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Cursos de Detailing, Pulido y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Tratamiento Cerámico en España
            </span>
          </h1>

          {/* Subtitle - Keyword Rich */}
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Aprende detailing desde cero en un{" "}
            <strong className="text-white">taller 100% real</strong>. Domina el{" "}
            <strong className="text-primary">pulido de coches, tratamiento cerámico</strong> y monta tu propio negocio de detailing con mentalidad empresarial.
          </p>

          {/* CTA Buttons - Improved mobile layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12 px-2">
            <Button asChild variant="hero" size="xl" className="w-full sm:w-auto text-sm sm:text-base min-h-[52px]">
              <Link to="/curso-detailing-iniciacion">
                <Play className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="sm:hidden">Probar por €97 + IVA</span>
                <span className="hidden sm:inline">Probar por €97 + IVA (Jornada Zero)</span>
              </Link>
            </Button>
            <Button variant="glass" size="lg" onClick={scrollToFormations} className="w-full sm:w-auto min-h-[48px]">
              Ver Formaciones
            </Button>
          </div>

          {/* Stats - Two rows for maximum impact */}
          <div className="max-w-3xl mx-auto px-2 space-y-4 sm:space-y-6">
            {/* Row 1: Volume stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
              {[
                { value: "500+", label: "Alumnos", sublabel: "Certificados" },
                { value: "100%", label: "Presencial", sublabel: "y Práctico" },
                { value: "3", label: "Máx Alumnos", sublabel: "por Grupo" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 sm:p-0">
                  <div className="text-xl sm:text-2xl md:text-4xl font-bold text-primary mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 leading-tight">
                    <span className="sm:hidden">{stat.label}</span>
                    <span className="hidden sm:inline">{stat.label} {stat.sublabel}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Row 2: Impact stats - key differentiators */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 pt-2 sm:pt-4 border-t border-white/10">
              {[
                { value: "92%", label: "Práctica", sublabel: "Real" },
                { value: "85%", label: "Lanzan", sublabel: "su Negocio" },
                { value: "+50", label: "Centros", sublabel: "Montados" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 sm:p-0">
                  <div className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 leading-tight">
                    <span className="sm:hidden">{stat.label}</span>
                    <span className="hidden sm:inline">{stat.label} {stat.sublabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToFormations}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Ver formaciones"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
