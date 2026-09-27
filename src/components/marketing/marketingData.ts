import {
  Globe,
  Search,
  Bot,
  Instagram,
  MapPin,
  PenTool,
  type LucideIcon,
} from "lucide-react";

/** Cómo llega un cliente al taller (diagrama del embudo, en HTML). */
export interface FunnelStep {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}

export const funnelSteps: FunnelStep[] = [
  {
    eyebrow: "Te encuentran",
    title: "Google y redes",
    description: "Búsquedas locales, ficha de empresa y contenido en Instagram y TikTok.",
    items: ["«detailing cerca de mí»", "Reel de antes y después"],
  },
  {
    eyebrow: "Te conocen",
    title: "Tu web",
    description: "Servicios con precio orientativo, trabajos reales y reseñas.",
    items: ["Packs de PPF y cerámico", "Galería de trabajos"],
  },
  {
    eyebrow: "Te escriben",
    title: "Presupuesto",
    description: "Formulario o WhatsApp en un clic, desde el móvil.",
    items: ["Mensaje por WhatsApp", "Solicitud con fotos"],
  },
  {
    eyebrow: "No se enfrían",
    title: "Seguimiento",
    description: "Respuesta rápida y recordatorios hasta que reservan.",
    items: ["Email de confirmación", "Recordatorio a los 3 días"],
  },
];

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}

export const services: ServiceItem[] = [
  {
    icon: Globe,
    title: "Diseño y desarrollo web",
    tag: "Conversión",
    description:
      "Webs rápidas, claras y pensadas para que el visitante acabe escribiéndote por WhatsApp. Nada de plantillas genéricas.",
  },
  {
    icon: Search,
    title: "SEO en Google",
    tag: "Visibilidad",
    description:
      "Estructura, contenido y palabras clave locales para aparecer cuando alguien busca tu servicio en tu ciudad.",
  },
  {
    icon: Bot,
    title: "GEO · buscadores de IA",
    tag: "Nuevo canal",
    description:
      "Optimización para que ChatGPT, Gemini o Perplexity entiendan tu negocio y te recomienden cuando alguien pregunta por un detailer.",
  },
  {
    icon: Instagram,
    title: "Redes sociales",
    tag: "Marca",
    description:
      "Puesta en marcha y dirección visual de Instagram, TikTok y YouTube: qué grabar, cómo publicarlo y cómo convertirlo en clientes.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    tag: "Local",
    description:
      "Tu ficha de Google Maps configurada, con fotos, servicios y estrategia de reseñas para dominar tu zona.",
  },
  {
    icon: PenTool,
    title: "Identidad de marca",
    tag: "Diseño",
    description:
      "Logotipo, colores, tipografías, rotulación del taller y plantillas para redes. Una imagen coherente en todos los puntos de contacto.",
  },
];

export interface Pack {
  /** Ancla `#pack-<id>` (la usa el marcado Offer de seoConfig) */
  id: string;
  name: string;
  subtitle: string;
  /** Euros, sin IVA, pago único */
  price: number;
  /** Etiqueta neutra para orientar la elección */
  label: string;
  featured?: boolean;
  features: string[];
}

export const packs: Pack[] = [
  {
    id: "landing",
    name: "Página web de arranque",
    subtitle: "Landing page de una sola página",
    price: 199,
    label: "Para empezar",
    features: [
      "Landing page profesional de una sola página",
      "Diseño a medida con tu identidad visual",
      "Optimizada para móvil y carga rápida",
      "Botón de WhatsApp y formulario de contacto",
      "Galería de trabajos antes / después",
      "Alta en Google y configuración básica",
    ],
  },
  {
    id: "profesional",
    name: "Página web profesional",
    subtitle: "Web multi-sección para negocios en crecimiento",
    price: 889,
    label: "La más completa",
    featured: true,
    features: [
      "Web completa con múltiples secciones y servicios",
      "Páginas de servicio independientes (detailing, PPF, wrapping…)",
      "Galería avanzada y sección de reseñas",
      "Blog preparado para posicionar contenido",
      "Estructura técnica SEO lista desde el día 1",
      "Textos orientados a conversión",
      "Formularios, WhatsApp y medición de contactos",
    ],
  },
  {
    id: "seo-geo",
    name: "SEO + posicionamiento en buscadores de IA",
    subtitle: "Para que te encuentren en Google y en la IA",
    price: 99,
    label: "Para tu web actual",
    features: [
      "Auditoría SEO completa de tu web actual",
      "Optimización de títulos, descripciones y estructura",
      "SEO local: tu ciudad y tu zona de influencia",
      "Datos estructurados para Google y buscadores de IA",
      "Optimización GEO para ChatGPT, Gemini y Perplexity",
      "Informe con acciones y siguientes pasos",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Llamada inicial",
    description:
      "Hablamos por WhatsApp de tu negocio, tus servicios y a qué tipo de cliente quieres llegar.",
  },
  {
    step: "02",
    title: "Propuesta clara",
    description:
      "Te enviamos qué se hace, qué entregamos y en cuánto tiempo. Sin letra pequeña ni sorpresas.",
  },
  {
    step: "03",
    title: "Producción",
    description:
      "Diseño, desarrollo y contenidos. Vas viendo avances y ajustamos contigo antes de publicar.",
  },
  {
    step: "04",
    title: "Lanzamiento y medición",
    description:
      "Publicamos, conectamos Google y medimos los contactos reales que entran cada mes.",
  },
];

export const marketingFaqs = [
  {
    question: "¿Esto es un servicio de Academia Detail?",
    answer:
      "Es un servicio complementario que ofrecemos junto a nuestro estudio digital de confianza, pensado específicamente para alumnos y centros de detailing. Nosotros te formamos en la técnica y en el negocio; ellos se encargan de que tu presencia digital esté a la altura.",
  },
  {
    question: "¿Necesito tener ya un negocio montado?",
    answer:
      "No. De hecho, muchos empiezan justo al terminar la formación. Si estás arrancando, la Página web de arranque es el punto de partida ideal: presencia profesional desde el primer día sin una inversión alta.",
  },
  {
    question: "¿Qué es el posicionamiento en buscadores de IA (GEO)?",
    answer:
      "Cada vez más personas preguntan a ChatGPT, Gemini o Perplexity por servicios locales. El GEO consiste en estructurar la información de tu negocio (datos, servicios, ubicación, contenido) para que esos sistemas puedan entenderte y recomendarte.",
  },
  {
    question: "¿Los precios incluyen IVA?",
    answer:
      "No. Todos los precios indicados son sin IVA. Al contactar recibirás el presupuesto con el desglose correspondiente.",
  },
  {
    question: "¿También hacéis logotipo e imagen de empresa?",
    answer:
      "Sí. Diseño de logotipo, identidad visual completa, rotulación de local y vehículo y plantillas para redes. El precio depende del alcance, así que se presupuesta tras una breve conversación por WhatsApp.",
  },
  {
    question: "¿Cuánto tarda en estar lista mi web?",
    answer:
      "Una landing de arranque suele estar publicada en pocos días una vez tenemos tus contenidos y fotos. Una web profesional multi-sección requiere más trabajo de estructura y textos; el plazo exacto se define en la propuesta.",
  },
  {
    question: "¿Cuánto cuesta una página web para un centro de detailing?",
    answer:
      "En nuestro caso, una landing page profesional de una sola página cuesta 199€ sin IVA y una web multi-sección completa 889€ sin IVA, ambas en pago único. El servicio de SEO + GEO para posicionar esa web cuesta 99€ sin IVA. No hay cuotas de mantenimiento obligatorias ni permanencia.",
  },
  {
    question: "¿Cómo consigo más clientes para mi negocio de detailing?",
    answer:
      "El camino que mejor funciona en detailing es: una web propia que muestre trabajos reales, la ficha de Google Business Profile bien trabajada con reseñas, contenido de proceso y antes/después en redes, y SEO local para aparecer cuando alguien busca tu servicio en tu ciudad. Todo termina en un botón de WhatsApp fácil de encontrar.",
  },
  {
    question: "¿Cómo hago que mi taller de detailing aparezca en Google?",
    answer:
      "Hacen falta tres cosas: una ficha de Google Business Profile verificada y completa, una web con estructura técnica correcta (títulos, descripciones, datos estructurados y velocidad) y contenido que hable de tus servicios y de tu ciudad. Con eso empiezas a aparecer en el mapa y en los resultados de búsqueda locales.",
  },
  {
    question: "¿Se puede aparecer en ChatGPT o Perplexity como negocio local?",
    answer:
      "Sí. Los buscadores de IA leen la información estructurada de tu web, tu ficha de Google y las menciones en directorios. Si tus datos (servicios, precios, ubicación, horarios) están publicados de forma clara y marcada con datos estructurados, esos sistemas pueden entenderte y recomendarte. Eso es lo que trabajamos en el pack de SEO + GEO.",
  },
  {
    question: "¿Trabajáis con centros de detailing de toda España?",
    answer:
      "Sí. El trabajo se hace en remoto y coordinado por WhatsApp, así que atendemos centros de cualquier punto de España. Estamos en Alicante, por lo que en la Comunidad Valenciana y alrededores también podemos hacer sesiones de contenido presenciales en tu taller.",
  },
];
