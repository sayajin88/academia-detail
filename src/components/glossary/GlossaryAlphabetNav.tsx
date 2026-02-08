interface GlossaryAlphabetNavProps {
  letters: string[];
  activeLetter: string | null;
  availableLetters: string[];
}

export function GlossaryAlphabetNav({ letters, activeLetter, availableLetters }: GlossaryAlphabetNavProps) {
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letra-${letter}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop - Sticky sidebar */}
      <nav
        aria-label="Navegación alfabética"
        className="hidden lg:flex flex-col gap-1 sticky top-24"
      >
        {letters.map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          const isActive = activeLetter === letter;

          return (
            <button
              key={letter}
              onClick={() => isAvailable && scrollToLetter(letter)}
              disabled={!isAvailable}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-110'
                  : isAvailable
                    ? 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                    : 'text-muted-foreground/30 cursor-not-allowed'
              }`}
              aria-label={`Ir a la letra ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </nav>

      {/* Mobile - Horizontal scroll */}
      <nav
        aria-label="Navegación alfabética"
        className="lg:hidden flex gap-1 overflow-x-auto pb-2 scrollbar-hide"
      >
        {letters.map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          const isActive = activeLetter === letter;

          return (
            <button
              key={letter}
              onClick={() => isAvailable && scrollToLetter(letter)}
              disabled={!isAvailable}
              className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                  : isAvailable
                    ? 'text-foreground/70 hover:bg-primary/10 hover:text-primary'
                    : 'text-muted-foreground/30 cursor-not-allowed'
              }`}
              aria-label={`Ir a la letra ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </nav>
    </>
  );
}
