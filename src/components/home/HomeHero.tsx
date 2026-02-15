import { Link } from "react-router-dom";
import { ChevronDown, Mail, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect, useRef, useCallback } from "react";
import heroImage from "@/assets/heroes/hero-home.jpg";
import mobileHeroImage from "@/assets/mobile-hero-bg.jpg";

// Declaración global para la YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function HomeHero() {
  const isMobile = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const videoId = "1JS81ZxslpI";
  const START_SEC = 2;
  const END_OFFSET = 3;

  const isDestroyedRef = useRef(false);

  const initPlayer = useCallback(() => {
    if (playerRef.current || isDestroyedRef.current) return;

    playerRef.current = new window.YT.Player('hero-yt-player', {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        start: START_SEC,
        origin: window.location.origin,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (e: any) => {
          if (isDestroyedRef.current) return;
          e.target.playVideo();
          setVideoReady(true);

          const duration = e.target.getDuration();
          const endTime = duration - END_OFFSET;

          intervalRef.current = setInterval(() => {
            if (isDestroyedRef.current || !playerRef.current) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              return;
            }
            try {
              const current = playerRef.current.getCurrentTime?.();
              if (current >= endTime) {
                playerRef.current.seekTo(START_SEC, true);
              }
            } catch {
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          }, 500);
        },
        onStateChange: (e: any) => {
          if (isDestroyedRef.current) return;
          if (e.data === window.YT.PlayerState.ENDED) {
            try {
              e.target.seekTo(START_SEC, true);
              e.target.playVideo();
            } catch {
              // Player no longer available
            }
          }
        },
      },
    });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Diferir la carga del YouTube API 5 segundos para no bloquear el LCP
    const deferTimer = setTimeout(() => {
      if (isDestroyedRef.current) return;

      // Si la API ya está cargada, inicializar directamente
      if (window.YT?.Player) {
        initPlayer();
        return;
      }

      // Cargar el script de la YouTube IFrame API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => initPlayer();
    }, 5000);

    return () => {
      clearTimeout(deferTimer);
      isDestroyedRef.current = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      try {
        if (playerRef.current?.destroy) playerRef.current.destroy();
      } catch {
        // Ignore errors during cleanup
      }
      playerRef.current = null;
    };
  }, [isMobile, initPlayer]);

  const scrollToFormations = () => {
    document.getElementById("formaciones")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Fallback image — visible hasta que el vídeo esté listo */}
      <picture className={`transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}>
        <source media="(max-width: 767px)" srcSet={mobileHeroImage} />
        <source media="(min-width: 768px)" srcSet={heroImage} />
        <img
          src={heroImage}
          alt="Curso de detailing profesional - Formación práctica en taller real Alicante"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          sizes="100vw"
        />
      </picture>

      {/* YouTube IFrame API player — carga diferida en desktop */}
      {!isMobile && (
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}>
          <div
            id="hero-yt-player"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

      {/* Animated Gradient Orbs - Solo desktop, con contain para GPU */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ contain: 'paint' }} aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000" style={{ contain: 'paint' }} aria-hidden="true" />
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
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/75 leading-tight">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
        aria-label="Ver formaciones"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
