import detailingHero from '@/assets/heroes/hero-detailing.jpg';
import wrappingHero from '@/assets/heroes/hero-wrapping.jpg';
import ppfHero from '@/assets/heroes/hero-ppf.jpg';
import restauracionHero from '@/assets/heroes/hero-restauracion.jpg';
import instructorDaniel from '@/assets/instructor-daniel-principal.png';

export interface FormationModule {
  title: string;
  topics: string[];
}

export interface FormationLevel {
  title: string;
  subtitle: string;
  duration?: string;
  price?: number;
  note?: string;
  features: string[];
  highlighted?: boolean;
}

export interface FormationInstructor {
  name: string;
  role: string;
  image: string;
  description: string;
  quote: string;
}

export interface FormationDetail {
  id: string;
  slug: string;
  /** Nombre corto que se ve en la página (H1) */
  name: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  /** Duración corta para fichas: "4 días" */
  durationShort: string;
  price: number;
  image: string;
  heroDescription: string;
  forWho: string[];
  whatYouLearn: string[];
  modules: FormationModule[];
  includes: string[];
  faqs: { question: string; answer: string }[];
  /** Opciones del curso cuando hay más de un nivel (mismo precio cada una) */
  levels?: FormationLevel[];
  instructor?: FormationInstructor;
  certificationTitle?: string;
  comingSoon?: boolean;
  heroAlt?: string;
  /** Marcas que se muestran en la franja de logos */
  brandGroup: 'detailing' | 'wrapping' | 'ppf';
  // Campos antiguos que aún lee el SEO; se mantienen opcionales.
  originalPrice?: number;
}

const danielInstructor: FormationInstructor = {
  name: 'Daniel López',
  role: 'Fundador de Detail Park',
  image: instructorDaniel,
  description:
    'Soy detailer desde que tengo uso de razón y dirijo Detail Park en Alicante. En más de 15 años he tratado miles de coches, y en la academia enseño exactamente lo que hacemos cada día en el taller.',
  quote: 'Formamos en grupos pequeños porque nos importa más la calidad que la cantidad.',
};

// Preguntas comunes a todos los cursos
const commonFaqs = {
  experiencia: {
    question: '¿Necesito experiencia previa?',
    answer: 'No. El curso empieza desde cero y es 100 % práctico: saldrás sabiendo trabajar sobre un coche real.',
  },
  alojamiento: {
    question: 'Si soy de fuera, ¿me ayudáis con el alojamiento?',
    answer: 'Sí. Vengas de donde vengas, te ayudamos a gestionar el alojamiento cerca del taller para que solo te preocupes de aprender.',
  },
  material: {
    question: '¿Tengo que llevar material o mi coche?',
    answer: 'No. Te damos todo el material y las herramientas, y trabajamos con vehículos que ponemos nosotros.',
  },
  horario: {
    question: '¿Cómo son las jornadas?',
    answer: 'Jornadas de unas 8 horas con una hora para comer. La comida está incluida todos los días del curso.',
  },
  despues: {
    question: '¿Puedo preguntar dudas después del curso?',
    answer: 'Sí. Cuando empieces a trabajar por tu cuenta te seguimos resolviendo dudas.',
  },
  certificado: {
    question: '¿Recibo un certificado?',
    answer: 'Sí. Al terminar recibes el certificado de Detail Park, que acredita la formación práctica realizada.',
  },
  financiacion: {
    question: '¿Se puede pagar a plazos?',
    answer: 'Sí, hay opciones de financiación para fraccionar el pago. Escríbenos y te explicamos las condiciones.',
  },
  fechas: {
    question: '¿Cuándo es la próxima edición?',
    answer: 'Estamos cerrando el calendario. Escríbenos y te avisamos en cuanto haya fechas; los grupos son de 3 alumnos como máximo, así que conviene reservar pronto.',
  },
};

export const formationDetails: Record<string, FormationDetail> = {
  'curso-detailing-profesional': {
    id: 'curso-detailing-profesional',
    slug: 'curso-detailing-profesional',
    name: 'Curso de Detailing Profesional',
    title: 'Curso Detailing Intensivo: Pulido y Tratamiento Cerámico Profesional',
    subtitle: 'Corrección de pintura, pulido y protección cerámica desde cero',
    description:
      'Curso de detailing intensivo de 4 días: pulido de coches, tratamiento cerámico y corrección de pintura. Formación presencial y práctica en un taller real de Alicante, en grupos de máximo 3 alumnos, con certificado de Detail Park.',
    duration: '4 días de formación intensiva',
    durationShort: '4 días',
    price: 2997,
    image: detailingHero,
    heroAlt: 'Alumno puliendo la carrocería de un coche negro durante el curso de detailing',
    heroDescription:
      'Cuatro días en el taller de Detail Park aprendiendo a corregir pintura, pulir con rotativa y roto-orbital, aplicar tratamientos cerámicos y detallar interiores. Un 10 % de teoría y un 90 % de práctica, en grupos de máximo 3 alumnos.',
    brandGroup: 'detailing',
    instructor: danielInstructor,
    certificationTitle: 'Certificado de Detailing Profesional de Detail Park',
    forWho: [
      'Aficionados que quieren aprender a trabajar como un profesional',
      'Profesionales del sector que quieren mejorar la calidad de su servicio',
      'Quien quiere montar su propio centro de detailing',
      'Cualquier persona con pasión por el cuidado de los coches',
    ],
    whatYouLearn: [
      'Producto y herramientas profesionales: qué usar y cuándo',
      'Lavado seguro y descontaminación química y mecánica',
      'Pulido de corrección con rotativa y roto-orbital',
      'Ceras, sellantes y tratamientos cerámicos',
      'Detallado completo de interiores',
      'Cómo presupuestar y tratar al cliente',
    ],
    modules: [
      {
        title: 'Fundamentos de corrección de pintura',
        topics: ['Identificación de defectos de pintura', 'Tipos de pintura y acabados', 'Medición de espesores', 'Seguridad y ergonomía'],
      },
      {
        title: 'Técnicas de pulido',
        topics: ['Tipos de pulidora profesional', 'Pulido con rotativa', 'Pulido con roto-orbital', 'Selección de pads y compuestos'],
      },
      {
        title: 'Corrección avanzada',
        topics: ['Sistema de fases de pulido', 'Lijado profesional', 'Corrección en varios pasos', 'Detallado de llantas'],
      },
      {
        title: 'Sellado y protección',
        topics: ['Ceras de carnauba', 'Sellantes sintéticos', 'Preparación de superficie', 'Cómo aplicar cada protección'],
      },
      {
        title: 'Tratamiento cerámico',
        topics: ['Qué es y cómo funciona', 'Aplicación paso a paso', 'Curado y mantenimiento', 'Durabilidad y garantías'],
      },
      {
        title: 'Detallado de interiores',
        topics: ['Detallado completo de interior', 'Extracción de asientos', 'Máquina de inyección y extracción', 'Tratamiento de cuero y plásticos'],
      },
    ],
    includes: [
      'Material y herramientas profesionales durante el curso',
      'Comida todos los días de formación',
      'Certificado de Detail Park',
      'Resolución de dudas después del curso',
      'Acceso a la bolsa de empleo del sector',
      'Ayuda con el alojamiento si vienes de fuera',
    ],
    faqs: [
      commonFaqs.experiencia,
      {
        question: '¿Con qué marcas trabajáis?',
        answer:
          'Somos un centro independiente: no representamos a ninguna marca. Trabajamos con las líderes del sector (Koch Chemie, Gyeon, Rupes, Menzerna, Meguiar’s, 3M…) para que aprendas a elegir el producto adecuado en cada caso.',
      },
      commonFaqs.material,
      commonFaqs.horario,
      commonFaqs.alojamiento,
      commonFaqs.certificado,
      commonFaqs.despues,
      {
        question: '¿Hay curso de detailing online?',
        answer: 'No. El detailing se aprende con las manos sobre vehículos reales, así que la formación es solo presencial.',
      },
      commonFaqs.financiacion,
      commonFaqs.fechas,
    ],
  },

  'curso-vinilado-vehiculos': {
    id: 'curso-vinilado-vehiculos',
    slug: 'curso-vinilado-vehiculos',
    name: 'Curso de Car Wrapping',
    title: 'Curso Wrapping Intensivo: Instalación de Vinilo Profesional',
    subtitle: 'Vinilado y cambio de color de vehículos desde cero',
    description:
      'Curso de wrapping intensivo de 2 a 4 días: instalación de vinilo, rotulación de vehículos y cambio de color. Formación presencial y práctica en un taller real de Alicante, con certificado de Detail Park.',
    duration: '2 a 4 días de formación intensiva',
    durationShort: '2 a 4 días',
    price: 1999,
    image: wrappingHero,
    heroAlt: 'Alumno instalando vinilo en la carrocería de un coche durante el curso de wrapping',
    heroDescription:
      'Aprende a instalar vinilo y hacer cambios de color completos: desde las superficies planas hasta curvas, retrovisores y paragolpes. Dos niveles de 2 días cada uno, en el taller de Detail Park.',
    brandGroup: 'wrapping',
    instructor: danielInstructor,
    certificationTitle: 'Certificado de Car Wrapping de Detail Park',
    levels: [
      {
        title: 'Nivel principiante',
        subtitle: 'Fundamentos completos de car wrapping',
        duration: '2 días',
        price: 1999,
        features: ['Qué es el car wrapping', 'Tipos, calidades y materiales de vinilo', 'Tipos de instalación', 'Metodología de corte', 'Instalación práctica', 'Cómo explicárselo al cliente'],
      },
      {
        title: 'Nivel avanzado',
        subtitle: 'Técnicas avanzadas para profesionales',
        duration: '2 días',
        price: 1999,
        features: ['Instalación práctica avanzada', 'Instalación de cromados', 'Interiores de puerta', 'Técnicas de nivel avanzado'],
        note: 'Recomendado haber hecho antes el nivel principiante o tener experiencia.',
      },
    ],
    forWho: [
      'Aficionados que quieren aprender a vinilar de forma práctica',
      'Profesionales del sector que quieren ampliar servicios',
      'Quien quiere montar un negocio de vinilado',
      'Rotulistas que quieren especializarse en vehículos',
    ],
    whatYouLearn: [
      'Tipos de vinilo y cómo elegirlos',
      'Herramientas profesionales de instalación',
      'Preparación y desmontaje del vehículo',
      'Trabajo en superficies planas y curvas',
      'Recortes limpios y bordes invisibles',
      'Cómo presupuestar un cambio de color',
    ],
    modules: [
      {
        title: 'Introducción al wrapping',
        topics: ['Tipos de vinilo: mate, brillo, satinado y texturizados', 'Herramientas profesionales', 'Preparación del espacio de trabajo'],
      },
      {
        title: 'Preparación del vehículo',
        topics: ['Limpieza y descontaminación', 'Desmontaje de elementos', 'Tratamiento de bordes y huecos', 'Protección de zonas sensibles'],
      },
      {
        title: 'Técnicas de instalación',
        topics: ['Posicionamiento y tensión del vinilo', 'Trabajo con pistola de calor', 'Curvas, retrovisores y paragolpes', 'Técnicas de recorte'],
      },
      {
        title: 'Acabados profesionales',
        topics: ['Post-calentamiento y sellado', 'Bordes invisibles', 'Solución de problemas comunes', 'Control de calidad y entrega'],
      },
    ],
    includes: [
      'Material de práctica y herramientas profesionales',
      'Comida todos los días de formación',
      'Certificado de Detail Park',
      'Resolución de dudas después del curso',
      'Acceso a la bolsa de empleo del sector',
      'Ayuda con el alojamiento si vienes de fuera',
    ],
    faqs: [
      commonFaqs.experiencia,
      {
        question: '¿Qué diferencia hay entre los dos niveles?',
        answer:
          'El nivel principiante (2 días) cubre los fundamentos y la instalación práctica. El avanzado (2 días) entra en cromados, interiores de puerta y técnicas complejas. Puedes hacer los dos seguidos en 4 días.',
      },
      {
        question: '¿Con qué marcas de vinilo trabajáis?',
        answer: 'Somos independientes. Trabajamos con marcas líderes como 3M, Avery Dennison o Hexis para que aprendas a elegir el vinilo adecuado.',
      },
      commonFaqs.material,
      commonFaqs.horario,
      commonFaqs.alojamiento,
      commonFaqs.certificado,
      commonFaqs.financiacion,
      commonFaqs.fechas,
    ],
  },

  'curso-ppf-proteccion-pintura': {
    id: 'curso-ppf-proteccion-pintura',
    slug: 'curso-ppf-proteccion-pintura',
    name: 'Curso de PPF',
    title: 'Curso PPF Profesional | Instalación Paint Protection Film desde Cero',
    subtitle: 'Instalación de film de protección de pintura en taller real',
    description:
      'Curso de PPF intensivo de 2 días: instalación de paint protection film en vehículos. Formación presencial y práctica en un taller real de Alicante, en grupos reducidos, con certificado de Detail Park.',
    duration: '2 días de formación intensiva',
    durationShort: '2 días',
    price: 2397,
    image: ppfHero,
    heroAlt: 'Alumnos instalando film de protección de pintura en el frontal de un coche azul',
    heroDescription:
      'Dos días para aprender a instalar PPF como un profesional: corte manual y por plotter, colocación en húmedo, zonas complejas y acabados invisibles. En el taller de Detail Park, en grupos de máximo 3 alumnos.',
    brandGroup: 'ppf',
    instructor: danielInstructor,
    certificationTitle: 'Certificado de Instalador de PPF de Detail Park',
    forWho: [
      'Aficionados que quieren aprender a instalar PPF',
      'Profesionales del detailing que quieren ofrecer un servicio de alto valor',
      'Instaladores de wrapping que quieren especializarse',
      'Quien quiere montar un negocio de protección de pintura',
    ],
    whatYouLearn: [
      'Qué es el PPF y cómo elegir el film',
      'Herramientas profesionales de instalación',
      'Corte manual y por plotter con patrones',
      'Colocación en húmedo y tensado',
      'Zonas complejas: faros, retrovisores, paragolpes',
      'Acabados y bordes invisibles',
    ],
    modules: [
      {
        title: 'Fundamentos del PPF',
        topics: ['Qué es el PPF y cómo funciona', 'Diferencias entre marcas', 'Propiedades de autorregeneración', 'Software de corte y patrones'],
      },
      {
        title: 'Preparación y corte',
        topics: ['Limpieza previa a la instalación', 'Configuración del plotter', 'Creación y edición de patrones', 'Corte manual o por plotter'],
      },
      {
        title: 'Instalación',
        topics: ['Posicionamiento en húmedo', 'Rasquetas y herramientas', 'Capó y paragolpes', 'Faros, retrovisores y zonas complejas'],
      },
      {
        title: 'Full front y acabado',
        topics: ['Kits de frontal completo', 'Uniones invisibles', 'Control de calidad', 'Mantenimiento y presupuestos'],
      },
    ],
    includes: [
      'Film de práctica y herramientas profesionales',
      'Comida todos los días de formación',
      'Certificado de Detail Park',
      'Resolución de dudas después del curso',
      'Acceso a la bolsa de empleo del sector',
      'Ayuda con el alojamiento si vienes de fuera',
    ],
    faqs: [
      {
        question: '¿Necesito experiencia previa?',
        answer: 'No es obligatoria. Si ya has trabajado con vinilo avanzarás más rápido, porque las técnicas se parecen.',
      },
      {
        question: '¿Con qué marcas de PPF trabajáis?',
        answer: 'Somos independientes. Trabajamos con marcas líderes como XPEL, SunTek o 3M para que aprendas a elegir el film adecuado.',
      },
      commonFaqs.material,
      commonFaqs.horario,
      commonFaqs.alojamiento,
      commonFaqs.certificado,
      commonFaqs.despues,
      commonFaqs.financiacion,
      commonFaqs.fechas,
    ],
  },

  'curso-restauracion-vehiculos': {
    id: 'curso-restauracion-vehiculos',
    slug: 'curso-restauracion-vehiculos',
    name: 'Curso de Restauración de Vehículos',
    title: 'Curso Restauración de Vehículos | Cuero, Tapicerías y Coches Clásicos',
    subtitle: 'Cuero, tapicerías, ópticas y coches clásicos',
    description:
      'Curso de restauración de vehículos: cuero, tapicerías, faros, plásticos y pintura de coches clásicos. Estamos preparando esta formación; apúntate a la lista y te avisamos cuando abramos plazas.',
    duration: '2 días de formación intensiva',
    durationShort: '2 días',
    price: 449,
    image: restauracionHero,
    heroAlt: 'Coche clásico en el taller durante una restauración',
    heroDescription:
      'Estamos preparando un curso para recuperar pinturas oxidadas, restaurar cuero y tapicerías, pulir faros y devolver la vida a interiores deteriorados. Apúntate y te avisamos en cuanto abramos plazas.',
    brandGroup: 'detailing',
    comingSoon: true,
    forWho: [
      'Profesionales del detailing que quieren especializarse',
      'Talleres de chapa y pintura',
      'Aficionados a los coches clásicos',
      'Empresas de compraventa de vehículos',
    ],
    whatYouLearn: [
      'Evaluación del estado del vehículo',
      'Restauración de pintura oxidada',
      'Pulido de faros y ópticas',
      'Recuperación de plásticos y gomas',
      'Restauración de cuero y tapicerías',
      'Eliminación de óxido y olores',
    ],
    modules: [
      { title: 'Evaluación y diagnóstico', topics: ['Estado general del vehículo', 'Daños reparables', 'Presupuesto de restauración'] },
      { title: 'Pintura', topics: ['Pintura oxidada', 'Arañazos profundos', 'Pinturas monocapa delicadas'] },
      { title: 'Faros y ópticas', topics: ['Lijado progresivo', 'Pulido y sellado', 'Protección UV'] },
      { title: 'Plásticos e interior', topics: ['Plásticos y molduras', 'Cuero y vinilo', 'Olores persistentes'] },
    ],
    includes: [],
    faqs: [],
  },
};

export const getFormationBySlug = (slug: string): FormationDetail | undefined => {
  return formationDetails[slug];
};
