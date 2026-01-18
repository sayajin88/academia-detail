import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { galleryImages, GalleryCategory, GalleryImage } from '@/data/galleryData';

export function AboutGallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo(() => {
    return {
      all: galleryImages.length,
      detailing: galleryImages.filter((img) => img.category === 'detailing').length,
      wrapping: galleryImages.filter((img) => img.category === 'wrapping').length,
      ppf: galleryImages.filter((img) => img.category === 'ppf').length,
      restauracion: galleryImages.filter((img) => img.category === 'restauracion').length,
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <SectionHeading
          badge="Nuestros Trabajos"
          title="La Prueba de Nuestro Trabajo Diario"
          subtitle="Estos son trabajos reales realizados en nuestro taller. No simulaciones ni prácticas de academia: clientes reales con vehículos de alta gama."
        />

        {/* Filters */}
        <div className="mt-10 mb-10">
          <GalleryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={counts}
          />
        </div>

        {/* Grid */}
        <GalleryGrid images={filteredImages} onImageClick={setSelectedImage} />

        {/* Lightbox */}
        <ImageLightbox
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      </div>
    </section>
  );
}
