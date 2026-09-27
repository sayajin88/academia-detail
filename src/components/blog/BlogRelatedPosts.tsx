import { Section, SectionHeader } from '@/components/ds/Section';
import type { BlogPost } from '@/data/blogPosts';
import { BlogCard } from './BlogCard';

export function BlogRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <Section tone="card" aria-labelledby="relacionados-title">
      <SectionHeader id="relacionados-title" eyebrow="Blog" title="Sigue leyendo" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
