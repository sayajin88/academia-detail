import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, HEADING, inOut, outBack, outExpo, ramp } from "../lib/anim";
import { useTime } from "../lib/components";

const W = 1080;
const H = 1920;

/* ------------------------------------------------------------------ */
/* Transición «vinilo que se despega»: la capa de arriba se pela en     */
/* diagonal desde la esquina inferior derecha y deja ver la escena.    */
/* ------------------------------------------------------------------ */

type Pt = [number, number];

/** Polígono del rectángulo de pantalla con x + y > d (zona ya despegada). */
const beyond = (d: number): Pt[] => {
  const corners: Pt[] = [
    [0, 0],
    [W, 0],
    [W, H],
    [0, H],
  ];
  const out: Pt[] = [];
  for (let i = 0; i < 4; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % 4];
    const fa = a[0] + a[1] - d;
    const fb = b[0] + b[1] - d;
    if (fa > 0) out.push(a);
    if (fa > 0 !== fb > 0) {
      const t = fa / (fa - fb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
};

const beneath = (d: number): Pt[] => {
  const corners: Pt[] = [
    [0, 0],
    [W, 0],
    [W, H],
    [0, H],
  ];
  const out: Pt[] = [];
  for (let i = 0; i < 4; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % 4];
    const fa = d - (a[0] + a[1]);
    const fb = d - (b[0] + b[1]);
    if (fa > 0) out.push(a);
    if (fa > 0 !== fb > 0) {
      const t = fa / (fa - fb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
};

const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

export const VinylPeel: React.FC<{
  at: number;
  dur?: number;
  /** Imagen de la capa que se despega (la escena anterior congelada). */
  coverSrc?: string;
  coverFilter?: string;
}> = ({ at, dur = 0.8, coverSrc, coverFilter = "grayscale(1) brightness(0.45)" }) => {
  const t = useTime();
  if (t < at - 0.01 || t > at + dur + 0.05) return null;
  const p = ramp(t, [at, at + dur], [0, 1], inOut);
  // La línea de pliegue x + y = d recorre la pantalla de abajo-derecha a arriba-izquierda
  const d = (W + H) * (1 - p) + 0.001;
  const cover = beneath(d);
  // La solapa es la zona despegada reflejada sobre el pliegue: (x, y) -> (d - y, d - x)
  const flap = beyond(d).map(([x, y]) => [d - y, d - x] as Pt);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <clipPath id={`cover-${at}`}>
            <polygon points={pts(cover)} />
          </clipPath>
          <linearGradient id={`flap-${at}`} x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#d9d6dc" />
            <stop offset="0.6" stopColor="#f6f4f7" />
            <stop offset="1" stopColor="#a9a4ad" />
          </linearGradient>
          <filter id={`fs-${at}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-18" dy="-18" stdDeviation="22" floodOpacity="0.55" />
          </filter>
        </defs>
        {cover.length > 2 && (
          <g clipPath={`url(#cover-${at})`}>
            <rect width={W} height={H} fill="#141417" />
            {coverSrc && (
              <image
                href={staticFile(coverSrc)}
                width={W}
                height={H}
                preserveAspectRatio="xMidYMid slice"
                style={{ filter: coverFilter }}
              />
            )}
          </g>
        )}
        {flap.length > 2 && (
          <polygon points={pts(flap)} fill={`url(#flap-${at})`} filter={`url(#fs-${at})`} />
        )}
      </svg>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Tarjeta 3D con grosor, inclinación y brillo                         */
/* ------------------------------------------------------------------ */

export const Card3D: React.FC<{
  children: React.ReactNode;
  width: number;
  height: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  depth?: number;
  radius?: number;
  style?: React.CSSProperties;
  sheen?: number;
}> = ({ children, width, height, rotX = 0, rotY = 0, rotZ = 0, depth = 14, radius = 36, style, sheen }) => {
  // grosor simulado con sombras escalonadas en la dirección contraria al giro
  const dx = Math.sin((rotY * Math.PI) / 180) * depth;
  const dy = -Math.sin((rotX * Math.PI) / 180) * depth;
  const layers = Array.from({ length: 6 }, (_, i) => {
    const k = (i + 1) / 6;
    return `${(-dx * k).toFixed(1)}px ${(dy * k + 2).toFixed(1)}px 0 #2a0b12`;
  }).join(", ");
  return (
    <div style={{ perspective: 1800, ...style }}>
      <div
        style={{
          width,
          height,
          borderRadius: radius,
          overflow: "hidden",
          position: "relative",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
          boxShadow: `${layers}, 0 60px 120px rgba(0,0,0,0.65)`,
          border: "3px solid rgba(255,255,255,0.18)",
          background: "#111",
        }}
      >
        {children}
        {sheen !== undefined && (
          <AbsoluteFill
            style={{
              background: `linear-gradient(115deg, transparent ${sheen - 15}%, rgba(255,255,255,0.35) ${sheen}%, transparent ${sheen + 15}%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </div>
  );
};

/** Foto dentro de una tarjeta 3D que cambia con un giro tipo «flip» en cada cue. */
export const FlipPhotos: React.FC<{
  items: { at: number; src: string; position?: string }[];
  width: number;
  height: number;
  baseRotY?: number;
}> = ({ items, width, height, baseRotY = -8 }) => {
  const t = useTime();
  let idx = 0;
  for (let i = 0; i < items.length; i++) if (t >= items[i].at) idx = i;
  const cur = items[idx];
  const k = ramp(t, [cur.at, cur.at + 0.45], [0, 1], outBack);
  const rotY = baseRotY + (1 - k) * 95;
  const wobble = Math.sin(t * 1.3) * 3;
  const zoom = 1.06 + ramp(t, [cur.at, cur.at + 2.5], [0, 0.1], (n) => n);
  return (
    <Card3D
      width={width}
      height={height}
      rotY={rotY + wobble}
      rotX={4}
      rotZ={-1.5}
      depth={18}
      sheen={ramp(t, [cur.at + 0.1, cur.at + 0.9], [-30, 140], (n) => n)}
    >
      <Img
        src={staticFile(cur.src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: cur.position ?? "center",
          scale: String(zoom),
          filter: "contrast(1.08) saturate(1.1)",
        }}
      />
    </Card3D>
  );
};

/* ------------------------------------------------------------------ */
/* Carrusel 3D de fotos (anillo que gira)                               */
/* ------------------------------------------------------------------ */

export const Carousel3D: React.FC<{
  srcs: string[];
  start: number;
  panelW: number;
  panelH: number;
  radius: number;
  speed?: number;
}> = ({ srcs, start, panelW, panelH, radius, speed = 28 }) => {
  const t = useTime();
  const n = srcs.length;
  const spin = (t - start) * speed + ramp(t, [start, start + 0.8], [-140, 0], outExpo);
  return (
    <div style={{ perspective: 2200, width: panelW, height: panelH, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `translateZ(${-radius}px) rotateX(-6deg) rotateY(${-spin}deg)`,
        }}
      >
        {srcs.map((s, i) => (
          <div
            key={s}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 26,
              overflow: "hidden",
              transform: `rotateY(${(360 / n) * i}deg) translateZ(${radius}px)`,
              border: "3px solid rgba(255,255,255,0.25)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
              backfaceVisibility: "hidden",
            }}
          >
            <Img src={staticFile(s)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Texto 3D extruido                                                    */
/* ------------------------------------------------------------------ */

export const Text3D: React.FC<{
  children: React.ReactNode;
  size: number;
  color?: string;
  side?: string;
  depth?: number;
  rotX?: number;
  rotY?: number;
  style?: React.CSSProperties;
}> = ({ children, size, color = "#fff", side = COLORS.burgundy, depth = 16, rotX = 0, rotY = 0, style }) => {
  const shadows = Array.from({ length: depth }, (_, i) => `${(i + 1) * 0.6}px ${(i + 1) * 0.9}px 0 ${side}`).join(", ");
  return (
    <div style={{ perspective: 1400 }}>
      <div
        style={{
          fontFamily: HEADING,
          fontSize: size,
          lineHeight: 0.92,
          color,
          textShadow: `${shadows}, 0 ${depth * 1.6}px ${depth * 2}px rgba(0,0,0,0.6)`,
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
