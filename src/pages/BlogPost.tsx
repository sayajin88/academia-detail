import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogPostCTA } from '@/components/blog/BlogPostCTA';
import { BlogDilutionBanner } from '@/components/blog/BlogDilutionBanner';
import { BlogDirectoryBanner } from '@/components/blog/BlogDirectoryBanner';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { PageBreadcrumbs } from '@/components/shared/PageBreadcrumbs';
import { getRelatedPosts, categoryLabels, categoryColors } from '@/data/blogPosts';
import { useDbBlogPost } from '@/hooks/useBlogPosts';

const BASE_URL = 'https://academiadetail.com';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useDbBlogPost(slug);
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

  if (isLoading) {
    return <MainLayout><div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div></MainLayout>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post);
  const fullUrl = `/blog/${post.slug}`;

  const postImage = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": postImage,
    "datePublished": post.publishedAt,
    "dateModified": (post as any).updatedAt || post.publishedAt,
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
    "isPartOf": { "@type": "Blog", "@id": `${BASE_URL}/blog`, "name": "Blog de Academia Detail" },
    "articleSection": categoryLabels[post.category],
    "wordCount": post.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0),
    "keywords": post.tags.join(', '),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".blog-excerpt"]
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": post.author.name,
    "jobTitle": post.author.role,
    "worksFor": { "@type": "Organization", "name": "Academia Detail", "url": BASE_URL },
    "sameAs": ["https://www.instagram.com/danidetailoficial/"]
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
      <SEO
        title={`${post.title} | Blog Academia Detail`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={fullUrl}
        type="article"
        image={postImage}
        schema={[articleSchema, breadcrumbSchema, personSchema]}
      />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article ref={articleRef}>
        {/* Immersive Hero */}
        <AnimatedSection animation="fade-in" duration="fast">
          <header className="relative w-full overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 min-h-[420px] md:min-h-[500px]">
              <img
                src={post.image}
                alt={post.imageAlt}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
            </div>

            {/* Hero content */}
            <div className="relative container mx-auto px-4 pt-32 md:pt-44 pb-10 md:pb-14 min-h-[420px] md:min-h-[500px] flex flex-col justify-end">
              {/* Breadcrumbs */}
              <div className="absolute top-28 md:top-36 left-4 right-4">
                <PageBreadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
              </div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[post.category]}`}>
                  {categoryLabels[post.category]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-muted/60 text-foreground/80 border border-border/50 backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl"
                style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
              >
                {post.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author.role}</span>
                    <span>·</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* Body: 2-column layout */}
        <div className="container mx-auto px-4 pt-8 md:pt-12 pb-16 md:pb-24">
          <div className="flex gap-8 lg:gap-12">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <AnimatedSection animation="fade-up" delay={100}>
                <BlogShareButtons title={post.title} url={fullUrl} />
              </AnimatedSection>
              <div className="mt-8">
                <BlogArticleContent sections={post.sections} />
              </div>

              {/* Dilution Calculator Banner */}
              <BlogDilutionBanner />
              <BlogDirectoryBanner />

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

              {/* CTA section (replaces newsletter) */}
              <BlogPostCTA />

              {/* Related posts */}
              <AnimatedSection animation="fade-up" delay={150}>
                <BlogRelatedPosts posts={relatedPosts} />
              </AnimatedSection>
            </div>

            {/* Sidebar - right (desktop) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <BlogSidebar readProgress={readProgress} readingTime={post.readingTime} />
            </div>
          </div>

          {/* Mobile sidebar (after content) */}
          <div className="lg:hidden mt-12">
            <BlogSidebar readProgress={readProgress} readingTime={post.readingTime} />
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
