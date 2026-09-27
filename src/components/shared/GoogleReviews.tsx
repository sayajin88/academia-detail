import { Star, MapPin, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection, StaggeredContainer } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';

const reviews = [
  {
    id: 1,
    author: 'Alejandro M.',
    rating: 5,
    text: 'Increíble el trabajo de Detail Park. Dejé mi coche para un tratamiento cerámico y el resultado es mejor que cuando salió del concesionario. Profesionales de 10.',
    date: 'Hace 1 semana',
  },
  {
    id: 2,
    author: 'Beatriz S.',
    rating: 5,
    text: 'El mejor lavado de coches en Alicante, sin duda. Cuidan cada detalle y el interior ha quedado impecable. Repetiré seguro.',
    date: 'Hace 1 mes',
  },
  {
    id: 3,
    author: 'Carlos T.',
    rating: 5,
    text: 'Trato excelente y puntualidad. Se nota que les apasiona su trabajo. Mi coche nunca había brillado tanto.',
    date: 'Hace 2 meses',
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={16} className="fill-brand text-brand" />
    ))}
  </div>
);

export function GoogleReviews() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Reseñas Google"
            title="Lo Que Opinan de Detail Park"
            subtitle="Reseñas verificadas en Google Maps"
          />
        </AnimatedSection>

        {/* Aggregate rating + address */}
        <AnimatedSection delay={100}>
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="flex items-center gap-3">
              <GoogleIcon />
              <span className="text-3xl font-bold text-foreground">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-brand text-brand" />
                ))}
              </div>
              <span className="text-muted-foreground">(218 reseñas)</span>
            </div>
            <p className="flex items-center text-muted-foreground text-sm">
              <MapPin size={14} className="mr-1.5 text-brand" />
              C. Metalurgias, 13, 03008 Alicante
            </p>
          </div>
        </AnimatedSection>

        {/* Review cards */}
        <StaggeredContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          staggerDelay={80}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <StarRating count={review.rating} />
              <p className="text-foreground/80 italic mt-4 mb-5 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex justify-between items-center border-t border-border pt-4">
                <span className="font-semibold text-foreground">{review.author}</span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
          ))}
        </StaggeredContainer>

        {/* CTA */}
        <AnimatedSection delay={200}>
          <div className="text-center">
            <a
              href="https://share.google/Rkmut757wnebOlR70"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 text-brand hover:bg-primary/10 hover:border-primary/50"
              >
                Ver todas las reseñas en Google
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
