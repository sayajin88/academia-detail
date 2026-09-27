import type { GlossaryCategory } from '@/data/glossaryData';
import { categoryLabels } from '@/data/glossaryData';
import { cn } from '@/lib/utils';

interface GlossaryCategoryFiltersProps {
  activeCategory: GlossaryCategory | 'all';
  onCategoryChange: (category: GlossaryCategory | 'all') => void;
  counts: Record<string, number>;
}

const categories: (GlossaryCategory | 'all')[] = ['all', 'exterior', 'interior', 'protecciones', 'herramientas', 'quimicos', 'tecnicas'];

export function GlossaryCategoryFilters({ activeCategory, onCategoryChange, counts }: GlossaryCategoryFiltersProps) {
  return (
    <div role="group" aria-label="Filtrar por categoría" className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {categories.map((cat) => {
        const active = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            aria-pressed={active}
            className={cn(
              'inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-white/25 hover:text-foreground',
            )}
          >
            {cat === 'all' ? 'Todos' : categoryLabels[cat]}
            <span className={cn('text-xs font-normal', active ? 'text-white/80' : 'text-muted-foreground')}>{counts[cat] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
