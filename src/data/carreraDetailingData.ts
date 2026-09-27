// Carrera Detailing (/formacion-profesional-detailing): el programa completo de la academia.
// Precios de los cursos sueltos: siempre desde formationDetails, para que no se desincronicen.
import { formationDetails, type FormationDetail } from '@/data/formationDetails';
import { formatPrice } from '@/lib/format';

const detailing = formationDetails['curso-detailing-profesional'];
const wrapping = formationDetails['curso-vinilado-vehiculos'];
const ppf = formationDetails['curso-ppf-proteccion-pintura'];

/** Precio de los cursos técnicos comprados por separado (wrapping: los dos niveles). */
const separatePrice = detailing.price + (wrapping.levels ?? []).reduce((sum, l) => sum + (l.price ?? wrapping.price), 0) + ppf.price;

export interface CarreraSpeciality {
  slug: string;
  name: string;
  duration: string;
  text: string;
}

export interface CarreraBusinessBlock {
  title: string;
  items: string[];
}

const PRICE = 7997;

export const carreraDetailingData = {
  slug: 'formacion-profesional-detailing',
  name: 'Carrera Detailing',
  duration: '1 mes de formación intensiva',
  durationShort: '1 mes',
  price: PRICE,

  /** Los cursos técnicos que incluye (cada uno enlaza a su página) */
  specialities: [
    {
      slug: detailing.slug,
      name: 'Detailing profesional',
      duration: detailing.durationShort,
      text: 'Corrección de pintura, pulido con rotativa y roto-orbital, tratamientos cerámicos e interiores.',
    },
    {
      slug: wrapping.slug,
      name: 'Car wrapping',
      duration: '4 días · 2 niveles',
      text: 'Vinilado y cambio de color: nivel principiante y avanzado, con cromados e interiores de puerta.',
    },
    {
      slug: ppf.slug,
      name: 'PPF',
      duration: ppf.durationShort,
      text: 'Film de protección de pintura: corte manual y por plotter, colocación en húmedo y zonas complejas.',
    },
  ] as CarreraSpeciality[],

  /** Módulo de negocio */
  business: [
    {
      title: 'Precios y márgenes',
      items: ['Coste real de cada servicio', 'Precios que dejan margen', 'Presupuestos profesionales', 'Control de costes'],
    },
    {
      title: 'Captar y cuidar clientes',
      items: ['Redes sociales y fotos de tus trabajos', 'Publicidad online y marketing local', 'Atención al cliente', 'Fidelización y recomendaciones'],
    },
    {
      title: 'Organizar el taller',
      items: ['Citas y operativa diaria', 'Proveedores y stock', 'Organización del espacio', 'Trabajo en equipo'],
    },
    {
      title: 'Montar y crecer',
      items: ['Alta como autónomo o sociedad', 'Gestoría, seguros y contratos', 'Qué servicios añadir', 'Cuándo contratar'],
    },
  ] as CarreraBusinessBlock[],

  includes: [
    `Curso de Detailing Profesional completo (${detailing.durationShort})`,
    'Curso de Car Wrapping, niveles principiante y avanzado (4 días)',
    `Curso de PPF (${ppf.durationShort})`,
    'Práctica en el taller de Detail Park con coches de clientes',
    'Módulo de negocio: precios, clientes, organización y crecimiento',
    'Material, herramientas y comida en los días de curso',
    'Certificado de Detail Park de cada especialidad',
    'Resolución de dudas después y acceso a la bolsa de empleo',
  ],

  faqs: [
    {
      question: '¿Qué es la Carrera Detailing?',
      answer:
        'Es el programa completo de Academia Detail: un mes en Detail Park (Alicante) con los cursos de detailing, car wrapping (dos niveles) y PPF, práctica en el taller con coches de clientes y un módulo de negocio para montar y llevar tu propio centro.',
    },
    {
      question: '¿Necesito experiencia previa?',
      answer: 'No. Cada especialidad empieza desde cero y es práctica: trabajas sobre coches reales desde el primer día.',
    },
    {
      question: '¿Qué diferencia hay con hacer los cursos por separado?',
      answer: `Por separado, los cursos de detailing, wrapping (los dos niveles) y PPF cuestan ${formatPrice(separatePrice)} + IVA. La Carrera incluye esos mismos cursos, la práctica en el taller y el módulo de negocio, que no se ofrece suelto, por ${formatPrice(PRICE)} + IVA.`,
    },
    {
      question: '¿Qué incluye el módulo de negocio?',
      answer:
        'Precios y márgenes, presupuestos, captación y atención de clientes, marketing, organización del taller, proveedores y los trámites para darte de alta como autónomo o sociedad. Lo que hemos aprendido montando Detail Park.',
    },
    {
      question: '¿Es una titulación oficial?',
      answer:
        'No. Es una formación privada y práctica. Al terminar cada especialidad recibes el certificado de Detail Park, que acredita la formación realizada.',
    },
    {
      question: '¿Cómo son las jornadas?',
      answer: 'En los cursos, jornadas de unas 8 horas con una hora para comer; la comida está incluida. Al pedir información te enviamos el calendario completo de la edición.',
    },
    {
      question: '¿Dónde me alojo durante el mes?',
      answer: 'Si vienes de fuera, te ayudamos a buscar alojamiento cerca del taller. El alojamiento no está incluido en el precio.',
    },
    {
      question: '¿Se puede pagar a plazos?',
      answer: 'Sí, hay opciones de financiación para fraccionar el pago. Escríbenos y te explicamos las condiciones.',
    },
    {
      question: '¿Cuándo es la próxima edición?',
      answer: 'Estamos cerrando el calendario. Escríbenos y te avisamos en cuanto haya fechas.',
    },
  ],
};

/**
 * La Carrera con la forma de un curso, para reutilizar los componentes de
 * src/components/course (hero, precio, formador).
 */
export const carreraCourse: FormationDetail = {
  id: carreraDetailingData.slug,
  slug: carreraDetailingData.slug,
  name: 'Programa Carrera Detailing',
  title: 'Carrera Detailing: formación profesional de detailing, wrapping y PPF',
  subtitle: 'Detailing, car wrapping, PPF y módulo de negocio',
  description:
    'Programa de un mes en Detail Park (Alicante): cursos de detailing, car wrapping y PPF, práctica en el taller con coches de clientes y módulo de negocio para montar tu centro.',
  duration: carreraDetailingData.duration,
  durationShort: carreraDetailingData.durationShort,
  price: carreraDetailingData.price,
  image: '',
  heroAlt: 'Daniel López guía a un alumno con la pulidora durante una formación en Detail Park',
  heroDescription:
    'Un mes en el taller de Detail Park para aprender las tres especialidades —detailing, car wrapping y PPF— y un módulo de negocio para montar y llevar tu propio centro.',
  brandGroup: 'detailing',
  instructor: detailing.instructor,
  certificationTitle: 'certificado de Detail Park de cada especialidad',
  forWho: [],
  whatYouLearn: [],
  modules: [],
  includes: carreraDetailingData.includes,
  faqs: carreraDetailingData.faqs,
};
