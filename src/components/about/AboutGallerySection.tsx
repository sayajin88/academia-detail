import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { galleryImages } from '@/data/galleryData';
import { SITE } from '@/data/site';

export function AboutGallerySection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section tone="card" id="instalaciones" aria-labelledby="instalaciones-title">
      <SectionHeader
        id="instalaciones-title"
        eyebrow="Instalaciones"
        title="Así es Detail Park por dentro"
        lead="Los cursos se imparten en el propio taller, con la maquinaria y los productos con los que trabajamos cada día."
      />
      <GalleryGrid images={galleryImages} onImageClick={setOpen} />
      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
        {SITE.street}, {SITE.postalCode} {SITE.city} ·
        <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
          Cómo llegar
        </a>
      </p>
      <ImageLightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </Section>
  );
}
