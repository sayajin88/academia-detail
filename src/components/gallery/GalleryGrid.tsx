import { useState } from 'react';
import { GalleryImage } from '@/data/galleryData';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

function GalleryImageItem({ image, index, onImageClick }: { 
  image: GalleryImage; 
  index: number; 
  onImageClick: (image: GalleryImage) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
      onClick={() => onImageClick(image)}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Skeleton placeholder to prevent CLS */}
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-lg" />
      )}
      
      <img
        src={image.src}
        alt={image.alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
          loaded ? "opacity-100" : "opacity-0"
        )}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        width={300}
        height={300}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-white" aria-hidden="true" />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-xs md:text-sm line-clamp-1">{image.title}</h3>
        </div>
      </div>
    </div>
  );
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
      {images.map((image, index) => (
        <GalleryImageItem
          key={image.id}
          image={image}
          index={index}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
}
