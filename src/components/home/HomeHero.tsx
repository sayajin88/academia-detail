import { Link } from 'react-router-dom';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import heroImage from '@/assets/heroes/hero-home.jpg';

export function HomeHero() {
  const isMobile = useIsMobile();
  
  const scrollToFormations = () => {
    document.getElementById('formaciones')?.scrollIntoView({ behavior: 'smooth' });
  };

  // YouTube video ID for background
  const videoId = '1JS81ZxslpI';

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background for Desktop / Image for Mobile */}
      {isMobile ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=17&enablejsapi=1&origin=${window.location.origin}`}
            title="Video de fondo Detail Park"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Centro de Formación Líder en España
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Aprende Detailing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Profesional en España
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cursos de detailing, car wrapping y PPF 100% prácticos. 
            Formación certificada para montar tu centro de detailing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild variant="hero" size="xl">
              <Link to="/jornada-cero">
                <Play className="h-5 w-5 mr-2" />
                Reserva tu Plaza
              </Link>
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={scrollToFormations}
            >
              Descubre las Formaciones
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { value: '500+', label: 'Alumnos Formados' },
              { value: '5', label: 'Especialidades' },
              { value: '98%', label: 'Satisfacción' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToFormations}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to formations"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
