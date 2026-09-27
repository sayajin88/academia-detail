// Fotos reales de las instalaciones de Detail Park y de las clases (página «Quiénes somos»).
import { SITE } from '@/data/site';
import tallerFerrari from '@/assets/instalaciones-curso-ferrari.jpg?w=400;800;1400&format=webp&as=picture';
import tallerClasicos from '@/assets/instalaciones-clase-coches-clasicos.jpg?w=400;800;1400&format=webp&as=picture';
import material from '@/assets/material-curso-detailing.jpg?w=400;800;1400&format=webp&as=picture';
import pulidoManos from '@/assets/practicas-alumnos-detailing-2.jpg?w=400;800;1400&format=webp&as=picture';
import pulidoGrupo from '@/assets/practicas-alumnos-detailing-4.jpg?w=400;800;1400&format=webp&as=picture';
import formadorPulido from '@/assets/daniel-curso-detailing-1.jpg?w=400;800;1400&format=webp&as=picture';
import faros from '@/assets/evento-pulido-faro.jpg?w=400;800;1400&format=webp&as=picture';
import interior from '@/assets/evento-limpieza-interior.jpg?w=400;800;1400&format=webp&as=picture';

export interface GalleryImage {
  id: string;
  picture: ImagetoolsPicture;
  alt: string;
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'taller',
    picture: tallerFerrari,
    alt: 'Nave de Detail Park con alumnos atendiendo una explicación junto a un Ferrari rojo',
    caption: 'La nave de Detail Park, donde se imparten las clases',
  },
  {
    id: 'clasicos',
    picture: tallerClasicos,
    alt: 'Clase teórica con pizarra y pantalla junto a un Porsche clásico en el taller',
    caption: 'Teoría en el propio taller, junto a los coches',
  },
  {
    id: 'pulido-manos',
    picture: pulidoManos,
    alt: 'Manos de varios alumnos guiando una pulidora sobre la pintura de un coche',
    caption: 'Prácticas de pulido desde el primer día',
  },
  {
    id: 'formador',
    picture: formadorPulido,
    alt: `${SITE.founder} corrigiendo a una alumna mientras pule el capó de un coche rojo`,
    caption: 'El formador corrige tu técnica mientras trabajas',
  },
  {
    id: 'material',
    picture: material,
    alt: 'Pulidoras rotativas y orbitales con sus boinas preparadas para la clase',
    caption: 'Pulidoras y boinas listas para las prácticas',
  },
  {
    id: 'pulido-grupo',
    picture: pulidoGrupo,
    alt: 'Alumnos con camiseta de la academia puliendo juntos un coche negro',
    caption: 'Trabajo sobre vehículos reales',
  },
  {
    id: 'faros',
    picture: faros,
    alt: 'Técnico de Detail Park limpiando con aire a presión el contorno de un faro',
    caption: 'Trabajo de detalle en cada pieza',
  },
  {
    id: 'interior',
    picture: interior,
    alt: 'Alumna con frontal y mascarilla limpiando el interior de un coche',
    caption: 'Limpieza y acondicionamiento de interiores',
  },
];
