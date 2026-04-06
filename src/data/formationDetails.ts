import detailingHero from '@/assets/heroes/hero-detailing.jpg';
import wrappingHero from '@/assets/heroes/hero-wrapping.jpg';
import ppfHero from '@/assets/heroes/hero-ppf.jpg';
import restauracionHero from '@/assets/heroes/hero-restauracion.jpg';
import instructorDaniel from '@/assets/instructor-daniel-principal.png';
import certificadoImg from '@/assets/certificado-detailing.png';

export interface FormationModule {
  title: string;
  topics: string[];
}

export interface FormationAdvantage {
  icon: string;
  title: string;
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
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  heroDescription: string;
  forWho: string[];
  whatYouLearn: string[];
  modules: FormationModule[];
  includes: string[];
  faqs: { question: string; answer: string }[];
  // Optional extended sections
  advantages?: FormationAdvantage[];
  levels?: FormationLevel[];
  instructor?: FormationInstructor;
  certificationTitle?: string;
  certificationText?: string;
  certificationImage?: string;
  formacionRegladaItems?: { title: string; description: string }[];
  comingSoon?: boolean;
  heroAlt?: string;
}

export const formationDetails: Record<string, FormationDetail> = {
  'curso-detailing-profesional': {
    id: 'curso-detailing-profesional',
    slug: 'curso-detailing-profesional',
    title: 'Curso Detailing Intensivo: Pulido y Tratamiento Cerámico Profesional',
    subtitle: 'Formación Intensiva en Corrección de Pintura y Protección Cerámica — Aprende Desde Cero',
    description: 'Curso detailing intensivo de 4 días: pulido de coches, tratamiento cerámico y corrección de pintura profesional. Formación presencial 100% práctica en taller real con certificación oficial. Aprende detailing desde cero, accede a bolsa de empleo y soporte post-curso. La mejor escuela de detailing en España.',
    duration: '4 Días de Formación Intensiva',
    price: 2997,
    originalPrice: 3497,
    image: detailingHero,
    heroAlt: 'Curso detailing intensivo - Formación presencial en pulido de coches y tratamiento cerámico',
    heroDescription: 'Curso detailing intensivo y presencial en pulido de coches y tratamiento cerámico. Domina las técnicas de corrección de pintura, aplicación de cerámicos y detallado profesional. Aprende detailing desde cero con grupos reducidos de máximo 3 alumnos y prepárate para montar tu negocio con certificación oficial y bolsa de empleo.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
      { icon: 'Scale', title: 'Centro 100% neutral: Sin ataduras a marcas' },
    ],
    levels: [
      {
        title: 'Para Aficionados',
        subtitle: 'Iniciación al mundo del detailing',
        duration: '1-2 días',
        features: [
          'Aprender detailing de forma práctica',
          'Conocimiento del producto y herramientas',
          'Técnica y aplicación de la teoría',
          'Cursos adaptados entre semana o fines de semana',
        ],
      },
      {
        title: 'Para Profesionales',
        subtitle: 'Nivel avanzado para el sector',
        duration: '3-5 días',
        features: [
          'Conocimientos prácticos y teóricos completos',
          'Nivel profesional para dar calidad al cliente',
          'Para entusiastas que quieren nivel Pro',
          'Para profesionales que quieren mejorar',
        ],
        highlighted: true,
      },
      {
        title: 'Monta tu Negocio',
        subtitle: 'Emprende en el sector',
        features: [
          'Modelo de franquicia basado en experiencia real',
          'Monta tu lavadero profesional',
          'Sé tu propio jefe',
          'Acceso a dossier de franquicia',
        ],
      },
    ],
    instructor: {
      name: 'Daniel Lopez',
      role: 'CEO de Detail Park',
      image: instructorDaniel,
      description: '¡Hola! Mi nombre es Daniel, soy Detailer desde que tengo uso de la razón. He tenido la gran suerte de cumplir mi sueño y sigo haciendo lo mismo que cuando era pequeño. Ahora, soy el CEO de Detail Park. He tenido la gran oportunidad de tratar miles de coches en estos últimos 15 años y eso me ha otorgado una gran experiencia.',
      quote: 'Nuestro objetivo es proporcionar una formación personalizada y con un número reducido de personas. Nos importa más la calidad, que la cantidad.',
    },
    formacionRegladaItems: [
      {
        title: 'Formación Reglada',
        description: 'Curso estructurado como una carrera universitaria. Preparación y seguridad imprescindibles para los nuevos retos.',
      },
      {
        title: 'Detailing en el País',
        description: 'Unificamos los estándares en todo el sector de detailing con el objetivo de un marco nacional de calificación reconocido.',
      },
      {
        title: 'Calidad Identificable',
        description: 'Una insignia que te identifica como especialista de referencia. Excelencia con estándares de calidad europeos.',
      },
    ],
    certificationTitle: 'Certificación con Reconocimiento Nacional',
    certificationText: 'Gracias a nuestra certificación otorgada por Detail Park, no solo tendrás un diploma que avale tus conocimientos, sino que te servirá para añadir valor a tu currículum y dar confianza a tus futuros clientes. Además, tendrás acceso a nuestra bolsa de empleo para conectar con centros de Detail en toda España.',
    certificationImage: certificadoImg,
    forWho: [
      'Entusiastas del detailing que quieren aprender de forma práctica',
      'Profesionales del sector que quieren mejorar su calidad de servicio',
      'Emprendedores que quieren montar su lavadero profesional o centro de detailing',
      'Cualquier persona con pasión por el cuidado de vehículos',
    ],
    whatYouLearn: [
      'Conocimiento del producto y herramientas profesionales',
      'Técnicas de lavado seguro y descontaminación',
      'Pulido de corrección con rotativa y roto-orbital',
      'Aplicación de ceras, sellantes y tratamientos cerámicos',
      'Tratamiento completo de interiores profesional',
      'Preparación para el mundo laboral',
    ],
    modules: [
      {
        title: 'Fundamentos de Corrección de Pintura',
        topics: [
          'Curso de Aficionado completo',
          'Identificación de defectos de pintura',
          'Tipos de pintura y acabados',
          'Seguridad y ergonomía en el trabajo',
          'Herramientas y productos esenciales',
        ],
      },
      {
        title: 'Técnicas Profesionales de Pulido',
        topics: [
          'Tipos de pulidora profesional',
          'Cómo usar la pulidora correctamente',
          'Pulido con Rotativa',
          'Pulido con Roto-orbital',
          'Selección de pads y compounds',
        ],
      },
      {
        title: 'Sistema de Fases y Corrección Avanzada',
        topics: [
          'Sistema de fases de pulido',
          'Técnicas de lijado profesional',
          'Detallado de llantas',
          'Medición de espesores de pintura',
          'Corrección en múltiples pasos',
        ],
      },
      {
        title: 'Sellado y Protección Profesional',
        topics: [
          'Tipos de sellado profesional',
          'Ceras de Carnauba',
          'Cómo aplicar ceras correctamente',
          'Preparación de superficie para protección',
          'Sellantes sintéticos',
        ],
      },
      {
        title: 'Tratamiento Cerámico Avanzado',
        topics: [
          'Introducción al tratamiento cerámico',
          'Cómo aplicar tratamiento cerámico',
          'Cómo mantener el cerámico',
          'Durabilidad y garantías',
          'Productos profesionales de cerámica',
        ],
      },
      {
        title: 'Módulos de Detallado Interior Avanzado',
        topics: [
          'Detallado completo de interior',
          'Extracción de asientos',
          'Detallado de suelos y moquetas',
          'Uso de máquina de inyección y extracción',
          'Tratamiento de cuero y plásticos',
        ],
      },
    ],
    includes: [
      'Comida incluida durante todos los días',
      'Material de práctica con marcas punteras',
      'Herramientas profesionales del sector',
      'Certificado oficial Detail Park',
      'Acceso a bolsa de empleo nacional',
      'Asistencia post-formación personalizada',
      'Gestión de alojamiento (alumnos de fuera)',
    ],
    faqs: [
      {
        question: '¿Es necesario contar con experiencia previa?',
        answer: 'En absoluto. Estos cursos son 100% prácticos y te darán toda la información necesaria para poder trabajar el detailing en un coche.',
      },
      {
        question: 'Si soy de fuera, ¿Gestionáis el alojamiento?',
        answer: '¡Por supuesto! Vengas de donde vengas, podemos gestionarte el alojamiento para que te despreocupes totalmente.',
      },
      {
        question: '¿Está incluido las dietas?',
        answer: 'Tendrás incluida la comida durante los días del curso en cualquiera de sus opciones.',
      },
      {
        question: '¿Necesito llevar material del curso?',
        answer: 'No necesitas llevar nada. Te proporcionaremos todo el material con las marcas más punteras y mejores herramientas del sector.',
      },
      {
        question: '¿Cuánto tiempo dura el curso?',
        answer: 'Normalmente jornadas de 8 horas, con 1 hora para comer. La duración varía según el tipo de curso elegido.',
      },
      {
        question: '¿Saldré con una buena base de conocimiento?',
        answer: 'Saldrás preparado para poder trabajar el detailing profesionalmente gracias a la experiencia real en taller.',
      },
      {
        question: '¿Podré preguntar dudas después del curso?',
        answer: 'Por supuesto, tendrás asesoramiento personalizado por un Detailer experto. ¡Nos tendrás siempre a tu disposición!',
      },
      {
        question: '¿Hay algún tipo de certificado?',
        answer: 'Sí, al finalizar se entrega un certificado de asistencia con reconocimiento otorgado por Detail Park.',
      },
      {
        question: '¿Necesito traer mi propio coche?',
        answer: 'No, trabajaremos con vehículos que proporcionamos nosotros para la práctica.',
      },
      {
        question: '¿Trabajáis con alguna marca específica?',
        answer: 'No. Somos un centro 100% independiente y neutral. No tenemos ataduras comerciales con ninguna marca, lo que nos permite enseñarte a elegir los mejores productos del mercado según cada situación. Trabajamos con marcas líderes como Koch Chemie, Gyeon, Sonax, Meguiar\'s, 3M y muchas más, siempre eligiendo lo que realmente funciona.',
      },
      {
        question: '¿Se puede financiar el curso de detailing?',
        answer: 'Sí, ofrecemos opciones de financiación flexibles para que la inversión económica no sea un obstáculo. Puedes fraccionar el pago en cómodos plazos. Contacta con nosotros para conocer las condiciones y encontrar la mejor opción para ti.',
      },
      {
        question: '¿Hay bolsa de empleo tras la formación?',
        answer: 'Sí, todos nuestros alumnos certificados tienen acceso a nuestra bolsa de empleo nacional. Colaboramos con centros de detailing, talleres y empresas del sector que buscan profesionales formados. Además, si decides emprender, te asesoramos en la apertura de tu propio negocio de detailing.',
      },
      {
        question: '¿Ofrecéis cursos de detailing online?',
        answer: 'No. Nuestras formaciones son exclusivamente presenciales porque el detailing profesional requiere práctica real sobre vehículos. A diferencia de un curso detailing online, aquí trabajas desde el primer minuto con pulidoras, productos y coches reales en nuestro taller operativo. El 100% de nuestros alumnos confirma que la formación presencial es insustituible.',
      },
      {
        question: '¿Es un curso de detailing intensivo?',
        answer: 'Sí, nuestra formación de detailing es 100% intensiva: jornadas completas de 8 horas de práctica real en taller. En 3-5 días sales con nivel profesional para trabajar o montar tu propio negocio. Grupos reducidos de máximo 3 alumnos garantizan atención personalizada.',
      },
      {
        question: '¿Puedo venir desde Madrid, Barcelona u otra ciudad?',
        answer: 'Por supuesto. Recibimos alumnos de toda España e incluso internacionales. Gestionamos tu alojamiento cerca del taller para que solo te preocupes de aprender. Muchos de nuestros alumnos vienen desde Madrid, Barcelona, Valencia, Sevilla y otras ciudades.',
      },
    ],
  },
  'curso-vinilado-vehiculos': {
    id: 'curso-vinilado-vehiculos',
    slug: 'curso-vinilado-vehiculos',
    title: 'Curso Wrapping Intensivo: Instalación de Vinilo Profesional',
    subtitle: 'Formación Intensiva en Rotulación y Cambio de Color de Vehículos — Desde Cero',
    description: 'Curso wrapping intensivo de 2-4 días: instalación de vinilo, rotulación de vehículos y cambio de color profesional. Formación presencial 100% práctica en taller real con certificación oficial y bolsa de empleo. Aprende vinilado de vehículos desde cero.',
    duration: '2-4 Días de Formación Intensiva',
    price: 1999,
    originalPrice: 2499,
    image: wrappingHero,
    heroAlt: 'Curso wrapping intensivo - Formación presencial en vinilado de vehículos profesional',
    heroDescription: 'Curso wrapping intensivo y presencial en instalación de vinilo para cambio de color. Aprende desde cero con experiencia real en taller, desde las técnicas básicas hasta los acabados más complejos en superficies curvas. Grupos reducidos, certificación oficial y soporte post-curso.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
      { icon: 'Scale', title: 'Centro 100% neutral: Sin ataduras a marcas' },
    ],
    levels: [
      {
        title: 'Curso Nivel Principiante',
        subtitle: 'Fundamentos completos de Car Wrapping',
        duration: '2 Días de Formación',
        price: 1999,
        features: [
          '¿Qué es el Car Wrapping?',
          'Tipos de Vinilo',
          'Calidades y Materiales',
          'Tipos de Instalación',
          'Instalación Práctica',
          'Metodología de Corte',
          'Marcas y Distribuidores',
          'Cómo Explicar al cliente',
        ],
      },
      {
        title: 'Curso Nivel Avanzado',
        subtitle: 'Técnicas avanzadas para profesionales',
        duration: '2 Días de Formación',
        price: 1999,
        features: [
          'Instalación Práctica avanzada',
          'Instalación de cromados',
          'Interiores de puerta',
          'Técnicas de nivel avanzado',
        ],
        note: 'Se recomienda Curso Principiante si no se tiene experiencia',
        highlighted: true,
      },
    ],
    instructor: {
      name: 'Gerardo',
      role: 'Experto en Car Wrapping y PPF',
      image: instructorDaniel,
      description: 'Soy Detailer desde que tengo uso de la razón y experto en Car Wrapping y PPF. He tenido la gran suerte de formar parte del equipo de Detail Park. Ahora soy el responsable de Detail Park en Alicante con más de 10 años de experiencia tratando miles de coches.',
      quote: 'Nuestro objetivo es proporcionar una formación personalizada y con un número reducido de personas. Nos importa más la calidad, que la cantidad.',
    },
    formacionRegladaItems: [
      {
        title: 'Formación Reglada',
        description: 'Curso estructurado como una carrera universitaria. Preparación y seguridad imprescindibles para convertirte en un profesional.',
      },
      {
        title: 'Car Wrapping',
        description: 'Unificamos estándares en todo el sector de rotulación con objetivo de marco nacional reconocido.',
      },
      {
        title: 'Calidad Identificable',
        description: 'Excelencia en el servicio con estándares de calidad europeos. Tu trabajo será reconocido por su profesionalidad.',
      },
    ],
    certificationTitle: 'Certificación y Bolsa de Empleo',
    certificationText: 'Gracias a nuestra certificación otorgada por Detail Park, no solo tendrás un diploma que avale tus conocimientos, sino que te servirá para añadir valor a tu currículum y dar confianza a tus futuros clientes. Además, tendrás acceso a nuestra bolsa de empleo nacional para encontrar oportunidades laborales en el sector.',
    certificationImage: certificadoImg,
    forWho: [
      'Entusiastas que quieren aprender de forma práctica',
      'Profesionales del sector que quieren dar mejor calidad',
      'Emprendedores que quieren montar su negocio de vinilado',
      'Rotulistas que quieren especializarse en vehículos',
    ],
    whatYouLearn: [
      'Conocimiento del producto y tipos de vinilo',
      'Herramientas profesionales del sector',
      'Técnicas de instalación desde cero',
      'Trabajo en superficies planas y curvas',
      'Acabados profesionales',
      'Preparación para el mundo laboral',
    ],
    modules: [
      {
        title: 'Introducción al Wrapping',
        topics: [
          'Historia y evolución del car wrapping',
          'Tipos de vinilos: mate, brillo, satinado, texturizados',
          'Herramientas profesionales del sector',
          'Preparación del espacio de trabajo',
        ],
      },
      {
        title: 'Preparación del Vehículo',
        topics: [
          'Limpieza y descontaminación pre-wrapping',
          'Desmontaje de elementos',
          'Tratamiento de bordes y huecos',
          'Protección de zonas sensibles',
        ],
      },
      {
        title: 'Técnicas de Instalación',
        topics: [
          'Posicionamiento y tensión del vinilo',
          'Técnica de calor con pistola',
          'Trabajo en superficies planas',
          'Curvas, retrovisores y paragolpes',
          'Técnicas de recorte limpio',
        ],
      },
      {
        title: 'Acabados Profesionales',
        topics: [
          'Post-calentamiento y sellado',
          'Acabado de bordes invisibles',
          'Solución de problemas comunes',
          'Control de calidad final',
          'Entrega al cliente',
        ],
      },
    ],
    includes: [
      'Comida incluida durante todos los días',
      'Material de práctica ilimitado',
      'Herramientas de marcas punteras',
      'Certificado oficial Detail Park',
      'Acceso a bolsa de empleo',
      'Asistencia post-formación personalizada',
      'Gestión de alojamiento (alumnos de fuera)',
    ],
    faqs: [
      {
        question: '¿Es necesario contar con experiencia previa?',
        answer: 'En absoluto. Estos cursos son 100% prácticos y te darán toda la información necesaria para instalar vinilo en un coche.',
      },
      {
        question: 'Si soy de fuera, ¿Gestionáis el alojamiento?',
        answer: '¡Por supuesto! Vengas de donde vengas, podemos gestionarte el alojamiento para que te despreocupes totalmente.',
      },
      {
        question: '¿Está incluido las dietas?',
        answer: 'Tendrás incluida la comida durante los días del curso en cualquiera de sus opciones.',
      },
      {
        question: '¿Necesito llevar material del curso?',
        answer: 'No necesitas llevar nada. Te proporcionaremos todo el material con las marcas más punteras y mejores herramientas del sector.',
      },
      {
        question: '¿Cuánto tiempo dura el curso?',
        answer: 'Normalmente jornadas de 8 horas, con 1 hora para comer. La duración varía según el tipo de curso (1-5 días).',
      },
      {
        question: '¿Saldré con una buena base de conocimiento?',
        answer: 'Saldrás preparado para poder aplicar e instalar vinilo profesionalmente gracias a la experiencia real en taller.',
      },
      {
        question: '¿Podré preguntar dudas después del curso?',
        answer: 'Por supuesto, tendrás asesoramiento personalizado por un Detailer experto. ¡Nos tendrás siempre a tu disposición!',
      },
      {
        question: '¿Hay algún tipo de certificado?',
        answer: 'Sí, al finalizar se entrega un certificado de asistencia con reconocimiento otorgado por Detail Park.',
      },
      {
        question: '¿Trabajáis con alguna marca de vinilo específica?',
        answer: 'No. Somos un centro 100% independiente y neutral. No tenemos ataduras comerciales con ninguna marca, lo que nos permite enseñarte a elegir los mejores vinilos del mercado según cada situación. Trabajamos con marcas líderes como 3M, Avery Dennison, Hexis, Oracal y muchas más, siempre eligiendo lo que realmente funciona.',
      },
      {
        question: '¿Se puede financiar el curso de wrapping?',
        answer: 'Sí, ofrecemos opciones de financiación flexibles. Puedes fraccionar el pago en cómodos plazos para que la inversión no sea un obstáculo. Contacta con nosotros para conocer las condiciones.',
      },
      {
        question: '¿Hay bolsa de empleo para wrapping?',
        answer: 'Sí, nuestros alumnos certificados acceden a nuestra bolsa de empleo nacional. El car wrapping es uno de los servicios con mayor demanda y rentabilidad del sector, por lo que las oportunidades laborales son abundantes.',
      },
      {
        question: '¿Es un curso de wrapping intensivo?',
        answer: 'Sí, es formación 100% intensiva con jornadas de 8 horas de práctica real. En 2-4 días aprendes desde cero las técnicas de instalación de vinilo que necesitas para trabajar profesionalmente o emprender tu propio negocio de rotulación.',
      },
    ],
  },
  'curso-ppf-proteccion-pintura': {
    id: 'curso-ppf-proteccion-pintura',
    slug: 'curso-ppf-proteccion-pintura',
    title: 'Curso PPF Profesional | Instalación Paint Protection Film desde Cero',
    subtitle: 'Aprende a Instalar PPF Profesionalmente en Taller Real con Certificación Oficial',
    description: 'Curso PPF intensivo de 2 días: instalación de paint protection film en vehículos de alta gama. Formación presencial 100% práctica en taller real con certificación oficial y bolsa de empleo. Aprende instalación de PPF desde cero con grupos reducidos.',
    duration: '2 Días de Formación Intensiva',
    price: 2397,
    originalPrice: 2897,
    image: ppfHero,
    heroAlt: 'Curso PPF intensivo - Instalación profesional de paint protection film certificada',
    heroDescription: 'Curso PPF intensivo y presencial en instalación de Paint Protection Film. Aprende desde cero con experiencia real en taller, desde los fundamentos hasta las instalaciones más complejas en vehículos de alta gama. Grupos reducidos de máximo 3 alumnos, certificación oficial y soporte post-curso. Sin experiencia previa necesaria.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
      { icon: 'Scale', title: 'Centro 100% neutral: Sin ataduras a marcas' },
    ],
    levels: [
      {
        title: 'Curso de Instalación de PPF',
        subtitle: '2 Días de Formación Intensiva en Paint Protection Film',
        duration: '2 Días',
        price: 2397,
        features: [
          '¿Qué es un PPF?',
          'Tipos de PPF',
          'Calidades y Materiales',
          'Tipos de Instalación',
          'Instalación Práctica',
          'Metodología de Corte',
          'Marcas y Distribuidores',
          'Cómo Explicar al cliente',
        ],
        highlighted: true,
      },
    ],
    instructor: {
      name: 'Gerardo',
      role: 'Experto en Car Wrapping y PPF',
      image: instructorDaniel,
      description: 'Soy Detailer desde que tengo uso de la razón y experto en Car Wrapping y PPF. He tenido la gran suerte de formar parte del equipo de Detail Park. Ahora soy el responsable de Detail Park en Alicante con más de 10 años de experiencia tratando miles de coches.',
      quote: 'Nuestro objetivo es proporcionar una formación personalizada y con un número reducido de personas. Nos importa más la calidad, que la cantidad.',
    },
    formacionRegladaItems: [
      {
        title: 'Formación Reglada',
        description: 'Curso estructurado como una carrera universitaria. Preparación y seguridad imprescindibles para convertirte en un profesional.',
      },
      {
        title: 'PPF en España',
        description: 'Unificamos estándares en todo el sector de protección de pintura con objetivo de marco nacional reconocido.',
      },
      {
        title: 'Calidad Identificable',
        description: 'Excelencia en el servicio con estándares de calidad europeos. Tu trabajo será reconocido por su profesionalidad.',
      },
    ],
    certificationTitle: 'Certificación y Bolsa de Empleo',
    certificationText: 'Gracias a nuestra certificación otorgada por Detail Park, no solo tendrás un diploma que avale tus conocimientos, sino que te servirá para añadir valor a tu currículum y dar confianza a tus futuros clientes. Además, tendrás acceso a nuestra bolsa de empleo nacional para encontrar oportunidades laborales en el sector.',
    certificationImage: certificadoImg,
    forWho: [
      'Entusiastas que quieren aprender instalación de PPF de forma práctica',
      'Profesionales del sector que quieren dar mejor calidad de servicio',
      'Instaladores de wrapping que quieren especializarse en PPF',
      'Emprendedores que quieren ofrecer este servicio premium',
    ],
    whatYouLearn: [
      'Conocimiento del producto y tipos de film de protección',
      'Herramientas profesionales del sector',
      'Técnicas de instalación desde cero',
      'Trabajo en superficies planas y curvas',
      'Corte por plotter y patrones digitales',
      'Acabados profesionales invisibles',
    ],
    modules: [
      {
        title: 'Fundamentos del PPF',
        topics: [
          'Qué es el PPF y cómo funciona',
          'Diferencias entre marcas: XPEL, SunTek, 3M',
          'Propiedades de auto-regeneración',
          'Software de corte y patrones',
        ],
      },
      {
        title: 'Preparación y Corte',
        topics: [
          'Limpieza especializada pre-instalación',
          'Configuración del plotter de corte',
          'Creación y edición de patrones',
          'Corte manual vs corte por plotter',
        ],
      },
      {
        title: 'Instalación Profesional',
        topics: [
          'Técnicas de posicionamiento húmedo',
          'Squeegees y herramientas especializadas',
          'Instalación en capó y parachoques',
          'Faros, retrovisores y zonas complejas',
          'Técnicas de envoltura de bordes',
        ],
      },
      {
        title: 'Full Coverage y Acabado',
        topics: [
          'Instalación de kits full front',
          'Uniones invisibles entre piezas',
          'Control de calidad y corrección',
          'Cuidado y mantenimiento del PPF',
          'Presupuestos y gestión de clientes',
        ],
      },
    ],
    includes: [
      'Comida incluida durante todos los días',
      'Material de práctica con marcas punteras (XPEL, SunTek, 3M)',
      'Herramientas profesionales del sector',
      'Certificado oficial Detail Park',
      'Acceso a bolsa de empleo nacional',
      'Asistencia post-formación personalizada',
      'Gestión de alojamiento (alumnos de fuera)',
    ],
    faqs: [
      {
        question: '¿Es necesario contar con experiencia previa?',
        answer: 'No es obligatorio, pero tener experiencia en Wrapping ayuda mucho ya que las técnicas son similares.',
      },
      {
        question: 'Si soy de fuera, ¿Gestionáis el alojamiento?',
        answer: '¡Por supuesto! Vengas de donde vengas, podemos gestionarte el alojamiento para que te despreocupes totalmente.',
      },
      {
        question: '¿Está incluido las dietas?',
        answer: 'Tendrás incluida la comida durante los días del curso en cualquiera de sus opciones.',
      },
      {
        question: '¿Necesito llevar material del curso?',
        answer: 'No necesitas llevar nada. Te proporcionaremos todo el material con las marcas más punteras del sector (XPEL, SunTek, 3M).',
      },
      {
        question: '¿Cuánto tiempo dura el curso?',
        answer: 'Normalmente jornadas de 8 horas, con 1 hora para comer. La duración varía según el tipo de curso (1-5 días).',
      },
      {
        question: '¿Saldré con una buena base de conocimiento?',
        answer: 'Saldrás preparado para poder instalar PPF profesionalmente gracias a la experiencia real en taller.',
      },
      {
        question: '¿Podré preguntar dudas después del curso?',
        answer: 'Por supuesto, tendrás asesoramiento personalizado por un experto en PPF. ¡Nos tendrás siempre a tu disposición!',
      },
      {
        question: '¿Hay algún tipo de certificado?',
        answer: 'Sí, al finalizar se entrega un certificado de asistencia con reconocimiento otorgado por Detail Park.',
      },
      {
        question: '¿Trabajáis con alguna marca de PPF específica?',
        answer: 'No. Somos un centro 100% independiente y neutral. No tenemos ataduras comerciales con ninguna marca, lo que nos permite enseñarte a elegir los mejores productos del mercado según cada situación. Trabajamos con marcas líderes como XPEL, SunTek, 3M, Llumar y muchas más, siempre eligiendo lo que realmente funciona.',
      },
      {
        question: '¿Se puede financiar el curso de PPF?',
        answer: 'Sí, ofrecemos opciones de financiación flexibles para todos nuestros cursos. Contacta con nosotros para conocer las condiciones de pago fraccionado.',
      },
      {
        question: '¿Hay bolsa de empleo para instaladores de PPF?',
        answer: 'Sí, nuestros alumnos certificados acceden a la bolsa de empleo nacional. La instalación de PPF es uno de los servicios premium con mayor demanda y rentabilidad, con menos competencia que otros servicios de detailing.',
      },
      {
        question: '¿Es rentable especializarse en PPF?',
        answer: 'Muy rentable. El PPF es un servicio premium con tickets altos (entre 500€ y 5.000€ por instalación) y la demanda crece cada año. Pocos profesionales están bien formados, lo que significa menos competencia y más oportunidades.',
      },
    ],
  },
  'curso-restauracion-vehiculos': {
    id: 'curso-restauracion-vehiculos',
    slug: 'curso-restauracion-vehiculos',
    title: 'Curso Restauración Vehículos Intensivo: Clásicos, Cuero y Tapicerías',
    subtitle: 'Formación Intensiva en Restauración de Cuero, Tapicerías y Recuperación de Vehículos',
    description: 'Curso restauración de vehículos intensivo de 2 días: restauración de cuero, tapicerías, coches clásicos y dañados. Formación presencial 100% práctica con certificación oficial. Aprende restauración de tapicerías de cuero y recuperación profesional desde cero.',
    duration: '2 Días de Formación Intensiva',
    price: 449,
    originalPrice: 699,
    image: restauracionHero,
    heroAlt: 'Curso restauración vehículos intensivo - Restauración de cuero y tapicerías profesional',
    heroDescription: 'Aprende a recuperar pinturas oxidadas, restaurar cuero y tapicerías, faros opacos, interiores deteriorados y plásticos dañados con técnicas profesionales. Curso intensivo desde cero con certificación oficial.',
    comingSoon: true,
    forWho: [
      'Profesionales del detailing que quieren especializarse',
      'Talleres de chapa y pintura',
      'Aficionados a los coches clásicos',
      'Empresas de compra-venta de vehículos',
    ],
    whatYouLearn: [
      'Evaluación del estado del vehículo',
      'Restauración de pintura oxidada',
      'Pulido de faros y ópticas',
      'Recuperación de plásticos y gomas',
      'Tratamiento de interiores deteriorados',
      'Eliminación de óxido y corrosión',
    ],
    modules: [
      {
        title: 'Evaluación y Diagnóstico',
        topics: [
          'Análisis del estado general del vehículo',
          'Identificación de daños reparables',
          'Presupuesto realista de restauración',
          'Documentación fotográfica del proceso',
        ],
      },
      {
        title: 'Restauración de Pintura',
        topics: [
          'Tratamiento de pintura oxidada',
          'Eliminación de arañazos profundos',
          'Corrección de single stage',
          'Pulido de pinturas delicadas',
        ],
      },
      {
        title: 'Faros y Elementos Ópticos',
        topics: [
          'Lijado progresivo de faros',
          'Pulido y sellado de ópticas',
          'Restauración de pilotos traseros',
          'Tratamiento anti-UV duradero',
        ],
      },
      {
        title: 'Plásticos e Interior',
        topics: [
          'Restauración de plásticos exteriores',
          'Tratamiento de molduras decoloradas',
          'Limpieza profunda de interiores',
          'Acondicionamiento de cuero y vinilo',
          'Eliminación de olores persistentes',
        ],
      },
    ],
    includes: [
      'Material didáctico completo',
      'Productos especializados en restauración',
      'Vehículos de práctica reales',
      'Certificado oficial Detail Park',
      'Lista de proveedores especializados',
      'Soporte post-formación 30 días',
    ],
    faqs: [
      {
        question: '¿Trabajamos con coches clásicos reales?',
        answer: 'Sí, disponemos de vehículos clásicos para practicar técnicas de restauración.',
      },
      {
        question: '¿Puedo restaurar defectos de mi propio coche?',
        answer: 'Sí, puedes traer piezas o elementos de tu vehículo para trabajar.',
      },
      {
        question: '¿Incluye restauración de cromados?',
        answer: 'Cubrimos el pulido de cromados, pero no el recromado profesional.',
      },
      {
        question: '¿Es rentable ofrecer servicios de restauración?',
        answer: 'Muy rentable. Los márgenes son altos y la demanda está creciendo.',
      },
      {
        question: '¿Trabajáis con alguna marca específica?',
        answer: 'No. Somos un centro 100% independiente y neutral. No tenemos ataduras comerciales con ninguna marca, lo que nos permite enseñarte a elegir los mejores productos del mercado según cada situación. Trabajamos con marcas líderes como Koch Chemie, Gyeon, Sonax, Meguiar\'s, 3M y muchas más, siempre eligiendo lo que realmente funciona.',
      },
      {
        question: '¿Se puede financiar el curso de restauración?',
        answer: 'Sí, ofrecemos opciones de financiación flexibles. Contacta con nosotros para conocer las condiciones de pago fraccionado y encontrar la mejor opción para ti.',
      },
      {
        question: '¿Incluye restauración de tapicerías de cuero?',
        answer: 'Sí, el curso cubre técnicas profesionales de restauración de cuero y tapicerías: limpieza profunda, reparación de grietas, teñido y acondicionamiento. Es uno de los servicios más demandados y rentables del sector.',
      },
      {
        question: '¿Es un curso de restauración intensivo?',
        answer: 'Sí, es formación 100% intensiva con jornadas completas de práctica real. En 2 días aprendes las técnicas profesionales de restauración que necesitas para ofrecer este servicio premium a tus clientes.',
      },
    ],
  },
};

export const getFormationBySlug = (slug: string): FormationDetail | undefined => {
  return formationDetails[slug];
};
