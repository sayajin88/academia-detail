import { useState, useCallback, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { BlogBentoHero } from '@/components/blog/BlogBentoHero';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogCategories } from '@/components/blog/BlogCategories';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { PageBreadcrumbs } from '@/components/shared/PageBreadcrumbs';
import { BlogCategory, categoryLabels } from '@/data/blogPosts';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const BASE_URL = 'https://academiadetail.com';
const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const { posts: blogPosts } = useBlogPosts();

  const featuredPost = useMemo(() => blogPosts.find(p => p.featured), [blogPosts]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: BlogCategory | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter(p => !p.featured);

    if (activeCategory) {
      posts = posts.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return posts;
  }, [blogPosts, searchQuery, activeCategory]);

  const isSearching = searchQuery.trim().length > 0;
  const hasFilters = isSearching || activeCategory !== null;
  const totalPages = isSearching ? 1 : Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = isSearching
    ? filteredPosts
    : filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog de Detailing Profesional",
    "description": "Artículos, guías y consejos sobre detailing profesional, PPF, car wrapping y cómo montar tu propio negocio de detailing.",
    "url": `${BASE_URL}/blog`,
    "mainEntity": {
      "@type": "Blog",
      "name": "Blog de Academia Detail - Detailing Profesional",
      "url": `${BASE_URL}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "Academia Detail",
        "url": BASE_URL,
        "logo": `${BASE_URL}/og-image.png`
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `${BASE_URL}/blog/${post.slug}`,
        "datePublished": post.publishedAt,
        "author": { "@type": "Person", "name": post.author.name },
        "image": typeof post.image === 'string' ? post.image : `${BASE_URL}/og-image.png`,
      }))
    }
  };

  return (
    <MainLayout>
      <SEO
        title="Blog Detailing Profesional | Guías y Consejos"
        description="✅ Guías, consejos y artículos sobre detailing profesional, PPF, car wrapping y emprendimiento. Aprende de expertos con +12 años de experiencia."
        keywords="blog detailing, guías detailing profesional, consejos car wrapping, artículos PPF, montar negocio detailing, tips pulido coches"
        url="/blog"
        schema={[blogSchema]}
      />

      <section aria-label="Blog de detailing profesional" className="pt-24 md:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <PageBreadcrumbs items={[{ label: 'Blog' }]} />

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Blog de Detailing Profesional
          </h1>

          {/* Bento Hero */}
          {featuredPost && !hasFilters && (
            <AnimatedSection animation="fade-up" duration="fast">
              <div className="mb-10 md:mb-14">
                <BlogBentoHero featuredPost={featuredPost} />
              </div>
            </AnimatedSection>
          )}

          {/* Sticky filter bar */}
          <div ref={gridRef} className="scroll-mt-24">
            <div className="sticky top-16 z-30 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/50 mb-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <BlogCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <BlogSearch onSearch={handleSearch} />
                </div>
              </div>

              {/* Active filter indicator */}
              {hasFilters && (
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="text-muted-foreground">
                    {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''}
                    {activeCategory && ` en ${categoryLabels[activeCategory]}`}
                    {isSearching && ` para "${searchQuery}"`}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-brand hover:text-brand/80 font-medium transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Limpiar
                  </button>
                </div>
              )}
            </div>

            <BlogGrid posts={paginatedPosts} />
          </div>

          {!isSearching && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </MainLayout>
  );
}
