import { BlogCategory, categoryLabels } from '@/data/blogPosts';

interface BlogCategoriesProps {
  activeCategory: BlogCategory | null;
  onCategoryChange: (category: BlogCategory | null) => void;
}

const categories: (BlogCategory | null)[] = [null, 'detailing', 'ppf', 'wrapping', 'negocios'];

export function BlogCategories({ activeCategory, onCategoryChange }: BlogCategoriesProps) {
  return (
    <nav
      aria-label="Filtrar por categoría"
      className="relative flex items-center gap-1 overflow-x-auto scrollbar-hide pb-1 -mb-1"
    >
      {categories.map((cat) => (
        <button
          key={cat ?? 'all'}
          onClick={() => onCategoryChange(cat)}
          className={`relative px-3.5 py-2 min-h-[36px] text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-lg ${
            activeCategory === cat
              ? 'text-brand bg-primary/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          {cat ? categoryLabels[cat] : 'Todos'}
          {activeCategory === cat && (
            <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
      {/* Fade gradient indicator for horizontal scroll on mobile */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" aria-hidden="true" />
    </nav>
  );
}
