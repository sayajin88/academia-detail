import type { GlossaryTerm } from '@/data/glossaryData';
import { getTermsByLetter } from '@/data/glossaryData';
import { GlossaryTermCard } from './GlossaryTermCard';

interface GlossaryGridProps {
  terms: GlossaryTerm[];
}

export function GlossaryGrid({ terms }: GlossaryGridProps) {
  const grouped = getTermsByLetter(terms);
  const sortedLetters = Object.keys(grouped).sort();

  if (terms.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">No se encontraron términos</p>
        <p className="text-sm text-muted-foreground/60 mt-2">Prueba con otro término o categoría</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sortedLetters.map((letter) => (
        <section key={letter} id={`letra-${letter}`} className="scroll-mt-28">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-4xl md:text-5xl font-black text-primary/80 leading-none select-none">
              {letter}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            <span className="text-xs text-muted-foreground/50 font-medium">
              {grouped[letter].length} {grouped[letter].length === 1 ? 'término' : 'términos'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grouped[letter].map((term) => (
              <GlossaryTermCard key={term.term} term={term} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
