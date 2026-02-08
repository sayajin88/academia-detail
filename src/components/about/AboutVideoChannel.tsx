import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection, StaggeredContainer } from '@/components/shared/AnimatedSection';
import { YouTubeEmbed } from '@/components/shared/YouTubeEmbed';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/channel/UCkOM5RCneYfXXJ_inEgujMw/';

const channelVideos = [
  { id: 'lgHS6CO2G2s', title: 'Detailing profesional en taller real' },
  { id: 'TtPs7WPVLzE', title: 'Proceso de pulido y corrección de pintura' },
  { id: 'ByRhg2kYD-A', title: 'Tratamiento cerámico en vehículo de alta gama' },
  { id: 'G3AU2913_vw', title: 'Lavado profesional y descontaminación' },
  { id: 'thUgGa5ULkI', title: 'Trabajo real en Detail Park Alicante' },
  { id: 'kp_yZNZnUwo', title: 'Protección de pintura y acabado perfecto' },
  { id: 'zr_FFDz06Fc', title: 'Restauración y detailing de vehículos' },
  { id: 'iMatPTngV0g', title: 'Técnicas avanzadas de detailing' },
  { id: 'U3K4VsFlY8E', title: 'Interior detailing profesional' },
  { id: 'L14vIkJWgKw', title: 'Resultados reales de nuestro taller' },
  { id: 'eFfzwvhGNcU', title: 'Preparación de vehículos premium' },
  { id: 'sqK6qkTWynk', title: 'Detail Park - Trabajo diario en el taller' },
];

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function AboutVideoChannel() {
  const featuredVideo = channelVideos[0];
  const gridVideos = channelVideos.slice(1);

  return (
    <section className="py-16 md:py-24 bg-muted/20 section-divider" id="videos-detailing">
      <div className="container">
        <AnimatedSection animation="fade-up">
          <SectionHeading
            badge="Nuestro Canal de YouTube"
            title="Videos de Detailing Profesional en Nuestro Taller"
            subtitle="Más de 12 videos mostrando nuestro trabajo real con clientes de alta gama. No es simulación: es nuestro día a día en Detail Park."
          />
        </AnimatedSection>

        {/* Featured video - large */}
        <AnimatedSection animation="scale" delay={100} className="mb-8 md:mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/5">
              <YouTubeEmbed
                videoId={featuredVideo.id}
                title={featuredVideo.title}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3 font-medium">
              ▶ {featuredVideo.title}
            </p>
          </div>
        </AnimatedSection>

        {/* Grid of remaining videos */}
        <StaggeredContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          staggerDelay={60}
          animation="fade-up"
        >
          {gridVideos.map((video) => (
            <div key={video.id} className="group">
              <div className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                <YouTubeEmbed videoId={video.id} title={video.title} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1 px-0.5">
                {video.title}
              </p>
            </div>
          ))}
        </StaggeredContainer>

        {/* CTA to YouTube channel */}
        <AnimatedSection animation="fade-up" delay={200} className="mt-10 md:mt-14 text-center">
          <p className="text-muted-foreground mb-5 max-w-xl mx-auto">
            Estos son solo algunos de nuestros trabajos. Visita nuestro canal para ver cómo trabajamos cada día en el taller.
          </p>
          <Button asChild variant="outline" size="lg" className="group">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" />
              Ver más videos en YouTube
              <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
