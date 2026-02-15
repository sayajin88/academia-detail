import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  };

  return (
    <nav aria-label="Paginación del blog" className="flex flex-col items-center gap-3 mt-10">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === 'ellipsis' ? (
            <span key={`e-${idx}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground/50 text-sm">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <span className="text-xs text-muted-foreground/60">
        Página {currentPage} de {totalPages}
      </span>
    </nav>
  );
}
