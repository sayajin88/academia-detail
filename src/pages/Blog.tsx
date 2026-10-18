import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogCategories } from '@/components/blog/BlogCategories';
import { BlogPagination, blogPageUrl } from '@/components/blog/BlogPagination';
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
  // La página va en la URL (/blog/pagina/N) para que cada una se pueda rastrear y enlazar.
  const { page } = useParams<{ page?: string }>();
  const pageParam = page === undefined ? 1 : /^\d+$/.test(page) ? Number(page) : NaN;
  const navigate = useNavigate();
  const listRef = useRef<HTMLElement>(null);
  const { posts, isLoading, isError } = useBlogPosts();

  // Al buscar o filtrar se vuelve a la primera página. El buscador avisa también al
  // montarse (con el texto inicial): eso no cuenta como búsqueda nueva.
  const lastQuery = useRef(initialQuery);
  const handleSearch = useCallback((query: string) => {
    if (query === lastQuery.current) return;
    lastQuery.current = query;
    setSearchQuery(query);
    navigate('/blog', { preventScrollReset: true });
  }, [navigate]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(category);
    navigate('/blog', { preventScrollReset: true });
  }, [navigate]);

  // Al cambiar de página se baja a la lista (no en la primera carga).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ block: 'start' });
  }, [pageParam]);

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
  const currentPage = pageParam;
  const lead = currentPage === 1 ? featured : undefined;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;
  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
  const pagePosts = rest.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // /blog/pagina/1, /blog/pagina/0, /blog/pagina/abc o una página que ya no existe → /blog.
  const pageMissing = !Number.isInteger(currentPage) || currentPage < 1 || (!isLoading && !isError && currentPage > totalPages);
  if (page !== undefined && (currentPage === 1 || pageMissing)) return <Navigate to="/blog" replace />;

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
        title={currentPage > 1 ? `Blog Detailing Profesional | Página ${currentPage}` : 'Blog Detailing Profesional | Guías y Consejos'}
        description={`Guías y consejos sobre detailing profesional, PPF, car wrapping y cómo montar tu negocio de detailing, escritos por el equipo de Detail Park en Alicante.${currentPage > 1 ? ` Página ${currentPage}.` : ''}`}
        keywords="blog detailing, guías detailing profesional, consejos car wrapping, artículos PPF, montar negocio detailing, tips pulido coches"
        url={blogPageUrl(currentPage)}
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
                <BlogPagination currentPage={currentPage} totalPages={totalPages} />
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
