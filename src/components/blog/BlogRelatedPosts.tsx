import { BlogPost } from '@/data/blogPosts';
import { BlogCard } from './BlogCard';

interface BlogRelatedPostsProps {
  posts: BlogPost[];
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h3
        className="text-2xl font-bold text-foreground mb-6"
        style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
      >
        Artículos relacionados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
