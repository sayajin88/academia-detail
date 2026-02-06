import { useEffect, useRef, useState, useCallback } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Skeleton } from '@/components/ui/skeleton';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// URLs de posts/reels de @danidetailoficial — edita este array para cambiar el contenido
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
  const [scriptLoaded, setScriptLoaded] = useState(false);

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

  // Cargar script de Instagram solo cuando la sección es visible
  const loadScript = useCallback(() => {
    // Si ya existe el script, solo procesar
    if (window.instgrm) {
      setScriptLoaded(true);
      window.instgrm.Embeds.process();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptLoaded(true);
      // Pequeño delay para que Instagram procese los blockquotes
      setTimeout(() => {
        window.instgrm?.Embeds.process();
      }, 100);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isVisible) {
      loadScript();
    }
  }, [isVisible, loadScript]);

  // Re-procesar embeds si el script ya estaba cargado
  useEffect(() => {
    if (scriptLoaded && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [scriptLoaded]);

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
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    maxWidth: '540px',
                    minWidth: '280px',
                    width: '100%',
                    margin: '0',
                  }}
                >
                  {/* Fallback mientras Instagram procesa el embed */}
                  {!scriptLoaded && <InstagramEmbedSkeleton />}
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-glow transition-colors text-sm font-medium inline-flex items-center gap-1.5"
                    >
                      Ver en Instagram
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </blockquote>
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
