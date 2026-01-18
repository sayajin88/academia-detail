import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';

interface FormationVideoShowcaseProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  onCTAClick?: () => void;
}

export function FormationVideoShowcase({
  videoSrc,
  title = "Domina las Técnicas Profesionales",
  subtitle = "de Detailing Automotriz",
  badge = "Mira lo que aprenderás",
  ctaText = "Quiero Aprender Esto",
  onCTAClick,
}: FormationVideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl group">
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/webm" />
            Tu navegador no soporta el formato de video.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4 text-center">
            {/* Play indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {title}
            </h3>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 drop-shadow-md">
              {subtitle}
            </p>

            {/* CTA Button */}
            {onCTAClick && (
              <Button
                onClick={onCTAClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {ctaText}
              </Button>
            )}
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
        </div>

        {/* Bottom text */}
        <p className="text-center text-muted-foreground mt-6 text-sm md:text-base">
          Formación práctica con técnicas reales desde el primer día
        </p>
      </div>
    </section>
  );
}
