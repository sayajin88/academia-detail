import detailingHero from '@/assets/hero-detailing.jpg';
import wrappingHero from '@/assets/portfolio-lamborghini-huracan.png';
import ppfHero from '@/assets/portfolio-ferrari-458.png';
import restauracionHero from '@/assets/portfolio-porsche.png';

export interface FormationModule {
  title: string;
  topics: string[];
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
}

export const formationDetails: Record<string, FormationDetail> = {
  detailing: {
    id: 'detailing',
    slug: 'detailing',
    title: 'Formación en Detailing',
    subtitle: 'Domina el arte de la limpieza y protección profesional',
    description: 'Aprende las técnicas profesionales de limpieza profunda, descontaminación, pulido y protección de vehículos de alta gama.',
    duration: '2 días intensivos',
    price: 399,
    originalPrice: 599,
    image: detailingHero,
    heroDescription: 'Formación práctica donde aprenderás desde la preparación del vehículo hasta las técnicas más avanzadas de corrección de pintura y protección cerámica.',
    forWho: [
      'Entusiastas del detailing que quieren profesionalizarse',
      'Propietarios de lavaderos que quieren ampliar servicios',
      'Mecánicos que desean diversificar su negocio',
      'Emprendedores del sector automotriz',
    ],
    whatYouLearn: [
      'Identificar tipos de pintura y defectos',
      'Técnicas de lavado seguro y descontaminación',
      'Pulido de corrección en múltiples pasos',
      'Aplicación de ceras, sellantes y cerámicos',
      'Tratamiento de interiores profesional',
      'Gestión de clientes y presupuestos',
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
      'Material didáctico completo',
      'Productos y herramientas durante la formación',
      'Certificado oficial Detail Park',
      'Acceso a comunidad privada',
      'Descuentos en productos profesionales',
      'Soporte post-formación 30 días',
    ],
    faqs: [
      {
        question: '¿Necesito traer mi propio coche?',
        answer: 'No, trabajaremos con vehículos que proporcionamos nosotros para la práctica.',
      },
      {
        question: '¿Qué nivel de experiencia necesito?',
        answer: 'Ninguno. La formación está diseñada para empezar desde cero.',
      },
      {
        question: '¿Hay parking disponible?',
        answer: 'Sí, disponemos de parking gratuito para todos los alumnos.',
      },
      {
        question: '¿Incluye comida?',
        answer: 'Incluimos café y snacks. Hay restaurantes cerca para el almuerzo.',
      },
    ],
  },
  wrapping: {
    id: 'wrapping',
    slug: 'wrapping',
    title: 'Formación en Car Wrapping',
    subtitle: 'El arte del vinilado profesional de vehículos',
    description: 'Domina el arte del vinilado integral, cambio de color y personalización profesional de vehículos.',
    duration: '3 días intensivos',
    price: 599,
    originalPrice: 899,
    image: wrappingHero,
    heroDescription: 'Formación completa en instalación de vinilo para cambio de color, desde las técnicas básicas hasta los acabados más complejos en superficies curvas.',
    forWho: [
      'Profesionales del detailing que quieren ampliar servicios',
      'Rotulistas que quieren especializarse en vehículos',
      'Emprendedores del sector automotriz',
      'Talleres de personalización de coches',
    ],
    whatYouLearn: [
      'Tipos de vinilos y sus aplicaciones',
      'Preparación de superficies para vinilado',
      'Técnicas de instalación sin burbujas',
      'Trabajo en curvas y zonas complejas',
      'Recorte y acabado profesional',
      'Mantenimiento y cuidado del vinilo',
    ],
    modules: [
      {
        title: 'Introducción al Wrapping',
        topics: [
          'Historia y evolución del car wrapping',
          'Tipos de vinilos: mate, brillo, satinado, texturizados',
          'Herramientas profesionales',
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
      'Material didáctico completo',
      'Vinilo de práctica ilimitado',
      'Herramientas profesionales durante el curso',
      'Certificado oficial Detail Park',
      'Acceso a proveedores con descuento',
      'Soporte post-formación 60 días',
    ],
    faqs: [
      {
        question: '¿Cuánto vinilo utilizaremos en prácticas?',
        answer: 'Proporcionamos vinilo ilimitado para que practiques sin preocupaciones.',
      },
      {
        question: '¿Puedo traer mi propio coche para practicar?',
        answer: 'Sí, el último día puedes traer tu vehículo para aplicar lo aprendido.',
      },
      {
        question: '¿Qué marcas de vinilo utilizáis?',
        answer: 'Trabajamos con 3M, Avery Dennison y Hexis, las marcas líderes del sector.',
      },
      {
        question: '¿Es difícil aprender wrapping?',
        answer: 'Requiere práctica, pero con nuestra metodología lo dominarás en poco tiempo.',
      },
    ],
  },
  ppf: {
    id: 'ppf',
    slug: 'ppf',
    title: 'Formación en Paint Protection Film',
    subtitle: 'Protección invisible para vehículos de alta gama',
    description: 'Especialízate en la instalación de film de protección de pintura para vehículos de alta gama.',
    duration: '3 días intensivos',
    price: 799,
    originalPrice: 1199,
    image: ppfHero,
    heroDescription: 'Domina la técnica de instalación de PPF, el sistema de protección más demandado para vehículos premium y de colección.',
    forWho: [
      'Profesionales del detailing con experiencia',
      'Instaladores de wrapping que quieren especializarse',
      'Talleres que trabajan con coches de lujo',
      'Concesionarios de vehículos premium',
    ],
    whatYouLearn: [
      'Tipos de PPF y sus características',
      'Corte por plotter y patrones digitales',
      'Instalación en zonas de alto impacto',
      'Técnicas de estiramiento sin distorsión',
      'Full front y protección completa',
      'Mantenimiento y reparación de PPF',
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
      'Material didáctico especializado',
      'PPF de práctica de primeras marcas',
      'Acceso a software de corte',
      'Certificado oficial Detail Park',
      'Contacto directo con distribuidores',
      'Soporte post-formación 90 días',
    ],
    faqs: [
      {
        question: '¿Necesito experiencia previa en wrapping?',
        answer: 'Recomendamos experiencia básica en manejo de films, pero no es obligatorio.',
      },
      {
        question: '¿El PPF es más difícil que el wrapping?',
        answer: 'Requiere más precisión por ser transparente, pero con práctica se domina.',
      },
      {
        question: '¿Qué inversión necesito para empezar?',
        answer: 'Te asesoramos sobre el equipamiento mínimo necesario según tu presupuesto.',
      },
      {
        question: '¿Tendré acceso a patrones de corte?',
        answer: 'Sí, te orientamos sobre las mejores plataformas de patrones digitales.',
      },
    ],
  },
  restauracion: {
    id: 'restauracion',
    slug: 'restauracion',
    title: 'Formación en Restauración',
    subtitle: 'Devuelve la vida a vehículos clásicos y dañados',
    description: 'Recupera vehículos dañados y clásicos con técnicas avanzadas de restauración profesional.',
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
