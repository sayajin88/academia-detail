import { useState, useCallback, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { GlossarySearch } from '@/components/glossary/GlossarySearch';
import { GlossaryCategoryFilters } from '@/components/glossary/GlossaryCategoryFilters';
import { GlossaryAlphabetNav } from '@/components/glossary/GlossaryAlphabetNav';
import { GlossaryGrid } from '@/components/glossary/GlossaryGrid';
import { GlossaryEducationalSections } from '@/components/glossary/GlossaryEducationalSections';
import { glossaryTerms, getAvailableLetters } from '@/data/glossaryData';
import type { GlossaryCategory } from '@/data/glossaryData';
import { BookOpen } from 'lucide-react';
import heroGlosario from '@/assets/heroes/hero-glosario.jpg';
import { VisualDilutionCalculator } from '@/components/glossary/VisualDilutionCalculator';

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Glossary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let result = glossaryTerms;

    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(t =>
        t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  const availableLetters = useMemo(() => {
    return [...new Set(filteredTerms.map(t => t.letter))].sort();
  }, [filteredTerms]);

  const counts = useMemo(() => {
    const base = searchQuery.trim()
      ? glossaryTerms.filter(t => {
          const q = searchQuery.toLowerCase().trim();
          return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
        })
      : glossaryTerms;

    const result: Record<string, number> = { all: base.length };
    base.forEach(t => {
      result[t.category] = (result[t.category] || 0) + 1;
    });
    return result;
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((cat: GlossaryCategory | 'all') => {
    setActiveCategory(cat);
  }, []);

  // Track active letter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const allLetters = getAvailableLetters();
      let current: string | null = null;

      for (const letter of allLetters) {
        const el = document.getElementById(`letra-${letter}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = letter;
          }
        }
      }
      setActiveLetter(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const glossarySeo = seoConfig.glossary;

  return (
    <MainLayout>
      <SEO
        title={glossarySeo.title}
        description={glossarySeo.description}
        keywords={glossarySeo.keywords}
        url={glossarySeo.url}
        schema={glossarySeo.schema}
      />

      {/* Hero with background image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroGlosario})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Glosario Profesional · +{glossaryTerms.length} términos
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
              Glosario de{' '}
              <span className="text-primary">Detailing Profesional</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Domina el lenguaje técnico del Car Detailing. Desde PPF hasta descontaminación química, todos los términos que necesitas conocer.
            </p>

            {/* Search */}
            <GlossarySearch onSearch={handleSearch} />

            {/* Category Filters */}
            <div className="mt-6">
              <GlossaryCategoryFilters
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                counts={counts}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Educational Sections */}
      <GlossaryEducationalSections />

      {/* Dilution Calculator */}
      <section className="py-16 bg-card/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <VisualDilutionCalculator />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Mobile Alphabet Nav */}
          <div className="mb-6 lg:hidden">
            <GlossaryAlphabetNav
              letters={ALL_LETTERS}
              activeLetter={activeLetter}
              availableLetters={availableLetters}
            />
          </div>

          <div className="flex gap-8">
            {/* Desktop Alphabet Nav */}
            <aside className="hidden lg:block w-12 flex-shrink-0">
              <GlossaryAlphabetNav
                letters={ALL_LETTERS}
                activeLetter={activeLetter}
                availableLetters={availableLetters}
              />
            </aside>

            {/* Terms Grid */}
            <div className="flex-1 min-w-0">
              <GlossaryGrid terms={filteredTerms} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Quieres dominar estas técnicas en la práctica?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            En Academia Detail aprenderás todos estos conceptos de forma práctica en un taller real con vehículos de alta gama.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/curso-detailing-profesional"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Ver cursos disponibles
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-card border border-border text-foreground font-semibold hover:border-primary/30 transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Glossary;
