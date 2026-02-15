import { Link } from 'react-router-dom';
import type { GlossaryTerm } from '@/data/glossaryData';
import { categoryLabels, categoryColors, categoryBorderLeft, generateSlug } from '@/data/glossaryData';

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Link to={`/glosario-detailing/${generateSlug(term.term)}`} className="block">
      <article className={`group bg-card/80 border border-border/60 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300 border-l-[3px] ${categoryBorderLeft[term.category]}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-monument text-foreground text-lg tracking-wide leading-tight group-hover:text-primary transition-colors">
            {term.term}
          </h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${categoryColors[term.category]}`}>
            {categoryLabels[term.category]}
          </span>
        </div>
        <p className="text-[15px] text-muted-foreground leading-relaxed">
          {term.definition}
        </p>
      </article>
    </Link>
  );
}
