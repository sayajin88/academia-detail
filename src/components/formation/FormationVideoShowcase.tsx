import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoItem {
  src: string;
  poster?: string;
}

interface FormationVideoShowcaseProps {
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  onCTAClick?: () => void;
}

function LazyVideo({ 
  src, 
  poster, 
  isVisible, 
  delay = 0 
}: { 
  src: string; 
  poster?: string; 
  isVisible: boolean; 
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [shouldLoad]);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-muted">
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/webm" />
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}

export function FormationVideoShowcase({
  videos,
  title = "Domina las Técnicas Profesionales",
  subtitle = "de Detailing Automotriz",
  badge = "Mira lo que aprenderás",
  ctaText = "Quiero Aprender Esto",
  onCTAClick,
}: FormationVideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section ref={containerRef} className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Videos Container */}
        {isMobile ? (
          /* Mobile: Carousel */
          <div className="relative max-w-sm mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {videos.map((video, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <LazyVideo
                      src={video.src}
                      poster={video.poster}
                      isVisible={isVisible && Math.abs(index - currentIndex) <= 1}
                      delay={0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors z-10"
              aria-label="Video anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors z-10"
              aria-label="Video siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Ir al video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: 3-column grid */
          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {videos.map((video, index) => (
              <div key={index} className="transform hover:scale-[1.02] transition-transform duration-300">
                <LazyVideo
                  src={video.src}
                  poster={video.poster}
                  isVisible={isVisible}
                  delay={index * 150}
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {onCTAClick && (
          <div className="flex justify-center mt-8 md:mt-12">
            <Button
              onClick={onCTAClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {ctaText}
            </Button>
          </div>
        )}

        {/* Bottom text */}
        <p className="text-center text-muted-foreground mt-6 text-sm md:text-base">
          Formación práctica con técnicas reales desde el primer día
        </p>
      </div>
    </section>
  );
}
