import { Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CarreraVideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-background overflow-hidden"
    >
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            className={`flex justify-center mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Mensaje del Fundador
            </span>
          </div>

          {/* Title */}
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="gold-gradient-text">Por Qué Este Programa</span>
            <br />
            <span className="text-foreground">Es Diferente</span>
          </h2>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground text-center mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            "Antes de enseñarte técnicas, déjame contarte los errores que cometí como empresario..."
          </p>

          {/* Video Container */}
          <div 
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Gold border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-2xl blur-sm opacity-60" />
            
            {/* Video wrapper */}
            <div className="relative bg-card rounded-xl overflow-hidden border border-primary/30">
              <div className="aspect-video">
                {!isPlaying ? (
                  // Thumbnail with play button
                  <div 
                    className="relative w-full h-full cursor-pointer group"
                    onClick={handlePlayClick}
                  >
                    {/* YouTube thumbnail */}
                    <img 
                      src={`https://img.youtube.com/vi/peVrGNgAW14/maxresdefault.jpg`}
                      alt="Video: La importancia de la gestión del negocio"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                        
                        {/* Button */}
                        <button 
                          className="relative w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 group-hover:scale-110 transition-transform duration-300"
                          aria-label="Reproducir video"
                        >
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-current ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // YouTube embed
                  <iframe
                    src="https://www.youtube.com/embed/peVrGNgAW14?autoplay=1&rel=0&modestbranding=1"
                    title="La importancia de la gestión del negocio - Daniel López"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p 
            className={`text-center mt-8 text-muted-foreground flex items-center justify-center gap-2 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-primary">⏱️</span>
            <span>4 minutos que pueden ahorrarte años de errores</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CarreraVideoIntro;
