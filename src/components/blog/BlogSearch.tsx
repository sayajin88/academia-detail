import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div role="search" className="relative">
      {/* Mobile: icon toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Buscar artículos"
      >
        <Search className="h-4.5 w-4.5" />
      </button>

      {/* Desktop: always visible | Mobile: expandable */}
      <div className={`${expanded ? 'absolute right-0 top-0 w-[260px] z-10' : 'hidden'} md:block`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar artículos..."
            aria-label="Buscar artículos en el blog"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-56 lg:w-64 pl-9 pr-9 py-2 bg-muted/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:bg-card transition-all"
          />
          {(query || expanded) && (
            <button
              onClick={() => { setQuery(''); setExpanded(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
