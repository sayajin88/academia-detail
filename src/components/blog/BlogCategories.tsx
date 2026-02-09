import { BlogCategory, categoryLabels } from '@/data/blogPosts';

interface BlogCategoriesProps {
  activeCategory: BlogCategory | null;
  onCategoryChange: (category: BlogCategory | null) => void;
}

const categories: (BlogCategory | null)[] = [null, 'detailing', 'ppf', 'wrapping', 'negocios'];

export function BlogCategories({ activeCategory, onCategoryChange }: BlogCategoriesProps) {
  return (
    <nav aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat ?? 'all'}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 min-h-[44px] text-sm font-medium rounded-full border transition-all duration-200 ${
            activeCategory === cat
              ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
              : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
          }`}
        >
          {cat ? categoryLabels[cat] : 'Todos'}
        </button>
      ))}
    </nav>
  );
}
