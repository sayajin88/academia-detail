import detailingHero from '@/assets/hero-detailing.jpg';
import wrappingHero from '@/assets/portfolio-lamborghini-huracan.png';
import ppfHero from '@/assets/portfolio-ferrari-458.png';
import restauracionHero from '@/assets/portfolio-porsche.png';
import carreraHero from '@/assets/professional-detailing.jpg';

export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  href: string;
}

export const formations: Formation[] = [
  {
    id: 'detailing',
    title: 'Detailing',
    description: 'Aprende las técnicas profesionales de limpieza profunda, descontaminación, pulido y protección de vehículos.',
    duration: '1-2 días',
    image: detailingHero,
    href: '/formacion/detailing'
  },
  {
    id: 'wrapping',
    title: 'Car Wrapping',
    description: 'Domina el arte del vinilado integral, cambio de color y personalización profesional de vehículos.',
    duration: '2-3 días',
    image: wrappingHero,
    href: '/formacion/wrapping'
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    description: 'Especialízate en la instalación de film de protección de pintura para vehículos de alta gama.',
    duration: '2-3 días',
    image: ppfHero,
    href: '/formacion/ppf'
  },
  {
    id: 'restauracion',
    title: 'Restauración',
    description: 'Recupera vehículos dañados y clásicos con técnicas avanzadas de restauración profesional.',
    duration: '2-3 días',
    image: restauracionHero,
    href: '/formacion/restauracion'
  }
];

export const carreraNegocio = {
  id: 'carrera-negocio',
  title: 'Carrera Negocio',
  subtitle: 'El Programa Más Completo del Sector',
  description: 'Conviértete en un profesional completo del detailing con acceso a todas las formaciones, prácticas reales en nuestras instalaciones y formación exclusiva en gestión empresarial.',
  duration: '3-6 meses',
  image: carreraHero,
  href: '/carrera-negocio',
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
