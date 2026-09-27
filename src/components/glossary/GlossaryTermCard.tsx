import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { GlossaryTerm } from '@/data/glossaryData';
import { generateSlug } from '@/data/glossaryData';

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

/** Tarjeta compacta: término, definición en dos líneas y enlace a su ficha. */
export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Link
      to={`/glosario-detailing/${generateSlug(term.term)}`}
      className="ds-card group flex h-full flex-col gap-2 p-5 transition-colors hover:border-white/25"
    >
      <h3 className="text-base font-bold text-foreground group-hover:text-brand">{term.term}</h3>
      <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{term.definition}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Ver definición
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Fila de la lista del glosario (dentro del bloque de cada letra). */
export function GlossaryTermRow({ term }: GlossaryTermCardProps) {
  return (
    <Link
      to={`/glosario-detailing/${generateSlug(term.term)}`}
      className="group block px-4 py-2 transition-colors hover:bg-white/[0.04] md:px-5 md:py-3"
    >
      <span className="block text-[0.9375rem] font-semibold text-foreground group-hover:text-brand">{term.term}</span>
      <span className="mt-0.5 line-clamp-1 text-sm leading-relaxed text-muted-foreground md:line-clamp-2">{term.definition}</span>
    </Link>
  );
}
