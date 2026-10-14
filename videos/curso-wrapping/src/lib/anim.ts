import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Segundos que se retrasa la voz en off respecto al inicio del vídeo. */
export const VO_OFFSET = 0.1;
/** Duración total del vídeo en segundos. */
export const TOTAL_SECONDS = 43.5;

export const f = (sec: number) => Math.round(sec * FPS);

export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const outBack = Easing.bezier(0.34, 1.56, 0.64, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const inExpo = Easing.bezier(0.7, 0, 0.84, 0);

export const ramp = (
  t: number,
  input: [number, number],
  output: [number, number],
  easing: (n: number) => number = outExpo,
) =>
  interpolate(t, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** 0 → 1 con rebote, empezando en `at` (segundos). */
export const popIn = (t: number, at: number, dur = 0.4) =>
  ramp(t, [at, at + dur], [0, 1], outBack);

/** 0 → 1 suave, empezando en `at`. */
export const fadeIn = (t: number, at: number, dur = 0.35) =>
  ramp(t, [at, at + dur], [0, 1]);

/** Golpe de cámara: desplazamiento pseudoaleatorio que decae tras `at`. */
export const shake = (t: number, at: number, strength = 22, dur = 0.35) => {
  const k = t - at;
  if (k < 0 || k > dur) return { x: 0, y: 0 };
  const decay = 1 - k / dur;
  const fr = Math.floor(t * FPS);
  return {
    x: Math.sin(fr * 12.9898) * strength * decay,
    y: Math.cos(fr * 78.233) * strength * decay,
  };
};

export const COLORS = {
  bg: "#0c0c0f",
  card: "#1b1b21",
  text: "#f5f3f4",
  muted: "#b9b6bb",
  accent: "#E07A88",
  burgundy: "#8B2332",
  burgundyDeep: "#5a1420",
  gold: "#E8A33D",
};

export const HEADING = "Bebas Neue";
export const BODY = "Open Sans";
