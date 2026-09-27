import type { GlossaryTerm } from '@/data/glossaryData';
import { CoursePromo, type PromoCourse } from '@/components/blog/BlogPostCTA';

const KEYWORD_RULES: { keywords: string[]; course: PromoCourse }[] = [
  { keywords: ['vinilo', 'wrapping', 'wrap', 'vinyl'], course: 'curso-vinilado-vehiculos' },
  { keywords: ['ppf', 'lámina', 'lamina', 'film', 'paint protection'], course: 'curso-ppf-proteccion-pintura' },
  { keywords: ['restaur'], course: 'curso-restauracion-vehiculos' },
];

/** Curso más relacionado con el término (por defecto, el de detailing). */
export function getRelatedCourse(term: GlossaryTerm): PromoCourse {
  const text = `${term.term} ${term.definition}`.toLowerCase();
  return KEYWORD_RULES.find((rule) => rule.keywords.some((kw) => text.includes(kw)))?.course ?? 'curso-detailing-profesional';
}

export function GlossaryRelatedCourses({ term }: { term: GlossaryTerm }) {
  return <CoursePromo course={getRelatedCourse(term)} />;
}
