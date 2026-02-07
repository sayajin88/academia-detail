import { Link } from "react-router-dom";
import { ChevronDown, Mail, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef } from "react";
import heroImage from "@/assets/heroes/hero-home.jpg";

export function HomeHero() {
  const isMobile = useIsMobile();
  const [videoInteracted, setVideoInteracted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // YouTube video ID for background
  const videoId = "1JS81ZxslpI";
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  // Cargar video solo después de scroll o interacción del usuario (facade pattern)
  useEffect(() => {
    if (isMobile) return;

    // Cargar video automáticamente después de 8s si el usuario no interactúa
    const timer = setTimeout(() => setVideoInteracted(true), 8000);

    // O cargar inmediatamente si el usuario hace scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVideoInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToFormations = () => {
    document.getElementById("formaciones")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image - LCP optimizado con imagen responsiva */}
      <picture>
        {/* Móvil: imagen pequeña optimizada */}
        <source 
          media="(max-width: 767px)" 
          srcSet="/mobile-hero-bg.jpg"
        />
        {/* Desktop: imagen grande */}
        <source 
          media="(min-width: 768px)" 
          srcSet={heroImage}
        />
        <img 
          src={heroImage}
          alt="Curso de detailing profesional - Formación práctica en taller real Alicante"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>

      {/* Video Background for Desktop - YouTube Facade Pattern */}
      {!isMobile && videoInteracted && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=17&enablejsapi=1&origin=${window.location.origin}`}
            title="Video de fondo Detail Park - Taller 100% Real"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: "none" }}
            loading="lazy"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

      {/* Animated Gradient Orbs - Ocultos en móvil (blur-3xl es costoso) */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge - Emphasizing Real Workshop */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">El ÚNICO Centro con Taller 100% Real</span>
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
              <Link to="/contacto">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                Solicitar Información
              </Link>
            </Button>
            <Button variant="glass" size="lg" onClick={scrollToFormations} className="w-full sm:w-auto min-h-[48px]">
              Ver Formaciones
            </Button>
          </div>

          {/* Stats - Single row for clean impact */}
          <div className="max-w-4xl mx-auto px-2">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
              {[
                { value: "500+", label: "Alumnos", sublabel: "Certificados" },
                { value: "100%", label: "Presencial", sublabel: "y Práctico" },
                { value: "3", label: "Máx Alumnos", sublabel: "por Grupo" },
                { value: "92%", label: "Práctica", sublabel: "Real" },
                { value: "85%", label: "Lanzan", sublabel: "su Negocio" },
                { value: "+50", label: "Centros", sublabel: "Montados" },
              ].map((stat, index) => (
                <div key={stat.label} className={`text-center p-2 sm:p-3 rounded-lg bg-white/5 backdrop-blur-sm ${index >= 3 ? 'hidden sm:block' : ''}`}>
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 ${index < 3 ? 'text-primary' : 'text-white'}`}>{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/70 leading-tight">
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
