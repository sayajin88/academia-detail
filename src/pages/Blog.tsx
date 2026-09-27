import { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogCategories } from '@/components/blog/BlogCategories';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BLOG_CATEGORY_LABELS, BLOG_CATEGORY_ORDER, normalizeCategory } from '@/components/blog/blogUtils';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const BASE_URL = 'https://academiadetail.com';
const POSTS_PER_PAGE = 9;

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Blog() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);
  const { posts, isLoading } = useBlogPosts();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  const searched = useMemo(() => {
    const q = normalize(searchQuery.trim());
    if (!q) return posts;
    return posts.filter((p) => normalize(`${p.title} ${p.excerpt} ${p.tags.join(' ')}`).includes(q));
  }, [posts, searchQuery]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: searched.length };
    searched.forEach((p) => {
      const c = normalizeCategory(p.category);
      result[c] = (result[c] || 0) + 1;
    });
    return result;
  }, [searched]);

  const categories = useMemo(() => {
    const present = new Set(posts.map((p) => normalizeCategory(p.category)));
    return BLOG_CATEGORY_ORDER.filter((c) => present.has(c));
  }, [posts]);

  const filtered = useMemo(
    () => (activeCategory ? searched.filter((p) => normalizeCategory(p.category) === activeCategory) : searched),
    [searched, activeCategory],
  );

  const hasFilters = searchQuery.trim().length > 0 || activeCategory !== null;
  // Artículo destacado: solo en la primera página y sin filtros
  const featured = hasFilters ? undefined : filtered.find((p) => p.featured) ?? filtered[0];
  const lead = currentPage === 1 ? featured : undefined;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;
  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
  const pagePosts = rest.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog de Detailing Profesional',
    description: 'Artículos, guías y consejos sobre detailing profesional, PPF, car wrapping y cómo montar tu propio negocio de detailing.',
    url: `${BASE_URL}/blog`,
    mainEntity: {
      '@type': 'Blog',
      name: 'Blog de Academia Detail - Detailing Profesional',
      url: `${BASE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'Academia Detail',
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`,
      },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${BASE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        author: { '@type': 'Person', name: post.author.name },
        image: post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image || '/og-image.png'}`,
      })),
    },
  };

  return (
    <>
      <SEO
        title="Blog Detailing Profesional | Guías y Consejos"
        description="Guías y consejos sobre detailing profesional, PPF, car wrapping y cómo montar tu negocio de detailing, escritos por el equipo de Detail Park en Alicante."
        keywords="blog detailing, guías detailing profesional, consejos car wrapping, artículos PPF, montar negocio detailing, tips pulido coches"
        url="/blog"
        // Solo con la lista completa: si el marcado cambia al llegar los datos, Helmet deja el antiguo duplicado
        schema={isLoading ? [] : [blogSchema]}
      />
      <MainLayout>
        <section className="ds-hero border-b border-white/[0.06]">
          <div className="ds-container pt-2">
            <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />
          </div>
          <div className="ds-container pb-10 pt-4 md:pb-14">
            <p className="ds-pill mb-5">Blog</p>
            <h1 className="ds-h1 max-w-3xl text-foreground">Blog de detailing <span className="ds-text-gradient">profesional</span></h1>
            <p className="ds-lead mt-5 max-w-2xl">
              Guías y consejos sobre pulido, tratamientos cerámicos, PPF, wrapping y cómo montar tu propio negocio de detailing,
              escritos por el equipo de Detail Park.
            </p>
          </div>
        </section>

        <section ref={listRef} className="ds-section-sm scroll-mt-20 bg-background" aria-label="Artículos del blog">
          <div className="ds-container">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <BlogCategories
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                counts={counts}
              />
              <div className="lg:w-80">
                <BlogSearch onSearch={handleSearch} initialValue={initialQuery} />
              </div>
            </div>

            {hasFilters && (
              <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'artículo' : 'artículos'}
                {activeCategory && ` en ${BLOG_CATEGORY_LABELS[activeCategory]}`}
                {searchQuery.trim() && ` para «${searchQuery.trim()}»`}
              </p>
            )}

            {filtered.length === 0 ? (
              <div className="ds-card px-6 py-12 text-center">
                <p className="text-lg font-semibold text-foreground">No hay artículos con esa búsqueda</p>
                <p className="mt-1 text-sm text-muted-foreground">Prueba con otra palabra o elige «Todos».</p>
              </div>
            ) : (
              <>
                {lead && (
                  <div className="mb-6">
                    <BlogCard post={lead} wide headingLevel="h2" />
                  </div>
                )}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pagePosts.map((post) => (
                    <BlogCard key={post.slug} post={post} headingLevel="h2" />
                  ))}
                </div>
                <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </section>

        <Suspense fallback={<div className="ds-section-sm" aria-hidden="true" />}>
          <CtaBand />
        </Suspense>
      </MainLayout>
    </>
  );
}
