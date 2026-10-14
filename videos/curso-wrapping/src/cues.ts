/**
 * Tiempos (en segundos de la voz en off) de cada palabra clave.
 * Salen de la alineación palabra a palabra de la locución (public/audio/vo.mp3).
 */
export const CUE = {
  // Hook
  esto: 0.27,
  no: 0.37,
  es: 0.53,
  pintura: 0.69,
  esVinilo: 1.44,
  vinilo: 1.66,
  puedeSer: 2.5,
  tuNueva: 3.2,
  profesion: 3.74,
  // Sector
  carWrapping: 4.6,
  sector: 5.28,
  auge: 6.04,
  crecer: 7.16,
  trabajar: 8.45,
  cualquier: 9.25,
  mundo: 10.0,
  // Niveles
  academia: 11.0,
  dosNiveles: 12.22,
  dosDias: 13.24,
  // Principiante
  principiante: 14.56,
  tiposVinilo: 15.27,
  corte: 16.29,
  instalacion: 17.66,
  // Avanzado
  avanzado: 19.01,
  cromados: 19.68,
  interiores: 20.45,
  tecnicas: 21.82,
  // Precio
  cadaNivel: 23.2,
  precioStart: 23.93,
  precioEnd: 25.28,
  iva: 25.96,
  // Incluye
  material: 26.54,
  comida: 27.36,
  certificado: 27.73,
  maximo: 29.34,
  tres: 29.74,
  alumnos: 30.05,
  // Prueba real
  importante: 31.36,
  noVivimos: 32.36,
  formacion: 33.1,
  clientes: 33.84,
  clientesWord: 34.76,
  masDe: 35.76,
  proyectos: 36.46,
  detailPark: 37.2,
  demuestran: 38.04,
  // CTA
  reserva: 38.72,
  url: 39.84,
  voEnd: 41.6,
} as const;

/** Inicio/fin de cada escena (segundos de la voz en off). */
export const SCENES = {
  hook: [0, 4.5],
  sector: [4.5, 10.9],
  niveles: [10.9, 14.55],
  principiante: [14.55, 19.0],
  avanzado: [19.0, 23.15],
  precio: [23.15, 26.42],
  incluye: [26.42, 31.2],
  prueba: [31.2, 38.65],
  cta: [38.65, 43.4],
} as const;

/** Cortes con destello y «whoosh». */
export const CUTS = [
  1.42, 2.5, 4.5, 7.7, 10.9, 14.55, 19.0, 23.15, 26.42, 29.2, 31.2, 33.84, 35.7, 38.65, 41.6,
];
