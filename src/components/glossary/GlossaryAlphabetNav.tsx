import { cn } from '@/lib/utils';

interface GlossaryAlphabetNavProps {
  letters: string[];
  activeLetter: string | null;
  availableLetters: string[];
}

/** Índice alfabético fijo bajo la cabecera mientras se recorre la lista. */
export function GlossaryAlphabetNav({ letters, activeLetter, availableLetters }: GlossaryAlphabetNavProps) {
  return (
    <nav aria-label="Índice alfabético" className="-mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
      <ol className="flex min-w-max gap-1 md:min-w-0 md:justify-between">
        {letters.map((letter) => {
          const available = availableLetters.includes(letter);
          const active = activeLetter === letter;
          return (
            <li key={letter}>
              {available ? (
                <a
                  href={`#letra-${letter}`}
                  aria-current={active ? 'location' : undefined}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold transition-colors',
                    active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-white/[0.06] hover:text-brand',
                  )}
                >
                  {letter}
                </a>
              ) : (
                <span className="flex h-9 w-9 items-center justify-center text-sm font-bold text-muted-foreground/40" aria-hidden="true">
                  {letter}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
