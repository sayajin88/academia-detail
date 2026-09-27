import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import { cn } from '@/lib/utils';
import { categoryLabel, formatPostDate } from './blogUtils';

interface BlogCardProps {
  post: BlogPost;
  /** Tarjeta ancha (imagen a la izquierda) para el artículo destacado */
  wide?: boolean;
  headingLevel?: 'h2' | 'h3';
}

/** Tarjeta de artículo: misma proporción de imagen, título, entradilla y fecha en todo el blog. */
export function BlogCard({ post, wide = false, headingLevel: Heading = 'h3' }: BlogCardProps) {
  return (
    <article
      className={cn(
        'ds-card group relative flex flex-col overflow-hidden transition-colors hover:border-white/25',
        wide && 'md:grid md:grid-cols-2',
      )}
    >
      <div className={cn('aspect-[16/10] overflow-hidden bg-muted', wide && 'md:aspect-auto md:h-full')}>
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={cn('flex flex-1 flex-col gap-3 p-5 md:p-6', wide && 'md:justify-center md:gap-4 md:p-10')}>
        <p className="ds-eyebrow">{categoryLabel(post.category)}</p>
        <Heading
          className={cn(
            'font-sans text-lg font-bold normal-case leading-snug tracking-normal text-foreground',
            wide && 'md:text-2xl',
          )}
        >
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
            {post.title}
          </Link>
        </Heading>
        <p className={cn('line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground', wide && 'md:flex-none md:text-base')}>
          {post.excerpt}
        </p>
        <div className="mt-1 flex items-center justify-between gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, 'short')}</time>
            <span aria-hidden="true"> · </span>
            {post.readingTime} de lectura
          </p>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
