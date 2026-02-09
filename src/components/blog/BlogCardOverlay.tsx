import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/data/blogPosts';

interface BlogCardOverlayProps {
  post: BlogPost;
  /** Render a taller card for bento hero usage */
  tall?: boolean;
}

export function BlogCardOverlay({ post, tall = false }: BlogCardOverlayProps) {
  return (
    <article className="group flex flex-col">
      <Link to={`/blog/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-xl ${
            tall ? 'aspect-[3/4] lg:aspect-auto lg:h-full min-h-[320px]' : 'aspect-[3/4]'
          }`}
        >
          {/* Background image */}
          <img
            src={post.image}
            alt={post.imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category badge */}
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full border ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </span>

          {/* Title area at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3
              className="text-white font-bold text-sm md:text-base leading-snug line-clamp-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              }}
            >
              {post.title}
            </h3>
          </div>
        </div>
      </Link>

      {/* Metadata below the card */}
      <div className="flex items-center gap-2 mt-2 px-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{post.readingTime}</span>
        <span className="text-muted-foreground/40">·</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>
      </div>
    </article>
  );
}
