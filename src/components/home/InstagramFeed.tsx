import { useEffect, useRef, useState } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Skeleton } from '@/components/ui/skeleton';

// URLs de reels de @danidetailoficial — edita este array para cambiar el contenido
const INSTAGRAM_POSTS = [
  {
    url: 'https://www.instagram.com/reel/DKJqXJKI1v2/',
    id: 'DKJqXJKI1v2',
  },
  {
    url: 'https://www.instagram.com/reel/DJW7FZ5oM5l/',
    id: 'DJW7FZ5oM5l',
  },
  {
    url: 'https://www.instagram.com/reel/DI3k9nGIBbX/',
    id: 'DI3k9nGIBbX',
  },
];

const INSTAGRAM_PROFILE = 'https://www.instagram.com/danidetailoficial/';

function InstagramEmbedSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="w-full aspect-[4/5]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Detectar cuando la sección entra en viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Síguenos en Instagram"
          title="Contenido Real de Nuestro Día a Día"
          subtitle="Mira lo que hacemos en @danidetailoficial — formación, trabajos y el ambiente de nuestra academia."
        />

        {/* Grid de embeds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-10">
          {INSTAGRAM_POSTS.map((post) => (
            <div key={post.id} className="flex justify-center">
              {isVisible ? (
                <iframe
                  src={`https://www.instagram.com/reel/${post.id}/embed/`}
                  className="w-full rounded-xl border border-border"
                  style={{ minHeight: 580 }}
                  frameBorder="0"
                  scrolling="no"
                  allow="encrypted-media"
                  loading="lazy"
                  title={`Reel de Instagram ${post.id}`}
                />
              ) : (
                <InstagramEmbedSkeleton />
              )}
            </div>
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
