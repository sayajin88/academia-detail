// Fuente única de datos de contacto, cifras y opiniones.
// Si cambia una cifra (alumnos, reseñas…), se cambia SOLO aquí.

export const SITE = {
  name: 'Academia Detail',
  company: 'Detailing Car & Parking Club S.L.',
  founder: 'Daniel López',
  founderRole: 'Fundador de Detail Park y formador',
  founderYears: 15,
  phone: '+34 622 773 555',
  phoneHref: 'tel:+34622773555',
  whatsappNumber: '34622773555',
  email: 'info@academiadetail.com',
  street: 'Calle Metalurgias, 13',
  postalCode: '03008',
  city: 'Alicante',
  mapsUrl: 'https://maps.google.com/?q=Detail+Park+Calle+Metalurgias+13+03008+Alicante',
  googleReviewsUrl: 'https://share.google/Rkmut757wnebOlR70',
  detailParkUrl: 'https://detailpark.com/',
  sistemaDetailUrl: 'https://sistemadetail.com/',
  instagram: [
    { label: '@detailparkoficial', href: 'https://www.instagram.com/detailparkoficial/' },
    { label: '@danidetailoficial', href: 'https://www.instagram.com/danidetailoficial/' },
  ],
  youtube: 'https://www.youtube.com/@detailpark',
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const STATS = {
  /** Alumnos formados en la academia (cifra acordada el 27-09-2026 para todas las webs) */
  alumnos: '500+',
  /** Proyectos realizados en Detail Park (misma cifra en todas las webs) */
  proyectos: '+2.000',
  /** Alumnos por grupo como máximo */
  maxAlumnosGrupo: 3,
  /** Valoración de Detail Park (el centro donde se imparten los cursos) en Google */
  googleRating: 4.8,
  googleReviews: 218,
} as const;

/** Texto que se muestra mientras no haya fechas cerradas de las próximas ediciones. */
export const NEXT_EDITION = 'Próximamente';

export interface StudentReview {
  name: string;
  context: string;
  text: string;
}

/**
 * Opiniones reales de alumnos publicadas en la ficha de Google de Detail Park
 * (extractos; el texto completo está en Google).
 */
export const STUDENT_REVIEWS: StudentReview[] = [
  {
    name: 'Jorge Sapunarov',
    context: 'Alumno del curso de detailing',
    text: 'El curso tiene una duración de 4 días y es muy intensivo: un 10 % de teoría y un 90 % de práctica. En todo momento utilizarás máquinas y estarás solucionando problemas que te puedes encontrar el día de mañana trabajando.',
  },
  {
    name: 'Sergio Rodrigo García',
    context: 'Alumno de la academia',
    text: 'Acudí a uno de sus cursos y salí encantado. Dani nos estuvo formando y de corazón lo digo: aprendes un montón con él. Se preocupa por cada alumno del curso y está todo el rato ayudándote y aconsejándote.',
  },
  {
    name: 'Angel Pujante',
    context: 'Cars Wash Detailing Murcia',
    text: 'Estuvimos en Detail Park para un curso intensivo de la mano de Daniel. El trato, todo el curso, la comida, la cercanía… Estamos muy agradecidos por enseñarnos, formarnos y darnos consejos para mejorar.',
  },
];
