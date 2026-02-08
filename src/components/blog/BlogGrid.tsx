import { BlogPost } from '@/data/blogPosts';
import { BlogCard } from './BlogCard';
import { BlogNewsletter } from './BlogNewsletter';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <div key={post.id}>
          <BlogCard post={post} />
          {/* Insert newsletter after the 3rd card */}
          {index === 2 && posts.length > 3 && (
            <div className="mt-6">
              <BlogNewsletter variant="inline" />
            </div>
          )}
        </div>
      ))}
      {/* If 3 or fewer posts, show newsletter at the end */}
      {posts.length <= 3 && (
        <div className="md:col-span-2 lg:col-span-3">
          <BlogNewsletter variant="inline" />
        </div>
      )}
    </div>
  );
}
