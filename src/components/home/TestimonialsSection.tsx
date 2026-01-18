import { Helmet } from 'react-helmet-async';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import eventoAlumnosClase from '@/assets/evento-alumnos-clase.jpg';
import eventoAlumnosAtencion from '@/assets/evento-alumnos-atencion.jpg';
import eventoGrupoFormacion from '@/assets/evento-grupo-formacion.jpg';

const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Propietario de CM Detailing',
    image: eventoAlumnosClase,
    text: 'La formación en Detail Park cambió mi vida. En 6 meses pasé de aficionado a tener mi propio negocio rentable.',
    rating: 5,
    formation: 'Carrera Negocio',
    date: '2025-01-15',
  },
  {
    name: 'Laura Sánchez',
    role: 'Técnica especialista PPF',
    image: eventoAlumnosAtencion,
    text: 'El nivel de detalle y la práctica real que ofrecen no tiene comparación. Ahora trabajo con las mejores marcas del sector.',
    rating: 5,
    formation: 'Paint Protection Film',
    date: '2025-01-10',
  },
  {
    name: 'Miguel Ángel',
    role: 'Car Wrapper profesional',
    image: eventoGrupoFormacion,
    text: 'Aprender wrapping con Daniel fue una experiencia increíble. Su metodología y paciencia hacen que todo sea más fácil.',
    rating: 5,
    formation: 'Car Wrapping',
    date: '2025-01-05',
  },
];

// Calculate aggregate rating
const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);

// Schema.org Review structured data for rich snippets
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Academia Detailing - Detail Park",
  "url": "https://academiadetail.com",
  "sameAs": [
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark"
  ],
  "review": testimonials.map((t) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": t.text,
    "datePublished": t.date
  })),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": averageRating,
    "reviewCount": testimonials.length,
    "bestRating": "5",
    "worstRating": "1"
  }
};

export function TestimonialsSection() {
  return (
    <section 
      className="py-20 md:py-28 bg-background"
      itemScope 
      itemType="https://schema.org/EducationalOrganization"
    >
      {/* Schema.org JSON-LD for Review rich snippets */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewsSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Testimonios"
          title="Lo que Dicen Nuestros Alumnos"
          subtitle="Historias reales de transformación profesional"
        />

        {/* Aggregate Rating Display */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-1" aria-label={`Valoración media: ${averageRating} de 5 estrellas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-primary text-primary"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-foreground">{averageRating}</span>
          <span className="text-muted-foreground">
            basado en {testimonials.length}+ reseñas verificadas
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              itemScope
              itemType="https://schema.org/Review"
              itemProp="review"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote className="h-10 w-10" aria-hidden="true" />
              </div>

              {/* Rating */}
              <div 
                className="flex gap-1 mb-4" 
                itemProp="reviewRating" 
                itemScope 
                itemType="https://schema.org/Rating"
                aria-label={`Valoración: ${testimonial.rating} de 5 estrellas`}
              >
                <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                <meta itemProp="bestRating" content="5" />
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-foreground/80 mb-6 leading-relaxed" itemProp="reviewBody">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div 
                className="flex items-center gap-4"
                itemProp="author" 
                itemScope 
                itemType="https://schema.org/Person"
              >
                <img
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold text-foreground" itemProp="name">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Formation Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {testimonial.formation}
                </span>
              </div>

              {/* Hidden date for schema */}
              <meta itemProp="datePublished" content={testimonial.date} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
