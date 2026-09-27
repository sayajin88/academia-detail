import { cn } from '@/lib/utils';

interface ImgProps {
  /** Resultado de importar una foto con `?w=...&format=webp&as=picture` */
  picture: ImagetoolsPicture;
  alt: string;
  /** Ancho que ocupa en pantalla, para que el navegador elija la versión justa */
  sizes?: string;
  className?: string;
  /** true solo para la imagen principal visible al cargar (LCP) */
  priority?: boolean;
}

/** Foto responsive en WebP con ancho/alto reales (sin saltos de maquetación). */
export function Img({ picture, alt, sizes = '100vw', className, priority = false }: ImgProps) {
  const srcSet = Object.values(picture.sources)[0];
  return (
    <img
      src={picture.img.src}
      srcSet={srcSet}
      sizes={sizes}
      width={picture.img.w}
      height={picture.img.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn('h-auto w-full object-cover', className)}
    />
  );
}
