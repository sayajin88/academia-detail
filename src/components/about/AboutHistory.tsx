import { useState, useEffect, useRef } from 'react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Calendar, TrendingUp, GraduationCap, Award, Play } from 'lucide-react';

// Founder Video Component with lazy loading
function FounderVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const vimeoVideoId = '994692869';
  const thumbnailUrl = `https://vumbnail.com/${vimeoVideoId}.jpg`;

  return (
    <div ref={containerRef} className="order-2 lg:order-1 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
          📹 VÍDEO EXCLUSIVO
        </span>
        <h3 className="text-xl md:text-2xl font-bold">
          La historia detrás de Detail Park
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Juan Daniel te cuenta por qué nació Academia Detail
        </p>
      </div>
      
      {/* Video Container - 9:16 aspect ratio */}
      <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/30">
        {!isPlaying ? (
          // Thumbnail with play button
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 group cursor-pointer"
            aria-label="Reproducir vídeo"
          >
            {shouldLoad ? (
              <img
                src={thumbnailUrl}
                alt="Juan Daniel - Fundador de Academia Detail y Detail Park, escuela de detailing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-background" />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 group-hover:from-background/60 transition-all duration-300" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-xl">
                <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground fill-current ml-1" />
              </div>
            </div>
            
            {/* Duration badge */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="text-xs font-medium text-white/90 bg-black/50 px-2 py-1 rounded">
                2:30
              </span>
              <span className="text-xs font-medium text-white/90 bg-primary/80 px-2 py-1 rounded">
                ▶ Ver ahora
              </span>
            </div>
          </button>
        ) : (
          // Vimeo iframe
          <iframe
            src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Juan Daniel - La historia de Detail Park"
          />
        )}
      </div>
    </div>
  );
}

const timelineEvents = [
  {
    year: '2017',
    title: 'Nace Detail Park',
    description: 'Juan Daniel funda Detail Park en Alicante con una visión clara: convertir su pasión por el cuidado automotriz en un negocio sostenible y profesional.',
    icon: Calendar,
  },
  {
    year: '2019',
    title: 'Crecimiento y Consolidación',
    description: 'Detail Park se consolida como referente en la Comunidad Valenciana, trabajando con vehículos de alta gama: Ferrari, Lamborghini, Porsche y más.',
    icon: TrendingUp,
  },
  {
    year: '2021',
    title: 'Nace Academia Detail',
    description: 'Lanzamos nuestra academia para transmitir no solo el oficio, sino el modelo de negocio que nos ha mantenido activos y rentables durante años.',
    icon: GraduationCap,
  },
  {
    year: 'Hoy',
    title: 'Centro de Referencia',
    description: 'Somos el único centro de formación donde vivimos del Detailing. Más de 200 alumnos formados y un taller activo que demuestra cada día que nuestro modelo funciona.',
    icon: Award,
  },
];

export function AboutHistory() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Nuestra Historia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              De la Pasión al Referente del Sector
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un recorrido de más de 9 años construyendo el negocio de detailing 
              más sólido y formando a la próxima generación de profesionales.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Línea central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <AnimatedSection 
                key={event.year} 
                delay={index * 0.15}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Icon Center */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary shadow-lg shadow-primary/20">
                  <event.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Founder Video + Quote Block */}
        <AnimatedSection delay={0.6} className="mt-16 max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-3xl p-6 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Video Column */}
              <FounderVideo />
              
              {/* Quote Column */}
              <blockquote className="order-1 lg:order-2">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
                  "En 2017 fundé Detail Park con una visión clara: demostrar que se puede vivir 
                  dignamente del detailing. Hemos visto cerrar decenas de centros por falta de 
                  gestión empresarial, no por falta de habilidad técnica. Por eso nació Academia Detail: 
                  para transmitir no solo el oficio, sino el modelo de negocio que nos ha mantenido 
                  activos y rentables durante más de 9 años."
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold">Juan Daniel</p>
                    <p className="text-sm text-muted-foreground">Fundador de Detail Park</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
