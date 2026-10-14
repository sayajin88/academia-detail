import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FPS, ramp } from "./anim";
import { useTime } from "./components";

/** Grano de película que cambia cada fotograma. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 12;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

/** Barra de progreso fina arriba (retención en redes). */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 10,
        width: `${(frame / (durationInFrames - 1)) * 100}%`,
        background: `linear-gradient(90deg, ${COLORS.burgundy}, ${COLORS.accent})`,
        boxShadow: `0 0 18px ${COLORS.accent}`,
      }}
    />
  );
};

/**
 * Destello + aberración cromática en cada corte.
 * Trabaja con el tiempo global (se monta fuera de las escenas).
 */
export const CutFlashes: React.FC<{ cuts: number[]; offset: number }> = ({
  cuts,
  offset,
}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS - offset;
  let flash = 0;
  for (const c of cuts) {
    const k = t - c;
    if (k >= -0.03 && k < 0.25) flash = Math.max(flash, 1 - Math.max(0, k) / 0.25);
  }
  if (flash <= 0) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{ background: "#fff", opacity: flash * 0.55, mixBlendMode: "screen" }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, rgba(255,0,80,${flash * 0.25}), rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,200,255,${flash * 0.25}))`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

/** Entrada de escena: zoom con desenfoque de movimiento. */
export const ZoomIn: React.FC<{
  at: number;
  children: React.ReactNode;
  from?: number;
}> = ({ at, children, from = 1.25 }) => {
  const t = useTime();
  const p = ramp(t, [at, at + 0.4], [0, 1]);
  return (
    <AbsoluteFill
      style={{
        scale: String(from + (1 - from) * p),
        filter: p < 1 ? `blur(${(1 - p) * 10}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Fondo oscuro con resplandor burdeos y líneas diagonales en movimiento. */
export const BrandBackdrop: React.FC<{ glowY?: string }> = ({ glowY = "40%" }) => {
  const t = useTime();
  const shift = (t * 60) % 120;
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% ${glowY}, rgba(139,35,50,0.75) 0%, rgba(90,20,32,0.35) 35%, rgba(12,12,15,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.08,
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, #fff 2px, transparent 2px, transparent 60px)",
          backgroundPosition: `${shift}px 0px`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Globo terráqueo en alambre (proyección ortográfica)                 */
/* ------------------------------------------------------------------ */

const CITIES: [number, number][] = [
  [40.4, -3.7], // Madrid
  [38.35, -0.48], // Alicante
  [51.5, -0.12], // Londres
  [25.2, 55.3], // Dubái
  [25.8, -80.2], // Miami
  [19.4, -99.1], // Ciudad de México
  [-33.9, 151.2], // Sídney
  [-34.6, -58.4], // Buenos Aires
  [48.85, 2.35], // París
  [40.7, -74.0], // Nueva York
  [1.35, 103.8], // Singapur
  [-23.5, -46.6], // São Paulo
];

export const Globe: React.FC<{ size: number; start: number; pinsAt: number }> = ({
  size,
  start,
  pinsAt,
}) => {
  const t = useTime();
  const R = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const lon0 = (-20 + (t - start) * 38) * (Math.PI / 180);
  const lat0 = 18 * (Math.PI / 180);
  const rad = Math.PI / 180;

  const project = (lat: number, lon: number) => {
    const phi = lat * rad;
    const lam = lon * rad;
    const cosc =
      Math.sin(lat0) * Math.sin(phi) +
      Math.cos(lat0) * Math.cos(phi) * Math.cos(lam - lon0);
    const x = R * Math.cos(phi) * Math.sin(lam - lon0);
    const y =
      R *
      (Math.cos(lat0) * Math.sin(phi) -
        Math.sin(lat0) * Math.cos(phi) * Math.cos(lam - lon0));
    return { x: cx + x, y: cy - y, visible: cosc > 0 };
  };

  const lines: string[] = [];
  const pushLine = (pts: { x: number; y: number; visible: boolean }[]) => {
    let d = "";
    let pen = false;
    for (const p of pts) {
      if (p.visible) {
        d += `${pen ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)} `;
        pen = true;
      } else pen = false;
    }
    if (d) lines.push(d);
  };
  for (let lon = -180; lon < 180; lon += 20) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 5) pts.push(project(lat, lon));
    pushLine(pts);
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 5) pts.push(project(lat, lon));
    pushLine(pts);
  }

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="globeFill" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3a1520" />
          <stop offset="100%" stopColor="#0e0b0d" />
        </radialGradient>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="url(#globeFill)"
        stroke={COLORS.accent}
        strokeOpacity={0.7}
        strokeWidth={3}
        style={{ filter: `drop-shadow(0 0 40px ${COLORS.burgundy})` }}
      />
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={COLORS.accent} strokeOpacity={0.35} strokeWidth={2} />
      ))}
      {CITIES.map(([lat, lon], i) => {
        const p = project(lat, lon);
        if (!p.visible) return null;
        const appear = ramp(t, [pinsAt + i * 0.12, pinsAt + i * 0.12 + 0.3], [0, 1]);
        const pulse = ((t * 1.4 + i * 0.3) % 1);
        return (
          <g key={i} opacity={appear}>
            <circle cx={p.x} cy={p.y} r={10 + pulse * 34} fill="none" stroke={COLORS.accent} strokeOpacity={1 - pulse} strokeWidth={3} />
            <circle cx={p.x} cy={p.y} r={11 * appear} fill="#fff" />
            <circle cx={p.x} cy={p.y} r={6 * appear} fill={COLORS.accent} />
          </g>
        );
      })}
    </svg>
  );
};

/** Gráfico ilustrativo de crecimiento (sin cifras). */
export const GrowthChart: React.FC<{ at: number; width: number; height: number }> = ({
  at,
  width,
  height,
}) => {
  const t = useTime();
  const bars = [0.22, 0.32, 0.41, 0.55, 0.7, 0.9];
  const gap = 22;
  const bw = (width - gap * (bars.length - 1)) / bars.length;
  const line = ramp(t, [at + 0.3, at + 1.4], [0, 1]);
  const pts = bars.map((b, i) => [i * (bw + gap) + bw / 2, height - b * height - 30]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const angle = (Math.atan2(last[1] - prev[1], last[0] - prev[0]) * 180) / Math.PI;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      {bars.map((b, i) => {
        const g = ramp(t, [at + i * 0.12, at + i * 0.12 + 0.5], [0, 1]);
        const h = b * height * g;
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={height - h}
            width={bw}
            height={h}
            rx={14}
            fill={i === bars.length - 1 ? COLORS.accent : COLORS.burgundy}
            opacity={0.55 + 0.45 * (i / bars.length)}
          />
        );
      })}
      <path
        d={d}
        fill="none"
        stroke="#fff"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - line}
        style={{ filter: "drop-shadow(0 0 16px rgba(255,255,255,0.7))" }}
      />
      {line > 0.98 && (
        <g transform={`translate(${last[0]},${last[1]}) rotate(${angle})`}>
          <path d="M-8,-30 L34,0 L-8,30 Z" fill="#fff" />
        </g>
      )}
    </svg>
  );
};
