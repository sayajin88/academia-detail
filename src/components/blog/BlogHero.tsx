import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';

interface BlogHeroProps {
  post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-border">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end p-6 md:p-10 lg:p-14 min-h-[320px] md:min-h-[400px] lg:min-h-[440px] max-w-2xl">
        <span className={`inline-flex w-fit px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${categoryColors[post.category]}`}>
          {categoryLabels[post.category]}
        </span>

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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 group">
              Leer artículo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
