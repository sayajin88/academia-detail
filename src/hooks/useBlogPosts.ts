import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { blogPosts as staticPosts, BlogPost, BlogCategory, getPostBySlug as staticGetBySlug } from '@/data/blogPosts';

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  author_role: string;
  author_image: string | null;
  published_at: string;
  reading_time: string;
  image_url: string | null;
  image_alt: string;
  featured: boolean;
  tags: string[];
  sections: unknown;
  related_slugs: string[];
  status: string;
  seo_score: number | null;
  readability_score: number | null;
}

function dbPostToBlogPost(db: DbBlogPost): BlogPost {
  return {
    id: db.id,
    slug: db.slug,
    title: db.title,
    excerpt: db.excerpt,
    category: db.category as BlogCategory,
    author: {
      name: db.author_name,
      role: db.author_role,
      image: db.author_image || '',
    },
    publishedAt: db.published_at,
    readingTime: db.reading_time,
    image: db.image_url || '',
    imageAlt: db.image_alt,
    featured: db.featured,
    tags: db.tags || [],
    sections: (db.sections as BlogPost['sections']) || [],
    relatedSlugs: db.related_slugs || [],
  };
}

export function useBlogPosts() {
  const { data: dbPosts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as DbBlogPost[];
    },
  });

  // Build static posts map for fallback
  const staticBySlug = new Map(staticPosts.map(p => [p.slug, p]));

  // Smart merge: DB posts enriched with static fallbacks for missing fields
  const dynamicPosts = dbPosts.map(db => {
    const converted = dbPostToBlogPost(db);
    const staticMatch = staticBySlug.get(db.slug);
    if (staticMatch) {
      if (!converted.image) converted.image = staticMatch.image;
      if (!converted.author.image) converted.author = { ...converted.author, image: staticMatch.author.image };
    }
    return converted;
  });

  const dbSlugs = new Set(dynamicPosts.map(p => p.slug));
  const mergedPosts = [
    ...dynamicPosts,
    ...staticPosts.filter(p => !dbSlugs.has(p.slug)),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return { posts: mergedPosts, isLoading };
}

export function useDbBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) return null;
      // Try static first
      const staticPost = staticGetBySlug(slug);
      if (staticPost) return staticPost;
      
      // Try DB
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return dbPostToBlogPost(data as unknown as DbBlogPost);
    },
    enabled: !!slug,
  });
}
