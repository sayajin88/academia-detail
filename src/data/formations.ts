import detailingHero from '@/assets/hero-detailing.jpg';
import wrappingHero from '@/assets/portfolio-lamborghini-huracan.png';
import ppfHero from '@/assets/portfolio-ferrari-458.png';
import restauracionHero from '@/assets/portfolio-porsche.png';
import carreraHero from '@/assets/professional-detailing.jpg';

export interface Formation {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  image: string;
  href: string;
  icon: string;
  highlights: string[];
}

export const formations: Formation[] = [
  {
    id: 'detailing',
    title: 'Detailing Profesional',
    shortTitle: 'Detailing',
    description: 'Aprende las técnicas profesionales de limpieza profunda, descontaminación, pulido y protección de vehículos. Desde corrección de pintura hasta tratamientos cerámicos.',
    duration: '1-2 días',
    image: detailingHero,
    href: '/formacion/detailing',
    icon: 'sparkles',
    highlights: [
      'Corrección de pintura y pulido',
      'Tratamientos cerámicos profesionales',
      'Limpieza interior profunda',
      'Descontaminación química y física'
    ]
  },
  {
    id: 'wrapping',
    title: 'Car Wrapping',
    shortTitle: 'Wrapping',
    description: 'Domina el arte del vinilado integral, cambio de color y personalización profesional de vehículos. Técnicas de instalación en superficies complejas.',
    duration: '2-3 días',
    image: wrappingHero,
    href: '/formacion/wrapping',
    icon: 'palette',
    highlights: [
      'Vinilado integral de vehículos',
      'Cambio de color completo',
      'Técnicas de corte profesional',
      'Instalación en superficies complejas'
    ]
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    shortTitle: 'PPF',
    description: 'Especialízate en la instalación de film de protección de pintura para vehículos de alta gama. Protección invisible contra impactos y rayones.',
    duration: '2-3 días',
    image: ppfHero,
    href: '/formacion/ppf',
    icon: 'shield',
    highlights: [
      'Instalación de PPF profesional',
      'Corte digitalizado y manual',
      'Protección de zonas críticas',
      'Técnicas de autorreparación'
    ]
  },
  {
    id: 'restauracion',
    title: 'Restauración de Vehículos',
    shortTitle: 'Restauración',
    description: 'Recupera vehículos dañados y clásicos con técnicas avanzadas de restauración profesional. Devuelve el esplendor original a cualquier vehículo.',
    duration: '2-3 días',
    image: restauracionHero,
    href: '/formacion/restauracion',
    icon: 'wrench',
    highlights: [
      'Restauración de pintura oxidada',
      'Recuperación de interiores',
      'Tratamiento de plásticos',
      'Técnicas de rejuvenecimiento'
    ]
  }
];

export const carreraNegocio = {
  id: 'carrera-negocio',
  title: 'Carrera Negocio',
  subtitle: 'El Programa Más Completo del Sector',
  description: 'Conviértete en un profesional completo del detailing con acceso a todas las formaciones, prácticas reales en nuestras instalaciones y formación exclusiva en gestión empresarial.',
  duration: '3-6 meses',
  image: carreraHero,
  href: '/carrera-detailing',
  includes: [
    {
      title: 'Todas las Formaciones',
      description: 'Detailing, Wrapping, PPF y Restauración'
    },
    {
      title: 'Prácticas Reales',
      description: 'Trabaja en proyectos reales en Detail Park'
    },
    {
      title: 'Gestión de Negocio',
      description: 'Aprende a montar y gestionar tu propio taller'
    },
    {
      title: 'Mentoría Personalizada',
      description: 'Acompañamiento 1:1 con profesionales'
    },
    {
      title: 'Red de Profesionales',
      description: 'Acceso a nuestra comunidad exclusiva'
    },
    {
      title: 'Certificación Completa',
      description: 'Diploma acreditado en todas las especialidades'
    }
  ]
};
