import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';

interface BlogHeroProps {
  post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-border group">
      {/* Background image with parallax-like effect */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated decorative gradient */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end p-6 md:p-10 lg:p-14 min-h-[320px] md:min-h-[400px] lg:min-h-[440px] max-w-2xl">
        {/* Accent line */}
        <div className="w-1 h-8 bg-primary rounded-full mb-4 hidden md:block" />

        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex w-fit px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/10 text-brand border border-primary/20">
            <Sparkles className="h-3 w-3" />
            Destacado
          </span>
        </div>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3"
          style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
        >
          {post.title}
        </h2>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link to={`/blog/${post.slug}`}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 group/btn">
              Leer artículo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
