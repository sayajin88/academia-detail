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
}

export const formationDetails: Record<string, FormationDetail> = {
  detailing: {
    id: 'detailing',
    slug: 'detailing',
    title: 'Curso Detailing Profesional: Aprende desde Cero',
    subtitle: 'Formación Práctica en Pulido, Corrección y Protección Cerámica',
    description: 'Curso de detailing profesional 100% práctico. Aprende detailing desde cero: lavado, descontaminación, pulido y protección cerámica. Formación con certificado oficial basada en experiencia real en taller.',
    duration: '1-5 días según nivel',
    price: 399,
    originalPrice: 599,
    image: detailingHero,
    heroDescription: 'Formación 100% práctica donde aprenderás desde la preparación del vehículo hasta las técnicas más avanzadas de corrección de pintura y protección cerámica. Basado en experiencia real de trabajo en nuestro taller.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
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
    certificationTitle: 'Certificación y Bolsa de Empleo',
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
      'Pulido de corrección en múltiples pasos',
      'Aplicación de ceras, sellantes y cerámicos',
      'Tratamiento de interiores profesional',
      'Preparación para el mundo laboral',
    ],
    modules: [
      {
        title: 'Fundamentos del Detailing',
        topics: [
          'Introducción al detailing profesional',
          'Tipos de pintura y acabados',
          'Herramientas y productos esenciales',
          'Seguridad y ergonomía en el trabajo',
        ],
      },
      {
        title: 'Lavado y Descontaminación',
        topics: [
          'Método de lavado seguro (2 cubos)',
          'Descontaminación química',
          'Descontaminación mecánica (clay bar)',
          'Limpieza de llantas y neumáticos',
        ],
      },
      {
        title: 'Corrección de Pintura',
        topics: [
          'Medición de espesores de pintura',
          'Selección de pads y compounds',
          'Técnicas de pulido rotativo',
          'Técnicas de pulido orbital',
          'Corrección en múltiples pasos',
        ],
      },
      {
        title: 'Protección y Acabado',
        topics: [
          'Preparación para protección',
          'Aplicación de ceras naturales',
          'Aplicación de sellantes sintéticos',
          'Introducción a recubrimientos cerámicos',
          'Acabado de cristales y plásticos',
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
    ],
  },
  wrapping: {
    id: 'wrapping',
    slug: 'wrapping',
    title: 'Curso Car Wrapping: Instalación de Vinilo Profesional',
    subtitle: 'Formación en Rotulación y Cambio de Color de Vehículos',
    description: 'Curso de car wrapping profesional. Aprende instalación de vinilo, rotulación vehículos y cambio de color. Formación 100% práctica con certificado oficial.',
    duration: '1-5 días según nivel',
    price: 599,
    originalPrice: 899,
    image: wrappingHero,
    heroDescription: 'Formación 100% práctica en instalación de vinilo para cambio de color. Aprende con experiencia real en taller, desde las técnicas básicas hasta los acabados más complejos en superficies curvas.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
    ],
    levels: [
      {
        title: 'Para Aficionados',
        subtitle: 'Iniciación al mundo del vinilado',
        duration: '1-2 días',
        features: [
          'Conocimiento del producto y herramientas',
          'Técnica y aplicación de la teoría',
          'Cursos adaptados entre semana o fines de semana',
          'Material de práctica incluido',
        ],
      },
      {
        title: 'Para Profesionales',
        subtitle: 'Nivel avanzado para el sector',
        duration: '3-5 días',
        features: [
          'Conocimientos prácticos y teóricos completos',
          'Nivel profesional para dar calidad al cliente',
          'Formación avanzada en técnicas complejas',
          'Trabajo en superficies difíciles',
        ],
        highlighted: true,
      },
      {
        title: 'Monta tu Negocio',
        subtitle: 'Emprende en el sector',
        features: [
          'Modelo de franquicia basado en experiencia real',
          'Información para montar tu centro de detailing',
          'Acceso al dossier de franquicia',
          'Asesoramiento empresarial incluido',
        ],
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
    ],
  },
  ppf: {
    id: 'ppf',
    slug: 'ppf',
    title: 'Curso PPF: Paint Protection Film Certificado',
    subtitle: 'Formación en Instalación de Lámina Protectora para Vehículos',
    description: 'Curso de PPF (Paint Protection Film) profesional. Aprende instalación de lámina protectora en vehículos de alta gama. Formación 100% práctica con certificación oficial.',
    duration: '1-5 días según nivel',
    price: 799,
    originalPrice: 1199,
    image: ppfHero,
    heroDescription: 'Formación 100% práctica en instalación de Paint Protection Film. Aprende con experiencia real en taller, desde las técnicas básicas hasta las instalaciones más complejas en superficies curvas.',
    advantages: [
      { icon: 'Award', title: 'Certificado de reconocimiento del sector' },
      { icon: 'HeadphonesIcon', title: 'Asistencia posterior personalizada' },
      { icon: 'UserCheck', title: 'Cursos adaptados y 100% personalizados' },
      { icon: 'Building', title: 'Cursos con experiencia real en taller' },
      { icon: 'Briefcase', title: 'Posibilidad de entrar en bolsa de empleo' },
    ],
    levels: [
      {
        title: 'Para Aficionados',
        subtitle: 'Iniciación al mundo del PPF',
        duration: '1-2 días',
        features: [
          'Conocimiento del producto y herramientas',
          'Técnica y aplicación de la teoría',
          'Cursos adaptados entre semana o fines de semana',
          'Material de práctica incluido',
        ],
      },
      {
        title: 'Para Profesionales',
        subtitle: 'Nivel avanzado para el sector',
        duration: '3-5 días',
        features: [
          'Conocimientos prácticos y teóricos completos',
          'Nivel profesional para dar calidad al cliente',
          'Formación avanzada en técnicas complejas',
          'Trabajo en superficies difíciles',
        ],
        highlighted: true,
      },
      {
        title: 'Monta tu Negocio',
        subtitle: 'Emprende en el sector',
        features: [
          'Modelo de franquicia basado en experiencia real',
          'Información para montar tu centro de PPF',
          'Acceso al dossier de franquicia',
          'Asesoramiento empresarial incluido',
        ],
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
    ],
  },
  restauracion: {
    id: 'restauracion',
    slug: 'restauracion',
    title: 'Curso Restauración Vehículos: Clásicos y Dañados',
    subtitle: 'Formación en Chapa, Pintura y Recuperación de Vehículos',
    description: 'Curso de restauración de vehículos profesional. Aprende a restaurar coches clásicos y dañados. Técnicas de chapa, pintura y acabado con certificado oficial.',
    duration: '2 días intensivos',
    price: 449,
    originalPrice: 699,
    image: restauracionHero,
    heroDescription: 'Aprende a recuperar pinturas oxidadas, faros opacos, interiores deteriorados y plásticos dañados con técnicas profesionales.',
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
    ],
  },
};

export const getFormationBySlug = (slug: string): FormationDetail | undefined => {
  return formationDetails[slug];
};
