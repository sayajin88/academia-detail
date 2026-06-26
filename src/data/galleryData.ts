// Portfolio images with categories - SEO optimized alt texts
export type GalleryCategory = 'all' | 'detailing' | 'wrapping' | 'ppf' | 'restauracion';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  description?: string;
}

// Import all portfolio images
import portfolioAlfaRomeo from '@/assets/portfolio-alfa-romeo.png';
import portfolioAudiR8Yellow from '@/assets/portfolio-audi-r8-yellow.png';
import portfolioAudiR8 from '@/assets/portfolio-audi-r8.png';
import portfolioAudiRed from '@/assets/portfolio-audi-red.png';
import portfolioAudiRs3 from '@/assets/portfolio-audi-rs3.png';
import portfolioAudiRs7 from '@/assets/portfolio-audi-rs7.png';
import portfolioAudiS6 from '@/assets/portfolio-audi-s6.png';
import portfolioAudiYellow from '@/assets/portfolio-audi-yellow.png';
import portfolioAudi from '@/assets/portfolio-audi.png';
import portfolioBentley from '@/assets/portfolio-bentley-continental.png';
import portfolioBmwM2 from '@/assets/portfolio-bmw-m2.png';
import portfolioBmw from '@/assets/portfolio-bmw.png';
import portfolioCorvette from '@/assets/portfolio-corvette.png';
import portfolioFerrari458 from '@/assets/portfolio-ferrari-458.png';
import portfolioFerrariF430 from '@/assets/portfolio-ferrari-f430.png';
import portfolioFerrariGtc4 from '@/assets/portfolio-ferrari-gtc4.png';
import portfolioFerrari from '@/assets/portfolio-ferrari.png';
import portfolioHondaNsx from '@/assets/portfolio-honda-nsx.png';
import portfolioJaguarFType from '@/assets/portfolio-jaguar-f-type.png';
import portfolioLamborghiniHuracan from '@/assets/portfolio-lamborghini-huracan.png';
import portfolioLamborghiniUrus from '@/assets/portfolio-lamborghini-urus.png';
import portfolioLotusEvora from '@/assets/portfolio-lotus-evora.png';
import portfolioMclaren720s from '@/assets/portfolio-mclaren-720s-orange.png';
import portfolioMclaren from '@/assets/portfolio-mclaren.png';
import portfolioMercedes from '@/assets/portfolio-mercedes.png';
import portfolioPorscheCayenne from '@/assets/portfolio-porsche-cayenne.png';
import portfolioPorsche from '@/assets/portfolio-porsche.png';
import portfolioRangeRover from '@/assets/portfolio-range-rover-velar.png';
import portfolioToyotaSupra from '@/assets/portfolio-toyota-supra.png';

export const galleryImages: GalleryImage[] = [
  // Detailing - SEO optimized alt texts
  { 
    id: '1', 
    src: portfolioFerrari, 
    alt: 'Detailing profesional Ferrari 488 - Corrección de pintura y protección cerámica en Alicante', 
    category: 'detailing', 
    title: 'Ferrari 488', 
    description: 'Corrección de pintura y protección cerámica' 
  },
  { 
    id: '2', 
    src: portfolioLamborghiniHuracan, 
    alt: 'Pulido profesional Lamborghini Huracán - Coating cerámico de alta gama Detail Park - Academia Detail', 
    category: 'detailing', 
    title: 'Lamborghini Huracán', 
    description: 'Pulido completo y coating cerámico' 
  },
  { 
    id: '3', 
    src: portfolioMclaren, 
    alt: 'Detailing premium McLaren 720S - Protección cerámica profesional España', 
    category: 'detailing', 
    title: 'McLaren 720S', 
    description: 'Detailing premium con protección cerámica' 
  },
  { 
    id: '4', 
    src: portfolioBmw, 
    alt: 'Corrección de pintura BMW M4 - Pulido de dos pasos detailing profesional', 
    category: 'detailing', 
    title: 'BMW M4', 
    description: 'Corrección de pintura de dos pasos' 
  },
  { 
    id: '5', 
    src: portfolioMercedes, 
    alt: 'Detailing completo Mercedes AMG GT - Tratamiento interior y exterior Alicante', 
    category: 'detailing', 
    title: 'Mercedes AMG GT', 
    description: 'Tratamiento interior y exterior completo' 
  },
  { 
    id: '6', 
    src: portfolioAudi, 
    alt: 'Protección cerámica Audi RS6 - Coating cerámico 5 años garantía', 
    category: 'detailing', 
    title: 'Audi RS6', 
    description: 'Protección cerámica 5 años' 
  },
  { 
    id: '7', 
    src: portfolioPorsche, 
    alt: 'Detailing de competición Porsche 911 GT3 - Preparación para circuito', 
    category: 'detailing', 
    title: 'Porsche 911 GT3', 
    description: 'Detailing de competición' 
  },
  
  // Wrapping - SEO optimized alt texts
  { 
    id: '8', 
    src: portfolioAudiR8Yellow, 
    alt: 'Vinilado Audi R8 amarillo brillante - Curso car wrapping profesional Detail Park - Academia Detail', 
    category: 'wrapping', 
    title: 'Audi R8', 
    description: 'Vinilo amarillo brillante completo' 
  },
  { 
    id: '9', 
    src: portfolioAudiRed, 
    alt: 'Cambio de color Audi RS5 rojo metalizado - Vinilado integral profesional', 
    category: 'wrapping', 
    title: 'Audi RS5', 
    description: 'Cambio de color rojo metalizado' 
  },
  { 
    id: '10', 
    src: portfolioAudiYellow, 
    alt: 'Vinilado Audi TT RS amarillo Vegas - Instalación profesional car wrapping', 
    category: 'wrapping', 
    title: 'Audi TT RS', 
    description: 'Vinilado amarillo Vegas' 
  },
  { 
    id: '11', 
    src: portfolioCorvette, 
    alt: 'Vinilo racing Chevrolet Corvette - Diseño personalizado car wrapping España', 
    category: 'wrapping', 
    title: 'Chevrolet Corvette', 
    description: 'Vinilo racing personalizado' 
  },
  { 
    id: '12', 
    src: portfolioMclaren720s, 
    alt: 'Vinilado McLaren 720S Spider naranja Papaya Spark - Cambio de color premium', 
    category: 'wrapping', 
    title: 'McLaren 720S Spider', 
    description: 'Vinilo naranja Papaya Spark' 
  },
  { 
    id: '13', 
    src: portfolioLamborghiniUrus, 
    alt: 'Cambio de color completo Lamborghini Urus - Vinilado integral profesional Alicante', 
    category: 'wrapping', 
    title: 'Lamborghini Urus', 
    description: 'Cambio de color completo' 
  },
  { 
    id: '14', 
    src: portfolioHondaNsx, 
    alt: 'Vinilado Honda NSX gris Nardo - Instalación car wrapping certificada', 
    category: 'wrapping', 
    title: 'Honda NSX', 
    description: 'Vinilo gris Nardo' 
  },
  
  // PPF - SEO optimized alt texts
  { 
    id: '15', 
    src: portfolioFerrari458, 
    alt: 'PPF Ferrari 458 Italia XPEL Ultimate Plus - Protección pintura completa España', 
    category: 'ppf', 
    title: 'Ferrari 458 Italia', 
    description: 'PPF completo XPEL Ultimate Plus' 
  },
  { 
    id: '16', 
    src: portfolioFerrariF430, 
    alt: 'Protección PPF Ferrari F430 frontal y paragolpes - Paint Protection Film profesional', 
    category: 'ppf', 
    title: 'Ferrari F430', 
    description: 'Protección frontal y paragolpes' 
  },
  { 
    id: '17', 
    src: portfolioFerrariGtc4, 
    alt: 'PPF integral Ferrari GTC4 Lusso con coating - Protección premium alta gama', 
    category: 'ppf', 
    title: 'Ferrari GTC4 Lusso', 
    description: 'PPF integral con coating' 
  },
  { 
    id: '18', 
    src: portfolioAudiR8, 
    alt: 'Protección PPF Audi R8 V10 zonas de impacto - Paint Protection Film Alicante', 
    category: 'ppf', 
    title: 'Audi R8 V10', 
    description: 'Protección PPF zonas de impacto' 
  },
  { 
    id: '19', 
    src: portfolioAudiRs7, 
    alt: 'PPF completo mate Audi RS7 - Protección pintura acabado satinado profesional', 
    category: 'ppf', 
    title: 'Audi RS7', 
    description: 'PPF completo mate' 
  },
  { 
    id: '20', 
    src: portfolioBentley, 
    alt: 'PPF premium Bentley Continental GT - Protección completa vehículo de lujo', 
    category: 'ppf', 
    title: 'Bentley Continental GT', 
    description: 'Protección premium completa' 
  },
  { 
    id: '21', 
    src: portfolioJaguarFType, 
    alt: 'PPF Jaguar F-Type capó y aletas - Protección zonas sensibles Paint Protection Film', 
    category: 'ppf', 
    title: 'Jaguar F-Type', 
    description: 'PPF capó y aletas' 
  },
  
  // Restauración - SEO optimized alt texts
  { 
    id: '22', 
    src: portfolioAlfaRomeo, 
    alt: 'Restauración pintura clásica Alfa Romeo Giulia - Curso restauración vehículos Detail Park - Academia Detail', 
    category: 'restauracion', 
    title: 'Alfa Romeo Giulia', 
    description: 'Restauración de pintura clásica' 
  },
  { 
    id: '23', 
    src: portfolioAudiRs3, 
    alt: 'Corrección daños por granizo Audi RS3 - Restauración profesional sin pintar', 
    category: 'restauracion', 
    title: 'Audi RS3', 
    description: 'Corrección de daños por granizo' 
  },
  { 
    id: '24', 
    src: portfolioAudiS6, 
    alt: 'Restauración interior completa Audi S6 - Limpieza y acondicionamiento cuero profesional', 
    category: 'restauracion', 
    title: 'Audi S6', 
    description: 'Restauración interior completa' 
  },
  { 
    id: '25', 
    src: portfolioBmwM2, 
    alt: 'Restauración BMW M2 Competition tras accidente - Reparación pintura profesional', 
    category: 'restauracion', 
    title: 'BMW M2 Competition', 
    description: 'Restauración tras accidente' 
  },
  { 
    id: '26', 
    src: portfolioLotusEvora, 
    alt: 'Restauración completa pintura Lotus Evora - Corrección y protección profesional', 
    category: 'restauracion', 
    title: 'Lotus Evora', 
    description: 'Restauración completa de pintura' 
  },
  { 
    id: '27', 
    src: portfolioPorscheCayenne, 
    alt: 'Restauración interiores Porsche Cayenne - Limpieza profunda y acondicionamiento cuero', 
    category: 'restauracion', 
    title: 'Porsche Cayenne', 
    description: 'Restauración de interiores' 
  },
  { 
    id: '28', 
    src: portfolioRangeRover, 
    alt: 'Corrección arañazos profundos Range Rover Velar - Restauración pintura sin repintar', 
    category: 'restauracion', 
    title: 'Range Rover Velar', 
    description: 'Corrección de arañazos profundos' 
  },
  { 
    id: '29', 
    src: portfolioToyotaSupra, 
    alt: 'Restauración Toyota Supra MK5 post-circuito - Corrección y protección track day', 
    category: 'restauracion', 
    title: 'Toyota Supra MK5', 
    description: 'Restauración post-circuito' 
  },
];

export const categoryLabels: Record<GalleryCategory, string> = {
  all: 'Todos',
  detailing: 'Detailing',
  wrapping: 'Wrapping',
  ppf: 'PPF',
  restauracion: 'Restauración',
};