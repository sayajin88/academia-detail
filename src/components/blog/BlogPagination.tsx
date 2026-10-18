import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

const btn = 'inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors';
const quiet = 'border border-border bg-card text-muted-foreground hover:border-white/25 hover:text-foreground';

/** URL de cada página del blog: la 1 es /blog y las demás /blog/pagina/N. */
export const blogPageUrl = (page: number) => (page <= 1 ? '/blog' : `/blog/pagina/${page}`);

// Enlaces de verdad (no botones) para que Google y los demás rastreadores lleguen a los
// artículos de la página 2 en adelante (18-10-2026: OpenSEO los marcaba como huérfanos).
export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'gap')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== 'gap') pages.push('gap');
  }

  const arrow = (page: number, label: string, children: ReactNode) =>
    page < 1 || page > totalPages ? (
      <span aria-hidden="true" className={cn(btn, 'border border-border bg-card text-foreground opacity-40')}>
        {children}
      </span>
    ) : (
      <Link to={blogPageUrl(page)} rel={page < currentPage ? 'prev' : 'next'} aria-label={label} className={cn(btn, 'border border-border bg-card text-foreground hover:border-white/25')}>
        {children}
      </Link>
    );

  return (
    <nav aria-label="Paginación del blog" className="mt-12 flex items-center justify-center gap-1.5">
      {arrow(currentPage - 1, 'Página anterior', <ChevronLeft className="h-4 w-4" aria-hidden="true" />)}
      {pages.map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-muted-foreground" aria-hidden="true">…</span>
        ) : (
          <Link
            key={p}
            to={blogPageUrl(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            aria-label={`Página ${p}`}
            className={cn(btn, p === currentPage ? 'bg-primary text-primary-foreground' : quiet)}
          >
            {p}
          </Link>
        ),
      )}
      {arrow(currentPage + 1, 'Página siguiente', <ChevronRight className="h-4 w-4" aria-hidden="true" />)}
    </nav>
  );
}
