import { Star, ExternalLink } from 'lucide-react';
import { SITE, STATS, STUDENT_REVIEWS } from '@/data/site';
import { Section, SectionHeader } from './Section';

const Stars = ({ label }: { label: string }) => (
  <div className="flex gap-0.5" role="img" aria-label={label}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
    ))}
  </div>
);

interface StudentReviewsProps {
  tone?: 'default' | 'card';
  title?: string;
}

/** Opiniones reales de alumnos (Google) y la valoración del centro. */
export function StudentReviews({ tone = 'default', title = 'Lo que dicen nuestros alumnos' }: StudentReviewsProps) {
  const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });
  return (
    <Section tone={tone} aria-labelledby="opiniones-title">
      <SectionHeader
        id="opiniones-title"
        eyebrow="Opiniones en Google"
        title={title}
        lead={`Detail Park, el centro donde se imparten los cursos, tiene una valoración de ${rating} sobre 5 con ${STATS.googleReviews} opiniones en Google.`}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {STUDENT_REVIEWS.map((r) => (
          <figure key={r.name} className="ds-card flex flex-col gap-4 p-6">
            <Stars label="5 de 5 estrellas" />
            <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-foreground/85">“{r.text}”</blockquote>
            <figcaption className="border-t border-border pt-4">
              <p className="font-semibold text-foreground">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href={SITE.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Ver las {STATS.googleReviews} opiniones en Google
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
