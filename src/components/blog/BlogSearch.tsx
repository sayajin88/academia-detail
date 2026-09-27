import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  label?: string;
}

/** Buscador con espera de 250 ms para no filtrar en cada pulsación. */
export function BlogSearch({
  onSearch,
  initialValue = '',
  placeholder = 'Buscar artículos',
  label = 'Buscar en el blog',
}: BlogSearchProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 250);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div role="search" className="relative w-full">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-[0.9375rem] text-foreground placeholder:text-muted-foreground focus:border-white/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Borrar búsqueda"
          className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
