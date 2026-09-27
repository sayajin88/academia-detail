import { lazy, Suspense } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Section, SectionHeader } from '@/components/ds/Section';
import { GlossaryRelatedCourses } from '@/components/glossary/GlossaryRelatedCourses';
import { getTermBySlug, glossaryTerms, categoryLabels, type GlossaryCategory } from '@/data/glossaryData';

const GlossaryTermFAQ = lazy(() => import('@/components/glossary/GlossaryTermFAQ').then((m) => ({ default: m.GlossaryTermFAQ })));
const GlossaryTermCard = lazy(() => import('@/components/glossary/GlossaryTermCard').then((m) => ({ default: m.GlossaryTermCard })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const BASE_URL = 'https://academiadetail.com';

// Cómo encaja cada categoría en el trabajo del taller
const categoryProcesses: Record<GlossaryCategory, string> = {
  exterior:
    'El cuidado exterior profesional sigue un flujo de trabajo sistemático: prelavado con espuma activa, lavado seguro con método de dos cubos, descontaminación química y mecánica, corrección de pintura mediante pulido en varias etapas, y aplicación de protección final (sellador, cera o recubrimiento cerámico).',
  interior:
    'La limpieza interior profesional comprende la aspiración profunda, la limpieza de superficies textiles y de cuero con productos de pH adecuado, el acondicionamiento de plásticos y vinilos, y el tratamiento de olores mediante ozono o limpiadores enzimáticos.',
  protecciones:
    'El proceso de protección incluye la preparación exhaustiva de la superficie (descontaminación y pulido), seguida de la aplicación controlada del producto protector en un entorno limpio, respetando los tiempos de flash y curado especificados por el fabricante.',
  herramientas:
    'La selección y mantenimiento del equipamiento es fundamental: cada herramienta debe elegirse según el tipo de trabajo (corte, refinado, acabado), mantenerse limpia entre usos y almacenarse correctamente para maximizar su vida útil y rendimiento.',
  quimicos:
    'El uso profesional de productos químicos requiere conocer su pH, ratio de dilución y compatibilidad con los sustratos. Se aplican siguiendo protocolos de seguridad y se seleccionan según la tarea: desengrasantes para motor, reactivos férricos para llantas, o productos neutros para mantenimiento.',
  tecnicas:
    'Las técnicas de detailing profesional se ejecutan siguiendo protocolos precisos de velocidad, presión y movimiento. Cada técnica requiere práctica supervisada para dominar variables como la temperatura de la superficie, el tipo de pintura y el nivel de defecto a corregir.',
};

const categoryToolsList: Record<GlossaryCategory, string[]> = {
  exterior: ['Pulidora DA / Rotativa', 'Pads de corte y acabado', 'Foam cannon', 'Toallas de microfibra', 'Clay bar', 'Medidor de espesor'],
  interior: ['Cepillos de cerdas suaves', 'Extractor de tapicerías', 'Tornador neumático', 'Vaporizadora', 'Aspirador profesional'],
  protecciones: ['Aplicadores de suede', 'Luces LED de inspección', 'Guantes de nitrilo', 'Toallas de levantado', 'Cabina con control de polvo'],
  herramientas: ['Backing plates', 'Pads de diferentes durezas', 'Lubricante de arcilla', 'Grit guards', 'Toallas twist loop'],
  quimicos: ['Pulverizadores graduados', 'Cubos con grit guard', 'Guantes de protección', 'Medidor de pH', 'Jarras dosificadoras'],
  tecnicas: ['Pulidora orbital aleatoria', 'Medidor de espesor de pintura', 'Luces de inspección halógenas/LED', 'Panel de test', 'Cinta de carrocero'],
};

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getTermBySlug(slug) : undefined;

  if (!term) return <Navigate to="/glosario-detailing" replace />;

  const relatedTerms = glossaryTerms.filter((t) => t.category === term.category && t.term !== term.term).slice(0, 6);
  const termUrl = `/glosario-detailing/${slug}`;
  const category = categoryLabels[term.category];

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Glosario de Detailing Profesional',
      url: `${BASE_URL}/glosario-detailing`,
    },
    url: `${BASE_URL}${termUrl}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glosario de Detailing', item: `${BASE_URL}/glosario-detailing` },
      { '@type': 'ListItem', position: 3, name: term.term, item: `${BASE_URL}${termUrl}` },
    ],
  };

  return (
    <>
      {/* El marcado FAQPage lo añade la lista de preguntas (una sola vez) */}
      <SEO
        title={`${term.term} – Glosario Detailing | Academia Detail`}
        description={term.definition.slice(0, 155)}
        url={termUrl}
        schema={[definedTermSchema, breadcrumbSchema]}
        keywords={`${term.term}, detailing, ${category}, glosario detailing`}
      />
      <MainLayout>
        <article>
          <header className="border-b border-border bg-background">
            <div className="ds-container pt-2">
              <Breadcrumbs
                items={[
                  { name: 'Glosario', url: '/glosario-detailing' },
                  { name: term.term, url: termUrl },
                ]}
              />
            </div>
            <div className="ds-container pb-10 pt-4 md:pb-14">
              <p className="ds-eyebrow mb-4">Glosario · {category}</p>
              <h1 className="ds-h1 max-w-4xl text-foreground">{term.term}</h1>
              <p className="mt-6 max-w-[68ch] text-lg leading-[1.7] text-foreground/90 md:text-xl">{term.definition}</p>
            </div>
          </header>

          <div className="ds-section-sm bg-background">
            <div className="ds-container">
              <div className="max-w-[68ch] text-[1.0625rem] leading-[1.75] text-foreground/85 md:text-lg">
                <h2 className="mb-3 text-[1.75rem] leading-[1.1] text-foreground md:text-[2rem]">En el trabajo del taller</h2>
                <p>{categoryProcesses[term.category]}</p>

                <h2 className="mb-4 mt-10 text-[1.75rem] leading-[1.1] text-foreground md:text-[2rem]">Herramientas habituales</h2>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {categoryToolsList[term.category].map((tool) => (
                    <li key={tool} className="flex gap-3">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      {tool}
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <GlossaryRelatedCourses term={term} />
                </div>
              </div>
            </div>
          </div>
        </article>

        <Suspense fallback={<Placeholder />}>
          <Section tone="card" aria-labelledby="faq-title">
            <SectionHeader id="faq-title" eyebrow="Preguntas frecuentes" title={`Preguntas sobre ${term.term}`} />
            <GlossaryTermFAQ term={term} />
          </Section>

          {relatedTerms.length > 0 && (
            <Section aria-labelledby="relacionados-title">
              <SectionHeader
                id="relacionados-title"
                eyebrow={category}
                title="Términos relacionados"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTerms.map((t) => (
                  <GlossaryTermCard key={t.term} term={t} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/glosario-detailing"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Volver al glosario completo
                </Link>
              </div>
            </Section>
          )}

          <CtaBand />
        </Suspense>
      </MainLayout>
    </>
  );
}
