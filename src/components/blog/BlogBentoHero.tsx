import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost, blogPosts, categoryLabels, categoryColors } from '@/data/blogPosts';

interface BlogBentoHeroProps {
  featuredPost: BlogPost;
}

export function BlogBentoHero({ featuredPost }: BlogBentoHeroProps) {
  const secondaryPost = blogPosts.filter(p => !p.featured && p.id !== featuredPost.id)[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Featured post (large) */}
      <Link
        to={`/blog/${featuredPost.slug}`}
        className="lg:col-span-2 group relative overflow-hidden rounded-xl min-h-[280px] md:min-h-[400px] lg:min-h-[460px]"
      >
        <img
          src={featuredPost.image}
          alt={featuredPost.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          fetchPriority="high"
          width={960}
          height={540}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${categoryColors[featuredPost.category]}`}>
              {categoryLabels[featuredPost.category]}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
              <Sparkles className="h-3 w-3" />
              Destacado
            </span>
          </div>

          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-2"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {featuredPost.title}
          </h2>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 max-w-xl line-clamp-2">
            {featuredPost.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
            Leer Reportaje
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Secondary article */}
      {secondaryPost && (
        <Link
          to={`/blog/${secondaryPost.slug}`}
          className="hidden lg:flex group/sec relative overflow-hidden rounded-xl min-h-[280px]"
        >
          <img
            src={secondaryPost.image}
            alt={secondaryPost.imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/sec:scale-105"
            loading="lazy"
            width={480}
            height={460}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border mb-2 ${categoryColors[secondaryPost.category]}`}>
              {categoryLabels[secondaryPost.category]}
            </span>
            <h3
              className="text-white font-bold text-sm leading-snug line-clamp-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              }}
            >
              {secondaryPost.title}
            </h3>
          </div>
        </Link>
      )}
    </div>
  );
}
