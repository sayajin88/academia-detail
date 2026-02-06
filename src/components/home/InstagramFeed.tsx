import { Instagram, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';

// Reels de @danidetailoficial — edita este array para cambiar el contenido
const INSTAGRAM_POSTS = [
  {
    url: 'https://www.instagram.com/reel/DKJqXJKI1v2/',
    id: 'DKJqXJKI1v2',
    title: 'Proceso de pulido profesional',
    description: 'Técnicas avanzadas de corrección de pintura',
  },
  {
    url: 'https://www.instagram.com/reel/DJW7FZ5oM5l/',
    id: 'DJW7FZ5oM5l',
    title: 'Formación en directo',
    description: 'Nuestros alumnos en acción durante el curso',
  },
  {
    url: 'https://www.instagram.com/reel/DI3k9nGIBbX/',
    id: 'DI3k9nGIBbX',
    title: 'Resultado final detailing',
    description: 'Antes y después de un trabajo completo',
  },
];

const INSTAGRAM_PROFILE = 'https://www.instagram.com/danidetailoficial/';

function InstagramReelCard({
  post,
  index,
}: {
  post: (typeof INSTAGRAM_POSTS)[number];
  index: number;
}) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden aspect-[9/16] bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,85,51,0.15)]"
      aria-label={`Ver reel: ${post.title}`}
    >
      {/* Fondo con gradiente Instagram */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />

      {/* Contenido central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Logo Instagram con gradiente */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <Instagram className="w-9 h-9 text-foreground" />
            </div>
          </div>
        </div>

        {/* Play button */}
        <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-lg">
          <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
        </div>

        {/* Texto */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Username badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border">
          <Instagram className="w-3.5 h-3.5" />
          @danidetailoficial
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Número de reel */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-muted-foreground border border-border">
        {index + 1}
      </div>

      {/* Indicador "Ver en Instagram" */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
          Ver en Instagram
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export function InstagramFeed() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Síguenos en Instagram"
          title="Contenido Real de Nuestro Día a Día"
          subtitle="Mira lo que hacemos en @danidetailoficial — formación, trabajos y el ambiente de nuestra academia."
        />

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-10">
          {INSTAGRAM_POSTS.map((post, index) => (
            <InstagramReelCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* CTA - Seguir en Instagram */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Seguir @danidetailoficial
              <ExternalLink className="ml-2 h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
