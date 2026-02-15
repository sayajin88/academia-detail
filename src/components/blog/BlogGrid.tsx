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

  return (
    <div className="space-y-10">
      {/* Cards grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post, index) => (
          <AnimatedSection key={post.id} stagger={index * 60} animation="fade-up" duration="fast">
            <BlogCardOverlay post={post} />
          </AnimatedSection>
        ))}
      </div>

      {/* CTA at the end */}
      <AnimatedSection animation="fade-up" delay={200}>
        <BlogCTABanner />
      </AnimatedSection>
    </div>
  );
}
