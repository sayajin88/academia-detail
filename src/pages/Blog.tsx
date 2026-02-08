import { useState, useCallback, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { BlogBentoHero } from '@/components/blog/BlogBentoHero';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogCategories } from '@/components/blog/BlogCategories';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { blogPosts, getFeaturedPost, BlogCategory } from '@/data/blogPosts';

const BASE_URL = 'https://academiadetail.com';
const POSTS_PER_PAGE = 8;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const featuredPost = getFeaturedPost();

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
  }, [searchQuery, activeCategory]);

  const isSearching = searchQuery.trim().length > 0;
  const totalPages = isSearching ? 1 : Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = isSearching
    ? filteredPosts
    : filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Academia Detail - Detailing Profesional",
    "description": "Artículos, guías y consejos sobre detailing profesional, PPF, car wrapping y cómo montar tu propio negocio de detailing.",
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
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Blog de Detailing Profesional | Guías y Consejos | Academia Detail</title>
        <meta name="description" content="✅ Guías, consejos y artículos sobre detailing profesional, PPF, car wrapping y emprendimiento. Aprende de expertos con +12 años de experiencia. ➤ Léelo ahora." />
        <meta name="keywords" content="blog detailing, guías detailing profesional, consejos car wrapping, artículos PPF, montar negocio detailing, tips pulido coches" />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta property="og:title" content="Blog de Detailing Profesional | Academia Detail" />
        <meta property="og:description" content="Guías, consejos y artículos sobre detailing profesional, PPF, car wrapping y emprendimiento." />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="pt-24 md:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Bento Hero */}
          {featuredPost && !searchQuery && !activeCategory && (
            <AnimatedSection animation="fade-up" duration="fast">
              <div className="mb-10 md:mb-14">
                <BlogBentoHero featuredPost={featuredPost} />
              </div>
            </AnimatedSection>
          )}

          {/* Section heading + filters */}
          <div ref={gridRef} className="scroll-mt-24">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 mb-3">
                    Knowledge Base
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-foreground"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Últimos Artículos
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <BlogCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                  <BlogSearch onSearch={handleSearch} />
                </div>
              </div>
            </AnimatedSection>

            {/* Grid */}
            <BlogGrid posts={paginatedPosts} />
          </div>

          {/* Pagination */}
          {!isSearching && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
