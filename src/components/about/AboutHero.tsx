import { useState, useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import heroImage from '@/assets/heroes/hero-galeria.jpg';

export function AboutHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy load video only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // YouTube video ID and start time
  const videoId = 'ByRhg2kYD-A';
  const startSeconds = 39;

  return (
    <section ref={sectionRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Fallback Background Image - shown until video loads */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* YouTube Video Background */}
      {shouldLoadVideo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[200%] md:h-[200%] min-w-[100vw] min-h-[100vh]"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=${startSeconds}&enablejsapi=1`}
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            onLoad={() => setIsVideoLoaded(true)}
            style={{ 
              border: 'none',
              pointerEvents: 'none'
            }}
          />
        </div>
      )}
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <SectionHeading
          badge="Desde 2017"
          title="Quiénes Somos"
          subtitle="Nacidos del taller, no del aula. Somos el único centro de formación en España que vive de verdad del Detailing, no de la formación."
          titleAs="h1"
        />
        
        {/* Tagline diferenciador */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm md:text-base font-medium text-primary">
              Academia Detail · Potenciada por Detail Park
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
