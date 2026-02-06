import detailingHero from '@/assets/formacion-detailing-juan-daniel.jpg';
import wrappingHero from '@/assets/curso-wrapping-formacion.jpg';
import ppfHero from '@/assets/curso-ppf-formacion.jpg';
import restauracionHero from '@/assets/evento-limpieza-interior.jpg';
import carreraHero from '@/assets/evento-clase-completa.jpg';

export interface Formation {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  image: string;
  imageAlt: string;
  href: string;
  icon: string;
  highlights: string[];
  comingSoon?: boolean;
  alumnosCertificados?: number;
  proximaFecha?: string;
}

export const formations: Formation[] = [
  {
    id: 'curso-detailing-profesional',
    title: 'Detailing Profesional',
    shortTitle: 'Curso de Detailing',
    description: 'Domina las técnicas de pulido, corrección y protección cerámica en un taller 100% real. Aprende a presupuestar servicios y gestionar clientes de alta gama.',
    duration: '4 días',
    image: detailingHero,
    imageAlt: 'Curso de detailing profesional - Alumnos practicando pulido de coches en taller real',
    href: '/curso-detailing-profesional',
    icon: 'sparkles',
    highlights: [
      'Corrección de pintura en vehículos reales',
      'Tratamientos cerámicos profesionales',
      'Presupuestación y gestión de clientes',
      'Visión de negocio rentable'
    ],
    alumnosCertificados: 280,
    proximaFecha: 'Febrero 2026'
  },
  {
    id: 'curso-vinilado-vehiculos',
    title: 'Car Wrapping',
    shortTitle: 'Curso de Wrapping',
    description: 'Aprende vinilado integral y cambio de color con clientes reales de alta gama. Te enseñamos técnica Y cómo captar clientes VIP para este servicio premium.',
    duration: '2 - 4 días',
    image: wrappingHero,
    imageAlt: 'Curso de car wrapping - Formación práctica en vinilado de vehículos profesional',
    href: '/curso-vinilado-vehiculos',
    icon: 'palette',
    highlights: [
      'Vinilado con vehículos de clientes',
      'Cambio de color completo',
      'Captación de clientes premium',
      'Márgenes de beneficio elevados'
    ],
    alumnosCertificados: 145,
    proximaFecha: 'Marzo 2026'
  },
  {
    id: 'curso-ppf-proteccion-pintura',
    title: 'Paint Protection Film',
    shortTitle: 'Curso de PPF',
    description: 'Especialízate en PPF para vehículos de alta gama en nuestro taller operativo. Aprende a presupuestar y escalar este servicio de alto margen.',
    duration: '2 días',
    image: ppfHero,
    imageAlt: 'Curso de PPF - Instalación de paint protection film en vehículo de alta gama',
    href: '/curso-ppf-proteccion-pintura',
    icon: 'shield',
    highlights: [
      'Instalación PPF en vehículos de clientes',
      'Corte digitalizado y manual',
      'Presupuestación de alto valor',
      'Servicio premium de alta rentabilidad'
    ],
    alumnosCertificados: 95,
    proximaFecha: 'Febrero 2026'
  },
  {
    id: 'curso-restauracion-vehiculos',
    title: 'Restauración de Vehículos',
    shortTitle: 'Curso de Restauración',
    description: 'Recupera vehículos dañados y clásicos con técnicas avanzadas. Un nicho de mercado con poca competencia y clientes dispuestos a pagar por resultados.',
    duration: '2 días',
    image: restauracionHero,
    imageAlt: 'Curso de restauración de vehículos - Limpieza y acondicionamiento interior profesional',
    href: '/curso-restauracion-vehiculos',
    icon: 'wrench',
    highlights: [
      'Restauración de pintura oxidada',
      'Recuperación de interiores',
      'Nicho con poca competencia',
      'Clientes que valoran calidad'
    ],
    comingSoon: true
  }
];

export const carreraNegocio = {
  id: 'formacion-profesional-detailing',
  title: 'Carrera Negocio',
  subtitle: 'Técnica + Negocio = Empresario Exitoso',
  description: 'El programa más completo del sector: domina todas las técnicas Y aprende a montar un negocio rentable. No saldrás siendo un técnico, saldrás siendo un empresario.',
  duration: '1 mes intensivo',
  image: carreraHero,
  imageAlt: 'Formación profesional completa en detailing - Programa Carrera Negocio para montar tu centro',
  href: '/formacion-profesional-detailing',
  includes: [
    {
      title: 'Todas las Formaciones',
      description: 'Detailing, Wrapping, PPF y Restauración'
    },
    {
      title: 'Prácticas en Taller Real',
      description: 'Trabaja con clientes reales en Detail Park'
    },
    {
      title: 'Módulo de Negocio Exclusivo',
      description: 'Márgenes, captación y escalado'
    },
    {
      title: 'Mentoría Empresarial',
      description: 'Acompañamiento 6 meses post-formación'
    },
    {
      title: 'Red de Empresarios',
      description: 'Acceso a comunidad de alumni exitosos'
    },
    {
      title: '4 Certificaciones',
      description: 'Diploma acreditado en cada especialidad'
    }
  ]
};