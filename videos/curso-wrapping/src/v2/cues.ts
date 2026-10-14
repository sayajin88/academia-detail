/**
 * Versión 2 (voz femenina, ~58 s).
 * Tiempos en segundos de la locución public/audio/vo-v2.mp3 (alineación palabra a palabra).
 */
export const VO2_OFFSET = 0.15;
export const TOTAL2 = 58.8;

export const C = {
  // Hook (dolor)
  otro: 0.05,
  lunes: 0.36,
  trabajo: 0.94,
  noTeLlena: 1.52,
  llena: 1.82,
  ninguna: 3.28,
  parte: 3.48,
  // Giro
  hay: 4.54,
  oficio: 4.88,
  cambiarlo: 5.6,
  todo: 6.1,
  // Sector
  carWrapping: 7.02,
  crecer: 8.26,
  ejercerlo: 9.38,
  cualquier: 10.22,
  mundo: 11.16,
  // Curso
  academia: 12.22,
  dosNiveles: 13.68,
  dosDias: 14.4,
  taller: 15.34,
  real: 15.7,
  // Nivel 1
  n1: 16.82,
  principiante: 17.06,
  tipos: 18.18,
  preparacion: 19.86,
  corte: 21.34,
  tensado: 22.74,
  presupuestar: 24.16,
  // Nivel 2
  n2: 26.26,
  avanzado: 26.7,
  cromados: 27.64,
  retrovisores: 28.34,
  interiores: 29.92,
  sellado: 31.18,
  // Precio
  cadaNivel: 33.6,
  precioStart: 34.1,
  precioEnd: 35.28,
  iva: 35.94,
  siHaces: 37.02,
  losDos: 37.84,
  veinte: 38.78,
  descuento: 39.64,
  // Incluye
  material: 40.46,
  comida: 41.26,
  certificado: 41.68,
  maximo: 43.2,
  tres: 43.56,
  alumnos: 43.88,
  // Prueba
  noVivimos: 45.56,
  formacion: 46.3,
  vivimos: 47.18,
  clientes: 47.86,
  masDe: 48.98,
  proyectos: 49.54,
  demuestran: 50.24,
  // CTA
  plazas: 51.2,
  limitadas: 51.8,
  reserva: 52.58,
  url: 53.58,
  voEnd: 54.98,
} as const;

export const S2 = {
  hook: [0, 4.5],
  oficio: [4.5, 6.95],
  sector: [6.95, 12.0],
  curso: [12.0, 16.7],
  nivel1: [16.7, 26.15],
  nivel2: [26.15, 33.45],
  precio: [33.45, 40.35],
  incluye: [40.35, 45.25],
  prueba: [45.25, 50.75],
  cta: [50.75, TOTAL2 - VO2_OFFSET],
} as const;

export const CUTS2 = [
  2.18, 4.5, 6.95, 9.3, 12.0, 15.1, 16.7, 26.15, 33.45, 36.9, 40.35, 43.1, 45.25, 47.1, 48.9, 50.75, 52.45, 55.2,
];
