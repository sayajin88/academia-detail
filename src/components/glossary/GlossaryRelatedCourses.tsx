import { Link } from 'react-router-dom';
import type { GlossaryTerm } from '@/data/glossaryData';
import { formations } from '@/data/formations';
import { ArrowRight } from 'lucide-react';

interface GlossaryRelatedCoursesProps {
  term: GlossaryTerm;
}

const KEYWORD_RULES: { keywords: string[]; formationId: string }[] = [
  { keywords: ['vinilo', 'wrapping', 'wrap', 'vinyl'], formationId: 'curso-vinilado-vehiculos' },
  { keywords: ['ppf', 'lámina', 'lamina', 'film', 'paint protection'], formationId: 'curso-ppf-proteccion-pintura' },
  { keywords: ['restaur'], formationId: 'curso-restauracion-vehiculos' },
  { keywords: ['pintura', 'barniz', 'pulido', 'corrección', 'correccion', 'cerámico', 'ceramico', 'coating', 'pad', 'compound', 'polish'], formationId: 'curso-detailing-profesional' },
];

function getMatchedFormations(term: GlossaryTerm) {
  const text = `${term.term} ${term.definition}`.toLowerCase();
  const matchedIds = new Set<string>();

  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some(kw => text.includes(kw))) {
      matchedIds.add(rule.formationId);
    }
  }

  // Fallback to detailing pro
  if (matchedIds.size === 0) {
    matchedIds.add('curso-detailing-profesional');
  }

  return formations.filter(f => matchedIds.has(f.id)).slice(0, 2);
}

export function GlossaryRelatedCourses({ term }: GlossaryRelatedCoursesProps) {
  const matched = getMatchedFormations(term);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Cursos Relacionados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {matched.map(course => (
            <article key={course.id} className="group bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">Duración: {course.duration}</p>
                <Link
                  to={course.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  Ver curso <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
