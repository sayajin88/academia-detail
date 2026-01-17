import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import alumnoFeliz from '@/assets/certificado-alumno-feliz.jpg';
import alumno from '@/assets/certificado-alumno.png';

const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Propietario de CM Detailing',
    image: alumnoFeliz,
    text: 'La formación en Detail Park cambió mi vida. En 6 meses pasé de aficionado a tener mi propio negocio rentable.',
    rating: 5,
    formation: 'Carrera Negocio',
  },
  {
    name: 'Laura Sánchez',
    role: 'Técnica especialista PPF',
    image: alumno,
    text: 'El nivel de detalle y la práctica real que ofrecen no tiene comparación. Ahora trabajo con las mejores marcas del sector.',
    rating: 5,
    formation: 'Paint Protection Film',
  },
  {
    name: 'Miguel Ángel',
    role: 'Car Wrapper profesional',
    image: alumnoFeliz,
    text: 'Aprender wrapping con Daniel fue una experiencia increíble. Su metodología y paciencia hacen que todo sea más fácil.',
    rating: 5,
    formation: 'Car Wrapping',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Testimonios"
          title="Lo que Dicen Nuestros Alumnos"
          subtitle="Historias reales de transformación profesional"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote className="h-10 w-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-semibold text-foreground">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
