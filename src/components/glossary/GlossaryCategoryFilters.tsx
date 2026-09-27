import { Car, Armchair, Shield, Wrench, FlaskConical, Cog } from 'lucide-react';
import type { GlossaryCategory } from '@/data/glossaryData';
import { categoryLabels } from '@/data/glossaryData';

interface GlossaryCategoryFiltersProps {
  activeCategory: GlossaryCategory | 'all';
  onCategoryChange: (category: GlossaryCategory | 'all') => void;
  counts: Record<string, number>;
}

const categoryIcons: Record<GlossaryCategory, React.ElementType> = {
  exterior: Car,
  interior: Armchair,
  protecciones: Shield,
  herramientas: Wrench,
  quimicos: FlaskConical,
  tecnicas: Cog,
};

export function GlossaryCategoryFilters({ activeCategory, onCategoryChange, counts }: GlossaryCategoryFiltersProps) {
  const categories: (GlossaryCategory | 'all')[] = ['all', 'exterior', 'interior', 'protecciones', 'herramientas', 'quimicos', 'tecnicas'];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const Icon = cat !== 'all' ? categoryIcons[cat] : null;
        const label = cat === 'all' ? 'Todos' : categoryLabels[cat];
        const count = cat === 'all' ? counts['all'] : (counts[cat] || 0);

        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              isActive
                ? 'bg-primary/20 text-brand border-primary/40 shadow-sm shadow-primary/10'
                : 'bg-card/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary/30' : 'bg-muted/50'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
