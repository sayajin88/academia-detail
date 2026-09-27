import { useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/data/galleryData';

interface ImageLightboxProps {
  images: GalleryImage[];
  /** Foto abierta (null = cerrado) */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const navButton =
  'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';

/** Visor de fotos a pantalla completa (teclado: flechas y Esc). */
export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = index === null ? null : images[index];

  const prev = useCallback(() => {
    if (index !== null && index > 0) onNavigate(index - 1);
  }, [index, onNavigate]);

  const next = useCallback(() => {
    if (index !== null && index < images.length - 1) onNavigate(index + 1);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onClose, prev, next]);

  if (!image || index === null) return null;
  const srcSet = Object.values(image.picture.sources)[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Cerrar">
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {index > 0 && (
        <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className={`${navButton} left-2 md:left-4`} aria-label="Foto anterior">
          <ChevronLeft className="h-7 w-7" aria-hidden="true" />
        </button>
      )}
      {index < images.length - 1 && (
        <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className={`${navButton} right-2 md:right-4`} aria-label="Foto siguiente">
          <ChevronRight className="h-7 w-7" aria-hidden="true" />
        </button>
      )}

      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.picture.img.src}
          srcSet={srcSet}
          sizes="90vw"
          alt={image.alt}
          className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-white/80">
          {image.caption} <span className="ml-2 text-white/50">{index + 1} / {images.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}
