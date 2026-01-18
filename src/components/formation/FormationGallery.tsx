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

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

interface FormationGalleryProps {
  title?: string;
  subtitle?: string;
  badge?: string;
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

export function FormationGallery({ 
  title = "Trabajos de Nuestros Alumnos",
  subtitle = "Resultados reales de proyectos realizados durante y después de la formación",
  badge = "Galería"
}: FormationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? wrappingGalleryItems.length - 1 : selectedIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === wrappingGalleryItems.length - 1 ? 0 : selectedIndex + 1);
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
          {wrappingGalleryItems.map((item, index) => (
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
                  src={wrappingGalleryItems[selectedIndex].image}
                  alt={wrappingGalleryItems[selectedIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-xl font-bold">{wrappingGalleryItems[selectedIndex].title}</h3>
                  <p className="text-white/70">{wrappingGalleryItems[selectedIndex].description}</p>
                  <p className="text-primary text-sm mt-2">
                    {selectedIndex + 1} / {wrappingGalleryItems.length}
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
