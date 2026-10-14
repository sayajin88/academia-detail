/**
 * Tiempos (en segundos de la voz en off) de cada palabra clave.
 * Hasta el segundo 33 salen de la alineación palabra a palabra de la locución;
 * a partir de ahí son estimaciones sobre la misma locución (ajustar si hace falta).
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
  // Prueba real (estimado desde 33 s)
  importante: 31.3,
  noVivimos: 32.29,
  formacion: 33.1,
  clientes: 33.9,
  clientesWord: 34.85,
  masDe: 35.65,
  proyectos: 36.35,
  detailPark: 36.95,
  demuestran: 37.65,
  // CTA
  reserva: 38.7,
  url: 39.7,
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
  prueba: [31.2, 38.6],
  cta: [38.6, 43.4],
} as const;

/** Cortes con destello y «whoosh». */
export const CUTS = [
  1.42, 2.5, 4.5, 7.7, 10.9, 14.55, 19.0, 23.15, 26.42, 29.2, 31.2, 33.85, 35.5, 38.6, 41.6,
];
