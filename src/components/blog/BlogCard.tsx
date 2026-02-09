import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Category badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>

          {/* Reading time badge */}
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-medium rounded-full bg-background/70 text-foreground backdrop-blur-sm border border-border/50 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-200" style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <time dateTime={post.publishedAt} className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
