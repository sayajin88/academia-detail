import { Star, ExternalLink, Quote } from 'lucide-react';
import { SITE, STATS, STUDENT_REVIEWS } from '@/data/site';
import { Section, SectionHeader } from './Section';

const Stars = ({ label, size = 'h-4 w-4' }: { label: string; size?: string }) => (
  <div className="flex gap-0.5" role="img" aria-label={label}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${size} fill-gold text-gold`} aria-hidden="true" />
    ))}
  </div>
);

interface StudentReviewsProps {
  tone?: 'default' | 'card';
  title?: string;
}

/** Opiniones reales de alumnos (Google) y la valoración del centro. */
export function StudentReviews({ tone = 'default', title = 'Lo que dicen nuestros' }: StudentReviewsProps) {
  const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });
  return (
    <Section tone={tone} decor="glow" aria-labelledby="opiniones-title">
      <SectionHeader id="opiniones-title" eyebrow="Opiniones en Google" title={title} accent="alumnos" />

      {/* Valoración del centro */}
      <div className="ds-reveal mx-auto -mt-4 mb-10 flex w-fit flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-center md:mb-12 md:flex-row md:gap-5 md:text-left">
        <p className="font-heading text-5xl leading-none text-foreground">{rating}</p>
        <div>
          <Stars label={`${rating} de 5 estrellas`} size="h-5 w-5" />
          <p className="mt-1 text-sm text-muted-foreground">
            {STATS.googleReviews} opiniones de Detail Park, el centro donde se imparten los cursos
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {STUDENT_REVIEWS.map((r) => (
          <figure key={r.name} className="ds-card ds-card-hover ds-reveal relative flex flex-col gap-4 p-7">
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/30" aria-hidden="true" />
            <Stars label="5 de 5 estrellas" />
            <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-foreground/85">“{r.text}”</blockquote>
            <figcaption className="flex items-center gap-3 border-t border-white/[0.08] pt-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/40 text-sm font-bold text-white" aria-hidden="true">
                {r.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')}
              </span>
              <span>
                <span className="block font-semibold text-foreground">{r.name}</span>
                <span className="block text-sm text-muted-foreground">{r.context}</span>
              </span>
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
