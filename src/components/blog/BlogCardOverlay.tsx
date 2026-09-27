import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/data/blogPosts';

interface BlogCardOverlayProps {
  post: BlogPost;
}

export function BlogCardOverlay({ post }: BlogCardOverlayProps) {
  return (
    <article className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Category badge */}
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold rounded-full border backdrop-blur-sm ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/blog/${post.slug}`} className="block flex-1">
          <h3
            className="text-foreground font-bold text-sm md:text-[15px] leading-snug line-clamp-2 mb-2 group-hover:text-brand transition-colors"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {post.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        </Link>

        {/* Author + metadata */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          {post.author.image && (
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              loading="lazy"
            />
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground min-w-0">
            <span className="font-medium text-foreground/80 truncate">{post.author.name}</span>
            <span className="text-muted-foreground/40">·</span>
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
