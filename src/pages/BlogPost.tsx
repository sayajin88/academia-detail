import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogTableOfContents } from '@/components/blog/BlogTableOfContents';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogNewsletter } from '@/components/blog/BlogNewsletter';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { getPostBySlug, getRelatedPosts, categoryLabels, categoryColors } from '@/data/blogPosts';

const BASE_URL = 'https://academiadetail.com';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(100, Math.max(0, ((scrollY - top + windowHeight * 0.3) / height) * 100));
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post);
  const fullUrl = `/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": typeof post.image === 'string' ? post.image : `${BASE_URL}/og-image.png`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "worksFor": { "@type": "Organization", "name": "Academia Detail" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Academia Detail",
      "url": BASE_URL,
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.png` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}${fullUrl}` },
    "articleSection": categoryLabels[post.category],
    "wordCount": post.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0),
    "keywords": post.tags.join(', ')
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}${fullUrl}` }
    ]
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{`${post.title} | Blog Academia Detail`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`${BASE_URL}${fullUrl}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`${BASE_URL}${fullUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={typeof post.image === 'string' ? post.image : `${BASE_URL}/og-image.png`} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={categoryLabels[post.category]} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article ref={articleRef} className="pt-24 md:pt-28 pb-16 md:pb-24">
        {/* Hero */}
        <AnimatedSection animation="fade-in" duration="fast">
          <header className="relative w-full overflow-hidden mb-8 md:mb-12">
            <div className="absolute inset-0 h-[340px] md:h-[440px]">
              <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
            </div>
            <div className="relative container mx-auto px-4 pt-36 md:pt-52 pb-6">
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </span>
              <h1
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 max-w-3xl"
                style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* Body */}
        <div className="container mx-auto px-4">
          <div className="flex gap-8 xl:gap-12">
            {/* TOC - left */}
            <div className="hidden xl:block w-56 flex-shrink-0">
              <BlogTableOfContents sections={post.sections} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <AnimatedSection animation="fade-up" delay={100}>
                <BlogShareButtons title={post.title} url={fullUrl} />
              </AnimatedSection>
              <div className="mt-8">
                <BlogArticleContent sections={post.sections} />
              </div>

              {/* Tags */}
              <AnimatedSection animation="fade-up" delay={50}>
                <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border">
                      #{tag}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              {/* Share again at bottom */}
              <div className="mt-6">
                <BlogShareButtons title={post.title} url={fullUrl} />
              </div>

              {/* Newsletter */}
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="mt-10">
                  <BlogNewsletter variant="standalone" />
                </div>
              </AnimatedSection>

              {/* Related posts */}
              <AnimatedSection animation="fade-up" delay={150}>
                <BlogRelatedPosts posts={relatedPosts} />
              </AnimatedSection>
            </div>

            {/* Sidebar - right */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <BlogSidebar />
            </div>
          </div>

          {/* Mobile sidebar (after content) */}
          <div className="lg:hidden mt-12">
            <BlogSidebar />
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
