import { BlogSearch } from '@/components/blog/BlogSearch';

interface GlossarySearchProps {
  onSearch: (query: string) => void;
}

/** Mismo buscador que el blog. */
export function GlossarySearch({ onSearch }: GlossarySearchProps) {
  return <BlogSearch onSearch={onSearch} placeholder="Busca un término: PPF, clay bar…" label="Buscar en el glosario" />;
}
