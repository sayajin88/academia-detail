import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';

// Import training/course images
import training1 from '@/assets/evento-clase-completa.jpg';
import training2 from '@/assets/evento-grupo-formacion.jpg';
import training3 from '@/assets/evento-practica-pulidora.jpg';
import training4 from '@/assets/evento-instructor-explicando.jpg';
import training5 from '@/assets/formacion-detailing-1.jpg';
import training6 from '@/assets/evento-alumnos-atentos.jpg';
import training7 from '@/assets/certificado-alumno-feliz.jpg';
import training8 from '@/assets/alumnos-formacion-3.jpg';
import training9 from '@/assets/practicas-alumnos-detailing-1.jpg';
import training10 from '@/assets/practicas-alumnos-detailing-3.jpg';
import training11 from '@/assets/material-curso-detailing.jpg';
import training12 from '@/assets/muestra-certificado-detailing.jpg';

const galleryImages = [
  { src: training1, alt: 'Clase de curso de detailing profesional - Alumnos en formación práctica' },
  { src: training9, alt: 'Grupo completo de alumnos Training practicando pulido en taller Detail Park' },
  { src: training3, alt: 'Práctica de pulido de coches con pulidora profesional - Curso de detailing' },
  { src: training4, alt: 'Instructor explicando técnicas de detailing y tratamiento cerámico' },
  { src: training11, alt: 'Pulidoras profesionales DeWalt y Flex preparadas para formación de detailing' },
  { src: training10, alt: 'Alumnos practicando pulido en equipo junto a coches clásicos en Detail Park' },
  { src: training12, alt: 'Certificado oficial de Detail Park Academy - Curso de detailing profesional' },
  { src: training6, alt: 'Alumnos en clase teórica de curso de detailing profesional' },
];

export function GalleryPreview() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Nuestra Formación"
          title="Aprende en un Entorno Real"
          subtitle="Formamos profesionales en nuestras instalaciones con vehículos reales y las mejores herramientas del sector."
        />

        {/* Gallery Grid - Optimizado con lazy loading */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl ${
                index === 0 || index === 7 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div
                className={`${
                  index === 0 || index === 7 ? 'aspect-square' : 'aspect-[4/3]'
                } relative overflow-hidden`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  width={400}
                  height={300}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/quienes-somos">
              Conoce Nuestras Instalaciones
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
