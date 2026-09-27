import type { GlossaryTerm } from '@/data/glossaryData';
import { getTermsByLetter } from '@/data/glossaryData';
import { GlossaryTermRow } from './GlossaryTermCard';

interface GlossaryGridProps {
  terms: GlossaryTerm[];
}

/** Términos agrupados por letra, en columnas (1 en móvil, 2 en tableta, 3 en escritorio). */
export function GlossaryGrid({ terms }: GlossaryGridProps) {
  if (terms.length === 0) {
    return (
      <div className="ds-card px-6 py-12 text-center">
        <p className="text-lg font-semibold text-foreground">No hay términos con esa búsqueda</p>
        <p className="mt-1 text-sm text-muted-foreground">Prueba con otra palabra o elige «Todos».</p>
      </div>
    );
  }

  const grouped = getTermsByLetter(terms);
  const letters = Object.keys(grouped).sort();

  return (
    <div className="gap-5 sm:columns-2 lg:columns-3">
      {letters.map((letter) => (
        <section
          key={letter}
          id={`letra-${letter}`}
          aria-labelledby={`letra-${letter}-title`}
          className="ds-card mb-4 scroll-mt-40 overflow-hidden break-inside-avoid md:mb-5"
        >
          <h2 id={`letra-${letter}-title`} className="border-b border-border px-4 py-2 text-3xl text-brand md:px-5">
            {letter}
          </h2>
          <ul className="divide-y divide-border">
            {grouped[letter].map((term) => (
              <li key={term.term}>
                <GlossaryTermRow term={term} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
