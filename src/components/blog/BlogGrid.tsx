import { BlogPost } from '@/data/blogPosts';
import { BlogCardOverlay } from './BlogCardOverlay';
import { BlogCTABanner } from './BlogCTABanner';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No se encontraron artículos.</p>
        <p className="text-muted-foreground/60 text-sm mt-1">Prueba con otra búsqueda o categoría.</p>
      </div>
    );
  }

  const firstRow = posts.slice(0, 4);
  const restRows = posts.slice(4);
  const showCTA = posts.length > 4;

  return (
    <div className="space-y-8">
      {/* First row of overlay cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {firstRow.map((post, index) => (
          <AnimatedSection key={post.id} stagger={index * 80} animation="fade-up" duration="fast">
            <BlogCardOverlay post={post} />
          </AnimatedSection>
        ))}
      </div>

      {/* CTA Banner between rows */}
      {showCTA && (
        <AnimatedSection animation="fade-up" delay={200}>
          <BlogCTABanner />
        </AnimatedSection>
      )}

      {/* Remaining cards */}
      {restRows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restRows.map((post, index) => (
            <AnimatedSection key={post.id} stagger={index * 80} animation="fade-up" duration="fast">
              <BlogCardOverlay post={post} />
            </AnimatedSection>
          ))}
        </div>
      )}

      {/* If 4 or fewer posts, show CTA at the end */}
      {!showCTA && (
        <AnimatedSection animation="fade-up" delay={200}>
          <BlogCTABanner />
        </AnimatedSection>
      )}
    </div>
  );
}
