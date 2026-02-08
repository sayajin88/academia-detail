import { BlogPost } from '@/data/blogPosts';
import { BlogCard } from './BlogCard';
import { BlogNewsletter } from './BlogNewsletter';
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

  const firstRow = posts.slice(0, 3);
  const restRows = posts.slice(3);
  const showNewsletter = posts.length > 3;

  return (
    <div className="space-y-6">
      {/* First row of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstRow.map((post, index) => (
          <AnimatedSection key={post.id} stagger={index * 100} animation="fade-up" duration="fast">
            <BlogCard post={post} />
          </AnimatedSection>
        ))}
      </div>

      {/* Newsletter full-width between rows */}
      {showNewsletter && (
        <AnimatedSection animation="fade-up" delay={200}>
          <BlogNewsletter variant="inline" />
        </AnimatedSection>
      )}

      {/* Remaining cards */}
      {restRows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restRows.map((post, index) => (
            <AnimatedSection key={post.id} stagger={index * 100} animation="fade-up" duration="fast">
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      )}

      {/* If 3 or fewer posts, show newsletter at the end */}
      {!showNewsletter && (
        <AnimatedSection animation="fade-up" delay={200}>
          <BlogNewsletter variant="inline" />
        </AnimatedSection>
      )}
    </div>
  );
}
