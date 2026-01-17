import { GalleryCategory, categoryLabels } from '@/data/galleryData';

interface GalleryFiltersProps {
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
  counts: Record<GalleryCategory, number>;
}

const categories: GalleryCategory[] = ['all', 'detailing', 'wrapping', 'ppf', 'restauracion'];

export function GalleryFilters({ activeCategory, onCategoryChange, counts }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
              : 'bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/30'
          }`}
        >
          {categoryLabels[category]}
          <span
            className={`ml-2 text-xs ${
              activeCategory === category ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}
          >
            ({counts[category]})
          </span>
        </button>
      ))}
    </div>
  );
}
