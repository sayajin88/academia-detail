import {
  Globe,
  Search,
  Bot,
  Instagram,
  MapPin,
  PenTool,
  Eye,
  Smartphone,
  Star,
  Timer,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP_NUMBER = "34622773555";

/** Builds a WhatsApp deep link with a pre-filled message */
export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export interface ValueArgument {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const valueArguments: ValueArgument[] = [
  {
    icon: Eye,
    title: "Se compra por los ojos",
    description:
      "En detailing vendes un resultado visual. Si tus fotos, tu web y tu marca no están a la altura de tu trabajo, el cliente asume que tu acabado tampoco lo estará.",
  },
  {
    icon: Timer,
    title: "Te juzgan en segundos",
    description:
      "El cliente decide si te escribe o sigue buscando en el primer vistazo. Una presencia digital ordenada transmite precio alto y profesionalidad antes de hablar contigo.",
  },
  {
    icon: Smartphone,
    title: "Todo pasa en el móvil",
    description:
      "Tu cliente te busca desde el móvil, mira fotos, mira reseñas y escribe por WhatsApp. Si ese camino tiene fricción, pierdes el trabajo sin enterarte.",
  },
  {
    icon: Star,
    title: "Si no apareces, no existes",
    description:
      "Google, Google Maps y ahora también ChatGPT o Gemini recomiendan negocios. Sin web ni contenido posicionado, simplemente no estás en esa conversación.",
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
  id: string;
  name: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}

export const webPacks: Pack[] = [
  {
    id: "landing",
    name: "Página web de arranque",
    subtitle: "Landing page de una sola página",
    price: "199€",
    oldPrice: "299€",
    badge: "Para empezar",
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
    name: "Página web Profesional",
    subtitle: "Web multi-sección para negocios en crecimiento",
    price: "889€",
    oldPrice: "1299€",
    badge: "Más completo",
    popular: true,
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
];

export const growthPacks: Pack[] = [
  {
    id: "seo-geo",
    name: "SEO + Posicionamiento en buscadores de IA",
    subtitle: "Para que te encuentren en Google y en la IA",
    price: "99€",
    oldPrice: "279€",
    badge: "Potencia tu web",
    popular: true,
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
];
