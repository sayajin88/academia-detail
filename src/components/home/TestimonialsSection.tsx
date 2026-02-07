import { Helmet } from 'react-helmet-async';
import { Star, Quote, MapPin, Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import eventoAlumnosClase from '@/assets/evento-alumnos-clase.jpg';
import eventoAlumnosAtencion from '@/assets/evento-alumnos-atencion.jpg';
import eventoGrupoFormacion from '@/assets/evento-grupo-formacion.jpg';
import eventoGrupoDetailing from '@/assets/evento-grupo-detailing.jpg';
import eventoClaseCompleta from '@/assets/evento-clase-completa.jpg';
import eventoPracticaPulidora from '@/assets/evento-practica-pulidora.jpg';

const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Propietario de CM Detailing',
    city: 'Madrid',
    image: eventoAlumnosClase,
    text: 'La formación en Detail Park cambió mi vida. En 6 meses pasé de aficionado a tener mi propio negocio facturando 5.000€/mes.',
    rating: 5,
    formation: 'Carrera Negocio',
    date: '2025-01-15',
    before: 'Mecánico de taller',
    after: 'Dueño de centro de detailing',
  },
  {
    name: 'Laura Sánchez',
    role: 'Técnica especialista PPF',
    city: 'Barcelona',
    image: eventoAlumnosAtencion,
    text: 'El nivel de detalle y la práctica real que ofrecen no tiene comparación. Ahora trabajo con las mejores marcas del sector.',
    rating: 5,
    formation: 'Paint Protection Film',
    date: '2025-01-10',
    before: 'Desempleada',
    after: 'Técnica PPF en centro premium',
  },
  {
    name: 'Miguel Ángel Ruiz',
    role: 'Car Wrapper profesional',
    city: 'Valencia',
    image: eventoGrupoFormacion,
    text: 'Aprender wrapping con Daniel fue una experiencia increíble. Su metodología y paciencia hacen que todo sea más fácil.',
    rating: 5,
    formation: 'Car Wrapping',
    date: '2025-01-05',
    before: 'Rotulista tradicional',
    after: 'Especialista en wrapping premium',
  },
  {
    name: 'Antonio García',
    role: 'Fundador de AG Detailing',
    city: 'Sevilla',
    image: eventoGrupoDetailing,
    text: 'Invertir en la Carrera Negocio fue la mejor decisión. No solo aprendí técnica, aprendí a gestionar mi propio negocio rentable.',
    rating: 5,
    formation: 'Carrera Negocio',
    date: '2024-12-20',
    before: 'Empleado de concesionario',
    after: 'Empresario con 2 empleados',
  },
  {
    name: 'Patricia López',
    role: 'Detailer profesional',
    city: 'Bilbao',
    image: eventoClaseCompleta,
    text: 'Siendo mujer tenía dudas, pero el ambiente es totalmente profesional. Ahora soy una de las pocas detailers certificadas del País Vasco.',
    rating: 5,
    formation: 'Detailing Profesional',
    date: '2024-12-15',
    before: 'Administrativa',
    after: 'Detailer independiente',
  },
  {
    name: 'Javier Hernández',
    role: 'Propietario de JH Premium Cars',
    city: 'Málaga',
    image: eventoPracticaPulidora,
    text: 'La red de contactos que haces en la formación es invaluable. Mis primeros 5 clientes vinieron por recomendaciones de compañeros.',
    rating: 5,
    formation: 'Carrera Negocio',
    date: '2024-11-28',
    before: 'Freelance marketing',
    after: 'Centro de detailing propio',
  },
];

// Calculate aggregate rating
const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);

// Objeto reutilizable para itemReviewed - resuelve errores de Google Search Console
const itemReviewed = {
  "@type": "EducationalOrganization",
  "name": "Academia Detail",
  "url": "https://academiadetail.com",
  "image": "https://academiadetail.com/og-image.png",
  "sameAs": [
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": averageRating,
    "reviewCount": String(testimonials.length),
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Array de Reviews individuales, cada una con itemReviewed completo
const reviewsSchema = testimonials.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": itemReviewed,
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
}));

export function TestimonialsSection() {
  return (
    <section 
      id="opiniones"
      className="py-20 md:py-28 bg-background"
      itemScope 
      itemType="https://schema.org/EducationalOrganization"
    >
      {/* Schema.org JSON-LD for Review rich snippets - cada Review con itemReviewed */}
      <Helmet>
        {reviewsSchema.map((review, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(review)}
          </script>
        ))}
      </Helmet>

      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Testimonios"
          title="Lo que Dicen Nuestros Alumnos"
          subtitle="Historias reales de transformación profesional"
        />

        {/* Aggregate Rating Display */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-1" role="img" aria-label={`Valoración media: ${averageRating} de 5 estrellas`}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                role="img"
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

              {/* Before/After Badge */}
              {testimonial.before && testimonial.after && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="line-through">{testimonial.before}</span>
                    <span>→</span>
                    <span className="text-primary font-medium">{testimonial.after}</span>
                  </div>
                </div>
              )}

              {/* Author */}
              <div 
                className="flex items-center gap-4"
                itemProp="author" 
                itemScope 
                itemType="https://schema.org/Person"
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - Alumno certificado en ${testimonial.formation} por Academia Detail`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="font-semibold text-foreground" itemProp="name">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {testimonial.city}
                  </p>
                </div>
              </div>

              {/* Formation Badge */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {testimonial.formation}
                </span>
                {testimonial.role.includes('Propietario') || testimonial.role.includes('Fundador') ? (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    Emprendedor
                  </span>
                ) : null}
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
