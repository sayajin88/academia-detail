import { Expand } from 'lucide-react';
import { Img } from '@/components/ds/Img';
import type { GalleryImage } from '@/data/galleryData';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

/** Rejilla de fotos 4:3 (2 columnas en móvil, 4 en escritorio). */
export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {images.map((image, i) => (
        <li key={image.id}>
          <figure className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onImageClick(i)}
              className="group relative block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Ampliar foto: ${image.caption}`}
            >
              <Img
                picture={image.picture}
                alt={image.alt}
                sizes="(min-width: 1024px) 280px, 50vw"
                className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                <Expand className="h-4 w-4" />
              </span>
            </button>
            <figcaption className="text-[13px] leading-snug text-muted-foreground md:text-sm">{image.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
