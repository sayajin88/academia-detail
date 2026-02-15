import { useParams, Navigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { GlossaryTermFAQ, generateFAQs } from '@/components/glossary/GlossaryTermFAQ';
import { GlossaryRelatedCourses } from '@/components/glossary/GlossaryRelatedCourses';
import { GlossaryTermCard } from '@/components/glossary/GlossaryTermCard';
import {
  getTermBySlug,
  generateSlug,
  glossaryTerms,
  categoryLabels,
  categoryColors,
  type GlossaryCategory,
} from '@/data/glossaryData';
import { BookOpen, Wrench, Layers, ArrowLeft } from 'lucide-react';

const BASE_URL = 'https://academiadetail.com';

// Contextual process descriptions by category
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

// Contextual tools by category
const categoryToolsList: Record<GlossaryCategory, string[]> = {
  exterior: ['Pulidora DA / Rotativa', 'Pads de corte y acabado', 'Foam cannon', 'Toallas de microfibra', 'Clay bar', 'Medidor de espesor'],
  interior: ['Cepillos de cerdas suaves', 'Extractor de tapicerías', 'Tornador neumático', 'Vaporizadora', 'Aspirador profesional'],
  protecciones: ['Aplicadores de suede', 'Luces LED de inspección', 'Guantes de nitrilo', 'Toallas de levantado', 'Cabina con control de polvo'],
  herramientas: ['Backing plates', 'Pads de diferentes durezas', 'Lubricante de arcilla', 'Grit guards', 'Toallas twist loop'],
  quimicos: ['Pulverizadores graduados', 'Cubos con grit guard', 'Guantes de protección', 'Medidor de pH', 'Jarras dosificadoras'],
  tecnicas: ['Pulidora orbital aleatoria', 'Medidor de espesor de pintura', 'Luces de inspección halógenas/LED', 'Panel de test', 'Cinta de carrocero'],
};

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getTermBySlug(slug) : undefined;

  if (!term) {
    return <Navigate to="/glosario-detailing" replace />;
  }

  const faqs = generateFAQs(term);
  const relatedTerms = glossaryTerms
    .filter(t => t.category === term.category && t.term !== term.term)
    .slice(0, 6);

  const termUrl = `/glosario-detailing/${slug}`;

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <MainLayout>
      <SEO
        title={`${term.term} – Glosario Detailing | Academia Detail`}
        description={term.definition.slice(0, 155)}
        url={termUrl}
        schema={[definedTermSchema, faqSchema]}
        keywords={`${term.term}, detailing, ${categoryLabels[term.category]}, glosario detailing`}
      />

      {/* Hero compacto */}
      <section className="pt-8 pb-10 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/glosario-detailing" className="hover:text-primary transition-colors">
              Glosario
            </Link>
            <span>/</span>
            <span className="text-foreground">{term.term}</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[term.category]}`}>
              {categoryLabels[term.category]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {term.term}
          </h1>
        </div>
      </section>

      {/* Definición */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 bg-card border border-border/60 rounded-xl p-6 md:p-8">
            <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Definición</h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{term.definition}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso relacionado */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4">
            <Layers className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Proceso Relacionado</h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {categoryProcesses[term.category]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas necesarias */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4">
            <Wrench className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Herramientas Necesarias</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categoryToolsList[term.category].map(tool => (
                  <li key={tool} className="flex items-center gap-2 text-muted-foreground text-[15px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <GlossaryTermFAQ term={term} />

      {/* Cursos relacionados */}
      <GlossaryRelatedCourses term={term} />

      {/* Términos relacionados */}
      {relatedTerms.length > 0 && (
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Términos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              {relatedTerms.map(t => (
                <GlossaryTermCard key={t.term} term={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volver */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Link
            to="/glosario-detailing"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Glosario
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
