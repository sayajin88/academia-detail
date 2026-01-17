import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/data/galleryData';

interface ImageLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (image: GalleryImage) => void;
}

export function ImageLightbox({ image, images, onClose, onNavigate }: ImageLightboxProps) {
  const currentIndex = image ? images.findIndex((img) => img.id === image.id) : -1;

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(images[currentIndex - 1]);
    }
  }, [currentIndex, images, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onNavigate(images[currentIndex + 1]);
    }
  }, [currentIndex, images, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    },
    [onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Cerrar"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image info */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white">{image.title}</h3>
          {image.description && (
            <p className="text-white/70 mt-1">{image.description}</p>
          )}
          <p className="text-white/50 text-sm mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
