import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import wrapping-related portfolio images
import audiR8Yellow from '@/assets/portfolio-audi-r8-yellow.png';
import audiR8 from '@/assets/portfolio-audi-r8.png';
import audiRs7 from '@/assets/portfolio-audi-rs7.png';
import bentleyContinental from '@/assets/portfolio-bentley-continental.png';
import bmwM2 from '@/assets/portfolio-bmw-m2.png';
import corvette from '@/assets/portfolio-corvette.png';
import ferrariGtc4 from '@/assets/portfolio-ferrari-gtc4.png';
import lamborghiniHuracan from '@/assets/portfolio-lamborghini-huracan.png';
import mclaren720s from '@/assets/portfolio-mclaren-720s-orange.png';
import porscheCayenne from '@/assets/portfolio-porsche-cayenne.png';
import rangeRoverVelar from '@/assets/portfolio-range-rover-velar.png';
import toyotaSupra from '@/assets/portfolio-toyota-supra.png';

// Import detailing formation images
import formacionDetailing1 from '@/assets/formacion-detailing-1.jpg';
import alumnosFormacion3 from '@/assets/alumnos-formacion-3.jpg';
import alumnosFormacion from '@/assets/alumnos-formacion.jpg';
import formacionDetailing3 from '@/assets/formacion-detailing-3.jpg';
import formacionDetailing4 from '@/assets/formacion-detailing-4.jpg';
import formacionDetailing2 from '@/assets/formacion-detailing-2.jpg';
import formacionDetailingJuanDaniel from '@/assets/formacion-detailing-juan-daniel.jpg';
import alumnosInstalaciones from '@/assets/alumnos-instalaciones-curso-detailing.jpg';
import alumnosPracticas from '@/assets/alumnos-practicas-detailing.jpg';
import instalacionesCursoFerrari from '@/assets/instalaciones-curso-ferrari.jpg';
import instalacionesClaseTraining from '@/assets/instalaciones-clase-training.jpg';
import instalacionesClaseClasicos from '@/assets/instalaciones-clase-coches-clasicos.jpg';
import practicasAlumnos1 from '@/assets/practicas-alumnos-detailing-1.jpg';
import practicasAlumnos2 from '@/assets/practicas-alumnos-detailing-2.jpg';
import practicasAlumnos3 from '@/assets/practicas-alumnos-detailing-3.jpg';
import practicasAlumnos4 from '@/assets/practicas-alumnos-detailing-4.jpg';
import materialCurso from '@/assets/material-curso-detailing.jpg';
import muestraCertificado from '@/assets/muestra-certificado-detailing.jpg';

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

interface FormationGalleryProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  galleryType?: 'wrapping' | 'detailing';
}

const wrappingGalleryItems: GalleryItem[] = [
  { image: audiR8Yellow, title: 'Audi R8 Amarillo', description: 'Vinilado completo en amarillo brillante' },
  { image: lamborghiniHuracan, title: 'Lamborghini Huracán', description: 'Cambio de color completo' },
  { image: mclaren720s, title: 'McLaren 720S', description: 'Wrapping naranja racing' },
  { image: corvette, title: 'Chevrolet Corvette', description: 'Vinilado personalizado' },
  { image: bmwM2, title: 'BMW M2', description: 'Cambio de color mate' },
  { image: bentleyContinental, title: 'Bentley Continental', description: 'Wrapping premium completo' },
  { image: ferrariGtc4, title: 'Ferrari GTC4', description: 'Vinilado deportivo' },
  { image: audiRs7, title: 'Audi RS7', description: 'Cambio de color satinado' },
  { image: porscheCayenne, title: 'Porsche Cayenne', description: 'Wrapping completo SUV' },
  { image: rangeRoverVelar, title: 'Range Rover Velar', description: 'Vinilado elegante' },
  { image: toyotaSupra, title: 'Toyota Supra', description: 'Wrapping deportivo' },
  { image: audiR8, title: 'Audi R8', description: 'Cambio de color completo' },
];

const detailingGalleryItems: GalleryItem[] = [
  { image: formacionDetailing1, title: 'Formación en Taller', description: 'Daniel López explicando técnicas a los alumnos' },
  { image: alumnosFormacion3, title: 'Clase Teórica', description: 'Alumnos tomando apuntes durante la formación' },
  { image: alumnosFormacion, title: 'Atención al Detalle', description: 'Grupo completo en sesión de teoría' },
  { image: formacionDetailing3, title: 'Práctica con Pulidora', description: 'Aprendizaje práctico en grupo reducido' },
  { image: formacionDetailing4, title: 'Formación 1 a 1', description: 'Instructor guiando técnica de pulido' },
  { image: formacionDetailing2, title: 'Sesión de Formación', description: 'Daniel en el aula explicando conceptos' },
  { image: formacionDetailingJuanDaniel, title: 'Práctica Real', description: 'Alumno practicando en vehículo real' },
  { image: alumnosInstalaciones, title: 'Instalaciones Detail Park', description: 'Grupo de alumnos en las instalaciones del centro de formación' },
  { image: alumnosPracticas, title: 'Prácticas en Grupo', description: 'Alumnos practicando detailing alrededor de un descapotable' },
  { image: instalacionesCursoFerrari, title: 'Clase con Ferrari', description: 'Daniel explicando con Ferrari y coches de lujo en el taller' },
  { image: instalacionesClaseTraining, title: 'Clase Teórica Completa', description: 'Alumnos con camisetas Training en sesión teórica de formación' },
  { image: instalacionesClaseClasicos, title: 'Formación con Clásicos', description: 'Clase magistral junto a Porsche clásico y Ferrari en Detail Park' },
  { image: practicasAlumnos1, title: 'Taller Completo en Acción', description: 'Grupo completo de alumnos Training practicando pulido en Detail Park' },
  { image: practicasAlumnos2, title: 'Técnica de Pulido Cercana', description: 'Alumnos practicando técnica de pulido con pulidora DeWalt profesional' },
  { image: practicasAlumnos3, title: 'Práctica en Equipo', description: 'Tres alumnos puliendo capó con pulidoras junto a coches clásicos' },
  { image: practicasAlumnos4, title: 'Trabajo en Grupo', description: 'Grupo de alumnos Training puliendo vehículo con microfibra y pulidora' },
  { image: materialCurso, title: 'Material Profesional', description: 'Pulidoras profesionales DeWalt y Flex preparadas para la formación' },
  { image: muestraCertificado, title: 'Certificado de Entrenamiento', description: 'Certificado oficial de Detail Park Academy entregado al finalizar el curso' },
];

export function FormationGallery({ 
  title = "Trabajos de Nuestros Alumnos",
  subtitle = "Resultados reales de proyectos realizados durante y después de la formación",
  badge = "Galería",
  galleryType = 'wrapping'
}: FormationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const galleryItems = galleryType === 'detailing' ? detailingGalleryItems : wrappingGalleryItems;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge={badge}
            title={title}
            subtitle={subtitle}
          />
        </AnimatedSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 50}>
              <div 
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base">{item.title}</h3>
                    <p className="text-white/70 text-xs md:text-sm">{item.description}</p>
                  </div>
                </div>
                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none">
            {selectedIndex !== null && (
              <div className="relative">
                {/* Close button */}
                <button 
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                
                {/* Navigation buttons */}
                <button 
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button 
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
                
                {/* Image */}
                <img 
                  src={galleryItems[selectedIndex].image}
                  alt={galleryItems[selectedIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-xl font-bold">{galleryItems[selectedIndex].title}</h3>
                  <p className="text-white/70">{galleryItems[selectedIndex].description}</p>
                  <p className="text-primary text-sm mt-2">
                    {selectedIndex + 1} / {galleryItems.length}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
