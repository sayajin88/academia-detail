import { lazy, Suspense, useMemo, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogTableOfContents } from '@/components/blog/BlogTableOfContents';
import { BlogReadingProgress } from '@/components/blog/BlogReadingProgress';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';
import { CoursePromo, courseForBlogCategory } from '@/components/blog/BlogPostCTA';
import { categoryLabel, formatPostDate, getSectionAnchors, pickRelatedPosts } from '@/components/blog/blogUtils';
import { useBlogPosts, useDbBlogPost } from '@/hooks/useBlogPosts';
import { SITE } from '@/data/site';

const BlogRelatedPosts = lazy(() => import('@/components/blog/BlogRelatedPosts').then((m) => ({ default: m.BlogRelatedPosts })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const BASE_URL = 'https://academiadetail.com';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useDbBlogPost(slug);
  const { posts } = useBlogPosts();
  const articleRef = useRef<HTMLElement>(null);

  const anchors = useMemo(() => (post ? getSectionAnchors(post.sections) : []), [post]);
  const related = useMemo(() => (post ? pickRelatedPosts(post, posts) : []), [post, posts]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="ds-container min-h-[70vh] py-24" aria-busy="true" aria-label="Cargando artículo" />
      </MainLayout>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const fullUrl = `/blog/${post.slug}`;
  const postImage = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image || '/og-image.png'}`;
  const toc = post.sections.map((s, i) => ({ id: anchors[i], title: s.title }));
  const isFounder = post.author.name === SITE.founder;
  const updatedAt = (post as { updatedAt?: string }).updatedAt;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: postImage,
    datePublished: post.publishedAt,
    dateModified: updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: { '@type': 'Organization', name: 'Academia Detail' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Academia Detail',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${fullUrl}` },
    isPartOf: { '@type': 'Blog', '@id': `${BASE_URL}/blog`, name: 'Blog de Academia Detail' },
    articleSection: categoryLabel(post.category),
    wordCount: post.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0),
    keywords: post.tags.join(', '),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.blog-excerpt'] },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: post.author.name,
    jobTitle: post.author.role,
    worksFor: { '@type': 'Organization', name: 'Academia Detail', url: BASE_URL },
    sameAs: ['https://www.instagram.com/danidetailoficial/'],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}${fullUrl}` },
    ],
  };

  return (
    <>
      <SEO
        // Marca solo si cabe: Google corta los títulos de más de ~60 caracteres.
        title={post.title.length <= 42 ? `${post.title} | Academia Detail` : post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={fullUrl}
        type="article"
        image={postImage}
        schema={[articleSchema, breadcrumbSchema, personSchema]}
      />
      <MainLayout>
        <BlogReadingProgress targetRef={articleRef} />

        <article ref={articleRef} className="bg-background">
          <div className="ds-container pt-2">
            <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }, { name: post.title, url: fullUrl }]} />
          </div>

          <div className="ds-container grid gap-10 pb-16 pt-4 md:pb-24 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
            <div className="min-w-0">
              <header className="max-w-[68ch] text-[1.0625rem] md:text-lg">
                <p className="ds-pill mb-5">{categoryLabel(post.category)}</p>
                <h1 className="text-[2.25rem] leading-[1.05] text-foreground md:text-[3rem] lg:text-[3.5rem]">{post.title}</h1>
                <p className="blog-excerpt ds-lead mt-5">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={post.author.image}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <p className="text-sm leading-snug text-muted-foreground">
                    <span className="block font-semibold text-foreground">{post.author.name}</span>
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    <span aria-hidden="true"> · </span>
                    {post.readingTime} de lectura
                  </p>
                </div>
              </header>

              {post.image && (
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="mt-8 aspect-[16/9] w-full rounded-xl bg-muted object-cover"
                />
              )}

              <div className="mt-8 lg:hidden">
                <BlogTableOfContents items={toc} variant="collapsible" />
              </div>

              <div className="mt-10">
                <BlogArticleContent sections={post.sections} anchors={anchors} />
              </div>

              <div className="mt-12 max-w-[68ch] space-y-8 text-[1.0625rem] md:text-lg">
                <CoursePromo course={courseForBlogCategory(post.category)} />

                <div className="flex flex-col gap-6 border-t border-border pt-8">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author.image}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 shrink-0 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Escrito por</p>
                      <p className="mt-1 font-bold text-foreground">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">{isFounder ? SITE.founderRole : post.author.role}</p>
                      {isFounder && (
                        <Link to="/quienes-somos" className="mt-2 inline-block text-sm font-semibold text-brand underline underline-offset-4">
                          Conoce al equipo
                        </Link>
                      )}
                    </div>
                  </div>
                  <BlogShareButtons title={post.title} url={fullUrl} />
                </div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <BlogTableOfContents items={toc} />
            </aside>
          </div>
        </article>

        <Suspense fallback={<div className="ds-section" aria-hidden="true" />}>
          <BlogRelatedPosts posts={related} />
          <CtaBand />
        </Suspense>
      </MainLayout>
    </>
  );
}
