import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { seoConfig } from '@/utils/seoConfig';
import { GlossarySearch } from '@/components/glossary/GlossarySearch';
import { GlossaryCategoryFilters } from '@/components/glossary/GlossaryCategoryFilters';
import { GlossaryAlphabetNav } from '@/components/glossary/GlossaryAlphabetNav';
import { GlossaryGrid } from '@/components/glossary/GlossaryGrid';
import { glossaryTerms } from '@/data/glossaryData';
import type { GlossaryCategory } from '@/data/glossaryData';
import { STATS } from '@/data/site';

const GlossaryEducationalSections = lazy(() =>
  import('@/components/glossary/GlossaryEducationalSections').then((m) => ({ default: m.GlossaryEducationalSections })),
);
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const TOTAL_TERMS = glossaryTerms.length;

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const matches = (q: string) => (t: (typeof glossaryTerms)[number]) => normalize(`${t.term} ${t.definition}`).includes(q);

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const location = useLocation();

  const searched = useMemo(() => {
    const q = normalize(searchQuery.trim());
    return q ? glossaryTerms.filter(matches(q)) : glossaryTerms;
  }, [searchQuery]);

  const filteredTerms = useMemo(
    () => (activeCategory === 'all' ? searched : searched.filter((t) => t.category === activeCategory)),
    [searched, activeCategory],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: searched.length };
    searched.forEach((t) => {
      result[t.category] = (result[t.category] || 0) + 1;
    });
    return result;
  }, [searched]);

  const availableLetters = useMemo(() => [...new Set(filteredTerms.map((t) => t.letter))].sort(), [filteredTerms]);
  const letterKey = availableLetters.join('');

  const handleSearch = useCallback((query: string) => setSearchQuery(query), []);

  // Letra activa del índice: la última cuyo bloque ya ha pasado bajo la barra fija
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = letterKey.split('').map((l) => document.getElementById(`letra-${l}`)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      () => {
        let current: string | null = null;
        for (const el of els) if (el.getBoundingClientRect().top <= 180) current = el.id.replace('letra-', '');
        setActiveLetter(current);
      },
      { rootMargin: '-140px 0px -60% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [letterKey]);

  // Enlaces desde el blog del tipo /glosario-detailing#letra-C
  useEffect(() => {
    if (!location.hash.startsWith('#letra-')) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, [location.hash]);

  const glossarySeo = seoConfig.glossary;

  return (
    <>
      <SEO
        title={glossarySeo.title}
        description={glossarySeo.description}
        keywords={glossarySeo.keywords}
        url={glossarySeo.url}
        schema={glossarySeo.schema}
      />
      <MainLayout>
        <section className="border-b border-border bg-background">
          <div className="ds-container pt-2">
            <Breadcrumbs items={[{ name: 'Glosario de detailing', url: '/glosario-detailing' }]} />
          </div>
          <div className="ds-container flex flex-col gap-6 pb-10 pt-4 md:pb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="ds-eyebrow mb-4">Glosario · {TOTAL_TERMS} términos</p>
              <h1 className="ds-h1 max-w-3xl text-foreground">Glosario de detailing profesional</h1>
              <p className="ds-lead mt-5 max-w-2xl">
                Los términos que vas a oír en un taller de detailing, explicados en pocas palabras: pulido, protecciones, químicos,
                herramientas y técnicas.
              </p>
            </div>
            <Link
              to="/calculadora-dilucion-detailing"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Calculadora de dilución de productos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-background pb-16 pt-8 md:pb-24 md:pt-10" aria-label="Términos del glosario">
          <div className="ds-container">
            <div className="flex flex-col gap-4">
              <div className="sm:max-w-md">
                <GlossarySearch onSearch={handleSearch} />
              </div>
              <GlossaryCategoryFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} counts={counts} />
            </div>
          </div>

          <div className="sticky top-16 z-30 mt-6 border-y border-border bg-background/95 py-2 backdrop-blur md:top-[72px]">
            <div className="ds-container">
              <GlossaryAlphabetNav letters={ALL_LETTERS} activeLetter={activeLetter} availableLetters={availableLetters} />
            </div>
          </div>

          <div className="ds-container mt-8">
            <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
              {filteredTerms.length === TOTAL_TERMS
                ? `${TOTAL_TERMS} términos`
                : `${filteredTerms.length} de ${TOTAL_TERMS} términos`}
            </p>
            <GlossaryGrid terms={filteredTerms} />
          </div>
        </section>

        <Suspense fallback={<div className="ds-section" aria-hidden="true" />}>
          <GlossaryEducationalSections />
          <CtaBand
            title="¿Quieres aprenderlo en la práctica?"
            text={`En los cursos de Academia Detail trabajas estos conceptos con coches reales en el taller de Detail Park, en grupos de ${STATS.maxAlumnosGrupo} alumnos como máximo.`}
          />
        </Suspense>
      </MainLayout>
    </>
  );
}
