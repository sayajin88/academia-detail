import { useState } from 'react';
import { Play } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface VideoTestimonial {
  id: string;
  title: string;
  name?: string;
  role?: string;
}

interface FormationVideoTestimonialsProps {
  videos: VideoTestimonial[];
  title?: string;
  subtitle?: string;
}

export function FormationVideoTestimonials({ 
  videos, 
  title = "Testimonios de Alumnos",
  subtitle = "Descubre lo que dicen nuestros graduados sobre su experiencia"
}: FormationVideoTestimonialsProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  if (!videos || videos.length === 0) return null;

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Play className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Video Testimonios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
                {title}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </AnimatedSection>

        <div className={`grid gap-6 md:gap-8 ${
          videos.length === 1 
            ? 'max-w-2xl mx-auto' 
            : videos.length === 2 
              ? 'md:grid-cols-2 max-w-4xl mx-auto' 
              : 'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {videos.map((video, index) => (
            <AnimatedSection key={video.id} delay={index * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Video Container */}
                <div className="relative aspect-video">
                  {playingVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={getYouTubeThumbnail(video.id)}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Play Button */}
                      <button
                        onClick={() => setPlayingVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label={`Reproducir video: ${video.title}`}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg shadow-primary/30">
                          <Play className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 md:p-5">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.name && (
                    <p className="text-sm text-muted-foreground">
                      {video.name}
                      {video.role && <span className="text-primary"> • {video.role}</span>}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* JSON-LD Structured Data for Videos */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": videos.map((video, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "VideoObject",
                "name": video.title,
                "description": `Testimonio de ${video.name || 'alumno'} sobre su experiencia en el curso`,
                "thumbnailUrl": getYouTubeThumbnail(video.id),
                "uploadDate": new Date().toISOString().split('T')[0],
                "embedUrl": `https://www.youtube.com/embed/${video.id}`,
                "contentUrl": `https://www.youtube.com/watch?v=${video.id}`
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
}
