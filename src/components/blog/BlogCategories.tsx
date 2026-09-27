import { cn } from '@/lib/utils';
import { BLOG_CATEGORY_LABELS } from './blogUtils';

interface BlogCategoriesProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  counts: Record<string, number>;
}

/** Filtro por categoría (chips). */
export function BlogCategories({ categories, activeCategory, onCategoryChange, counts }: BlogCategoriesProps) {
  const items: (string | null)[] = [null, ...categories];
  return (
    <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
      {items.map((cat) => {
        const active = activeCategory === cat;
        return (
          <button
            key={cat ?? 'all'}
            type="button"
            onClick={() => onCategoryChange(cat)}
            aria-pressed={active}
            className={cn(
              'inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-white/25 hover:text-foreground',
            )}
          >
            {cat ? BLOG_CATEGORY_LABELS[cat] ?? cat : 'Todos'}
            <span className={cn('text-xs font-normal', active ? 'text-white/80' : 'text-muted-foreground')}>
              {cat ? counts[cat] ?? 0 : counts.all}
            </span>
          </button>
        );
      })}
    </div>
  );
}
