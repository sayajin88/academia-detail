import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';

// Import portfolio images
import portfolio1 from '@/assets/portfolio-ferrari-458.png';
import portfolio2 from '@/assets/portfolio-lamborghini-huracan.png';
import portfolio3 from '@/assets/portfolio-porsche.png';
import portfolio4 from '@/assets/portfolio-audi-r8.png';
import portfolio5 from '@/assets/portfolio-mclaren.png';
import portfolio6 from '@/assets/portfolio-bmw-m2.png';
import portfolio7 from '@/assets/portfolio-mercedes.png';
import portfolio8 from '@/assets/portfolio-bentley-continental.png';

const galleryImages = [
  { src: portfolio1, alt: 'Ferrari 458' },
  { src: portfolio2, alt: 'Lamborghini Huracán' },
  { src: portfolio3, alt: 'Porsche' },
  { src: portfolio4, alt: 'Audi R8' },
  { src: portfolio5, alt: 'McLaren' },
  { src: portfolio6, alt: 'BMW M2' },
  { src: portfolio7, alt: 'Mercedes' },
  { src: portfolio8, alt: 'Bentley Continental' },
];

export function GalleryPreview() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Portfolio"
          title="Nuestros Trabajos"
          subtitle="Trabajamos con los vehículos más exclusivos. Esto es lo que aprenderás a hacer."
        />

        {/* Gallery Grid */}
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
                } bg-cover bg-center transition-transform duration-500 group-hover:scale-110`}
                style={{ backgroundImage: `url(${image.src})` }}
              />
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
            <Link to="/galeria">
              Ver Galería Completa
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
