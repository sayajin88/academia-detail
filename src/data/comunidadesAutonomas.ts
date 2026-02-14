// Mapa estático de provincias → comunidad autónoma para España

export interface ComunidadData {
  name: string;
  slug: string;
  provincias: string[];
}

const comunidades: ComunidadData[] = [
  { name: 'Andalucía', slug: 'andalucia', provincias: ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'] },
  { name: 'Aragón', slug: 'aragon', provincias: ['Huesca', 'Teruel', 'Zaragoza'] },
  { name: 'Asturias', slug: 'asturias', provincias: ['Asturias'] },
  { name: 'Islas Baleares', slug: 'islas-baleares', provincias: ['Illes Balears', 'Baleares'] },
  { name: 'Islas Canarias', slug: 'islas-canarias', provincias: ['Las Palmas', 'Santa Cruz de Tenerife'] },
  { name: 'Cantabria', slug: 'cantabria', provincias: ['Cantabria'] },
  { name: 'Castilla y León', slug: 'castilla-y-leon', provincias: ['Ávila', 'Burgos', 'León', 'Palencia', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'] },
  { name: 'Castilla-La Mancha', slug: 'castilla-la-mancha', provincias: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'] },
  { name: 'Cataluña', slug: 'cataluna', provincias: ['Barcelona', 'Girona', 'Lleida', 'Tarragona'] },
  { name: 'Comunidad Valenciana', slug: 'comunidad-valenciana', provincias: ['Alicante', 'Castellón', 'Valencia'] },
  { name: 'Extremadura', slug: 'extremadura', provincias: ['Badajoz', 'Cáceres'] },
  { name: 'Galicia', slug: 'galicia', provincias: ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'] },
  { name: 'Comunidad de Madrid', slug: 'comunidad-de-madrid', provincias: ['Madrid'] },
  { name: 'Región de Murcia', slug: 'region-de-murcia', provincias: ['Murcia'] },
  { name: 'Navarra', slug: 'navarra', provincias: ['Navarra'] },
  { name: 'País Vasco', slug: 'pais-vasco', provincias: ['Álava', 'Guipúzcoa', 'Vizcaya'] },
  { name: 'La Rioja', slug: 'la-rioja', provincias: ['La Rioja'] },
  { name: 'Ceuta y Melilla', slug: 'ceuta-y-melilla', provincias: ['Ceuta', 'Melilla'] },
];

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getAllComunidades(): ComunidadData[] {
  return comunidades;
}

export function getComunidadBySlug(slug: string): ComunidadData | undefined {
  return comunidades.find((c) => c.slug === slug);
}

export function getComunidadByProvincia(provinceName: string): ComunidadData | undefined {
  const normalized = provinceName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return comunidades.find((c) =>
    c.provincias.some((p) => p.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized)
  );
}

export function getComunidadByName(name: string): ComunidadData | undefined {
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return comunidades.find((c) =>
    c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized
  );
}

/** Generate SEO text block for a geographic landing */
export function getSeoText(type: 'comunidad' | 'provincia' | 'ciudad', locationName: string): string {
  const texts: Record<string, string[]> = {
    comunidad: [
      `Descubre los mejores centros de detailing y protección de vehículos en ${locationName}. Nuestros profesionales certificados ofrecen servicios de pulido, tratamiento cerámico, PPF (Paint Protection Film), car wrapping e interiorismo automotriz con los más altos estándares de calidad.`,
      `Cada detailer listado ha completado formación especializada en Academia Detail, garantizando un servicio profesional con productos de primeras marcas como Gyeon, Gtechniq, STEK y Menzerna.`,
    ],
    provincia: [
      `Encuentra profesionales de detailing certificados en ${locationName}. Ya sea que busques un pulido de corrección, protección cerámica de larga duración, instalación de PPF o un lavado premium para tu vehículo, nuestros detailers en ${locationName} están preparados para ofrecer resultados excepcionales.`,
      `Todos los centros y profesionales han sido verificados y cuentan con formación acreditada por Academia Detail.`,
    ],
    ciudad: [
      `¿Buscas el mejor servicio de detailing en ${locationName}? Aquí encontrarás centros y profesionales certificados especializados en pulido profesional, protección cerámica, PPF, car wrapping y limpieza integral de vehículos.`,
      `Cada profesional ha sido formado y certificado por Academia Detail, asegurando técnicas avanzadas y productos premium para el cuidado de tu coche.`,
    ],
  };
  return texts[type]?.join(' ') ?? '';
}
