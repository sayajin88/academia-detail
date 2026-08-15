export interface CarreraBenefit {
  icon: string;
  title: string;
  description: string;
  category: 'tecnico' | 'negocio' | 'experiencia' | 'networking' | 'soporte';
}

export interface IncludedFormation {
  name: string;
  value: number;
  duration: string;
  url?: string;
  highlights: string[];
}

export interface BusinessModule {
  category: string;
  icon: string;
  items: string[];
}

export interface WeekContent {
  week: number;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

export const carreraDetailingData = {
  title: "Carrera Detailing",
  subtitle: "Conviértete en Empresario del Detailing",
  tagline: "El programa más completo del sector: técnica + negocio + experiencia real",
  duration: "1 mes intensivo",
  price: 7997,
  // Suma real de los precios públicos de las 4 formaciones por separado
  originalValue: 9392,
  coursesTotal: 9392,
  extrasValue: 6000,
  totalValue: 15392,
  savings: 1395,
  spots: 4,
  nextEdition: "Marzo 2026",
  
  stats: {
    alumni: 50,
    successRate: 95,
    businessStarted: 42,
    avgROI: 860
  },

  includedFormations: [
    {
      name: "Detailing Profesional",
      value: 2997,
      duration: "4 días",
      url: "/curso-detailing-profesional",
      highlights: ["Pulido de pintura", "Descontaminación", "Protección cerámica"]
    },
    {
      name: "Car Wrapping Nivel 1",
      value: 1999,
      duration: "2 días",
      url: "/curso-vinilado-vehiculos",
      highlights: ["Vinilado completo", "Técnicas de corte", "Acabados profesionales"]
    },
    {
      name: "Car Wrapping Nivel 2",
      value: 1999,
      duration: "2 días",
      url: "/curso-vinilado-vehiculos",
      highlights: ["Piezas complejas", "Vinilos especiales", "Postformado avanzado"]
    },
    {
      name: "Paint Protection Film",
      value: 2397,
      duration: "2 días",
      url: "/curso-ppf-proteccion-pintura",
      highlights: ["Instalación completa", "Patrones digitales", "Certificación"]
    }
  ] as IncludedFormation[],

  businessModules: [
    {
      category: "Finanzas y Contabilidad",
      icon: "Calculator",
      items: [
        "Cómo calcular precios rentables",
        "Elaboración de presupuestos profesionales",
        "Contabilidad básica para tu negocio",
        "Gestión de impuestos y facturación",
        "Control de costes y márgenes"
      ]
    },
    {
      category: "Marketing y Ventas",
      icon: "TrendingUp",
      items: [
        "Estrategia de redes sociales efectiva",
        "Fotografía profesional de vehículos",
        "Creación de contenido que vende",
        "Publicidad online (Google, Meta)",
        "Captación y fidelización de clientes"
      ]
    },
    {
      category: "Gestión Empresarial",
      icon: "Building2",
      items: [
        "Gestión de empleados y equipos",
        "Atención al cliente premium",
        "Liderazgo y toma de decisiones",
        "Organización operativa del taller",
        "Gestión de proveedores"
      ]
    },
    {
      category: "Legal y Administrativo",
      icon: "FileText",
      items: [
        "Alta como autónomo o sociedad",
        "Trámites con gestoría",
        "Seguros y responsabilidades",
        "Contratos con clientes",
        "Normativas del sector"
      ]
    }
  ] as BusinessModule[],

  weeklyTimeline: [
    {
      week: 1,
      title: "Formación Técnica Intensiva",
      description: "Domina todas las técnicas de Detailing, desde pulido hasta protecciones cerámicas",
      highlights: ["Teoría + práctica", "Vehículos reales", "Certificación parcial"],
      icon: "GraduationCap"
    },
    {
      week: 2,
      title: "Wrapping y PPF",
      description: "Especialízate en vinilado y protección de pintura con técnicas profesionales",
      highlights: ["Patrones digitales", "Instalación completa", "Casos complejos"],
      icon: "Layers"
    },
    {
      week: 3,
      title: "Clientes Reales + Negocio",
      description: "Trabaja con clientes reales mientras aprendes gestión empresarial",
      highlights: ["Clientes del taller", "Módulo negocio", "Presupuestos reales"],
      icon: "Users"
    },
    {
      week: 4,
      title: "Dirección del Negocio",
      description: "Toma las riendas: dirigirás el taller durante días completos",
      highlights: ["Gestión total", "Toma de decisiones", "Experiencia directiva"],
      icon: "Crown"
    }
  ] as WeekContent[],

  benefits: [
    // Técnicos
    { icon: "Sparkles", title: "Pulido profesional", description: "Domina todas las técnicas de corrección de pintura", category: "tecnico" },
    { icon: "Shield", title: "Protección cerámica", description: "Aplicación de coating y sellantes de alta gama", category: "tecnico" },
    { icon: "Layers", title: "Car Wrapping completo", description: "Vinilado integral de vehículos", category: "tecnico" },
    { icon: "ShieldCheck", title: "PPF profesional", description: "Instalación de película de protección", category: "tecnico" },
    { icon: "Paintbrush", title: "Restauración integral", description: "Faros, interiores, plásticos y tapicería", category: "tecnico" },
    { icon: "Award", title: "4 Certificaciones", description: "Una por cada especialidad técnica", category: "tecnico" },
    
    // Negocio
    { icon: "Calculator", title: "Cálculo de precios", description: "Aprende a fijar precios rentables", category: "negocio" },
    { icon: "FileText", title: "Presupuestos profesionales", description: "Crea presupuestos que conviertan", category: "negocio" },
    { icon: "PiggyBank", title: "Contabilidad básica", description: "Gestiona las finanzas de tu negocio", category: "negocio" },
    { icon: "Receipt", title: "Facturación e impuestos", description: "Cumple con todas las obligaciones fiscales", category: "negocio" },
    { icon: "TrendingUp", title: "Marketing digital", description: "Estrategias de captación de clientes", category: "negocio" },
    { icon: "Camera", title: "Fotografía profesional", description: "Muestra tu trabajo de forma impactante", category: "negocio" },
    { icon: "Share2", title: "Redes sociales", description: "Construye tu marca personal", category: "negocio" },
    { icon: "Users", title: "Gestión de empleados", description: "Lidera equipos de trabajo efectivos", category: "negocio" },
    { icon: "Building2", title: "Alta de empresa", description: "Autónomo vs. sociedad: lo que necesitas", category: "negocio" },
    { icon: "Scale", title: "Aspectos legales", description: "Contratos, seguros y normativas", category: "negocio" },
    
    // Experiencia
    { icon: "Wrench", title: "1 mes en taller real", description: "Experiencia práctica intensiva", category: "experiencia" },
    { icon: "Car", title: "Clientes reales", description: "Trabaja con vehículos de clientes", category: "experiencia" },
    { icon: "Crown", title: "Dirección del negocio", description: "Dirigirás el taller varios días", category: "experiencia" },
    { icon: "Target", title: "Casos complejos", description: "Enfréntate a retos reales", category: "experiencia" },
    { icon: "Clock", title: "Gestión del día a día", description: "Vive la operativa diaria", category: "experiencia" },
    
    // Networking
    { icon: "Network", title: "Red de profesionales", description: "Conecta con otros detailers", category: "networking" },
    { icon: "Truck", title: "Proveedores directos", description: "Acceso a distribuidores preferentes", category: "networking" },
    { icon: "Briefcase", title: "Bolsa de empleo", description: "Oportunidades laborales exclusivas", category: "networking" },
    { icon: "Handshake", title: "Comunidad privada", description: "Grupo exclusivo de alumnos", category: "networking" },
    
    // Soporte
    { icon: "MessageCircle", title: "Mentoría 6 meses", description: "Seguimiento post-formación", category: "soporte" },
    { icon: "Phone", title: "Consultorías incluidas", description: "3 sesiones 1:1 con expertos", category: "soporte" },
    { icon: "HelpCircle", title: "Soporte continuo", description: "Resuelve dudas cuando surjan", category: "soporte" },
    { icon: "RefreshCcw", title: "Actualizaciones", description: "Acceso a nuevos contenidos", category: "soporte" },
    { icon: "Gift", title: "Kit de inicio", description: "Productos y herramientas incluidos", category: "soporte" }
  ] as CarreraBenefit[],

  valueBreakdown: [
    { item: "Curso Detailing Profesional (4 días)", value: 2997 },
    { item: "Curso Car Wrapping Nivel 1 (2 días)", value: 1999 },
    { item: "Curso Car Wrapping Nivel 2 (2 días)", value: 1999 },
    { item: "Curso Paint Protection Film (2 días)", value: 2397 },
    { item: "Módulo de Negocio Exclusivo", value: 2500 },
    { item: "1 Mes de Práctica en Taller Real", value: 3500 }
  ],

  extrasIncluded: [
    "Mentoría 6 meses post-formación",
    "Kit de productos premium",
    "Red de contactos y proveedores",
    "4 certificaciones oficiales"
  ],

  faqs: [
    {
      question: "¿Por qué cuesta €7.997?",
      answer: "Porque incluye las 4 formaciones técnicas completas del centro, que compradas por separado suman €9.392 (Detailing €2.997 + Car Wrapping Nivel 1 €1.999 + Car Wrapping Nivel 2 €1.999 + PPF €2.397). Al hacerlas juntas dentro de la Carrera pagas €7.997, ahorras €1.395 y además recibes sin coste el Módulo de Negocio (valor €2.500) y 1 mes de práctica real en nuestro taller (valor €3.500). El valor total del programa es de €15.392."
    },
    {
      question: "¿Qué diferencia hay con hacer los cursos por separado?",
      answer: "Ahorras €1.395 directos sobre los €9.392 que suman las 4 formaciones sueltas, y además obtienes el Módulo de Negocio (no disponible por separado), 1 mes completo en nuestro taller trabajando con clientes reales, mentoría de 6 meses y la oportunidad de dirigir el negocio. Esa experiencia inmersiva no se puede replicar con cursos individuales."
    },
    {
      question: "¿Y si no tengo experiencia previa?",
      answer: "El programa está diseñado tanto para principiantes como para profesionales que quieren emprender. Empezamos desde cero en cada área técnica y el mes intensivo te permite desarrollar habilidades rápidamente con práctica constante."
    },
    {
      question: "¿Cuántas plazas hay por edición?",
      answer: "Solo 4 plazas por edición. Esto garantiza atención personalizada, acceso a todos los vehículos y equipos, y una experiencia de inmersión real. Con más alumnos, la calidad se resentiría."
    },
    {
      question: "¿Hay facilidades de pago?",
      answer: "Sí, ofrecemos financiación hasta en 12 meses. También puedes reservar tu plaza con €997 y pagar el resto antes de comenzar. Contacta con nosotros para opciones personalizadas."
    },
    {
      question: "¿Dónde me alojo durante el mes?",
      answer: "Te ayudamos a encontrar alojamiento cerca del taller. Tenemos acuerdos con apartamentos y hostales de la zona con tarifas especiales para nuestros alumnos. El coste de alojamiento no está incluido."
    },
    {
      question: "¿Qué incluye exactamente el Módulo de Negocio?",
      answer: "Finanzas (pricing, presupuestos, contabilidad), Marketing (redes sociales, fotografía, publicidad), Gestión (empleados, clientes, operaciones), y Legal (alta de empresa, seguros, contratos). Todo lo necesario para montar y gestionar tu negocio."
    },
    {
      question: "¿Tendré acceso a proveedores?",
      answer: "Sí, te conectamos con nuestros proveedores directos con precios preferentes. Esto te ahorrará dinero desde el primer día y te garantiza productos de calidad profesional."
    },
    {
      question: "¿Hay bolsa de empleo?",
      answer: "Sí, tenemos empresas colaboradoras que buscan profesionales formados con nosotros. Aunque el objetivo es que montes tu propio negocio, muchos alumnos empiezan trabajando para ganar experiencia."
    },
    {
      question: "¿Qué certificaciones obtendré?",
      answer: "Obtendrás 4 certificaciones oficiales: Detailing Profesional, Car Wrapping, PPF Instalador, y Restauración Integral. Además, un diploma de finalización del programa Carrera Detailing con el módulo de negocio."
    }
  ]
};
