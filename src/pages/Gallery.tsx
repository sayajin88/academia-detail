import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { galleryImages, GalleryCategory, GalleryImage } from '@/data/galleryData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import heroImage from '@/assets/heroes/hero-galeria.jpg';

export default function Gallery() {
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
    <>
      <SEO {...seoConfig.gallery} />
      <MainLayout>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />

          <div className="container relative z-10">
            <SectionHeading
              badge="Portfolio Profesional"
              title="Galería: Trabajos de Detailing Profesional"
              subtitle="Resultados reales de nuestros cursos: detailing, wrapping, PPF y restauración en vehículos de alta gama. Ferrari, Lamborghini, Porsche y más."
            />
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-8 md:py-12">
          <div className="container">
            {/* Filters */}
            <div className="mb-10">
              <GalleryFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                counts={counts}
              />
            </div>

            {/* Grid */}
            <GalleryGrid images={filteredImages} onImageClick={setSelectedImage} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Quieres crear trabajos como estos?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aprende de los mejores profesionales del sector y conviértete en un experto del detailing automotriz.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/">
                Ver Formaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Lightbox */}
        <ImageLightbox
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      </MainLayout>
    </>
  );
}
