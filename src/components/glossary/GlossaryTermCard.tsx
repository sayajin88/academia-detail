import type { GlossaryTerm } from '@/data/glossaryData';
import { categoryLabels, categoryColors } from '@/data/glossaryData';

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <article className="group bg-card/80 border border-border/60 rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">
          {term.term}
        </h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-md border whitespace-nowrap ${categoryColors[term.category]}`}>
          {categoryLabels[term.category]}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {term.definition}
      </p>
    </article>
  );
}
