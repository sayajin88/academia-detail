import { GalleryImage } from '@/data/galleryData';
import { Search } from 'lucide-react';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No hay imágenes en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer"
          onClick={() => onImageClick(image)}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Search className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              {image.description && (
                <p className="text-white/70 text-sm mt-1 line-clamp-2">{image.description}</p>
              )}
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
              {image.category === 'restauracion' ? 'Restauración' : image.category.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
