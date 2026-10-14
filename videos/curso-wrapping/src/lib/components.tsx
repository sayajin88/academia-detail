import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BODY,
  COLORS,
  HEADING,
  f,
  fadeIn,
  outExpo,
  popIn,
  ramp,
} from "./anim";

/* ------------------------------------------------------------------ */
/* Tiempo absoluto: todas las escenas trabajan en segundos de la voz.  */
/* ------------------------------------------------------------------ */

const StartCtx = createContext(0);

export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = useContext(StartCtx);
  return start + frame / fps;
};

export const Scene: React.FC<{
  name: string;
  start: number;
  end: number;
  children: React.ReactNode;
}> = ({ name, start, end, children }) => (
  <Sequence
    name={name}
    from={f(start)}
    durationInFrames={f(end) - f(start)}
    layout="absolute-fill"
  >
    <StartCtx.Provider value={start}>
      <AbsoluteFill style={{ overflow: "hidden" }}>{children}</AbsoluteFill>
    </StartCtx.Provider>
  </Sequence>
);

/* ------------------------------------------------------------------ */
/* Foto a pantalla completa con Ken Burns                              */
/* ------------------------------------------------------------------ */

export const PhotoBg: React.FC<{
  src: string;
  start: number;
  end: number;
  fromScale?: number;
  toScale?: number;
  fromX?: number;
  toX?: number;
  fromY?: number;
  toY?: number;
  position?: string;
  dim?: number;
  blur?: number;
  saturate?: number;
}> = ({
  src,
  start,
  end,
  fromScale = 1.12,
  toScale = 1.0,
  fromX = 0,
  toX = 0,
  fromY = 0,
  toY = 0,
  position = "center",
  dim = 0.35,
  blur = 0,
  saturate = 1.1,
}) => {
  const t = useTime();
  const p = ramp(t, [start, end], [0, 1], (n) => n);
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: String(fromScale + (toScale - fromScale) * p),
          translate: `${fromX + (toX - fromX) * p}px ${fromY + (toY - fromY) * p}px`,
          filter: `blur(${blur}px) saturate(${saturate}) contrast(1.08)`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(8,8,10,${dim})` }} />
    </AbsoluteFill>
  );
};

/** Degradado oscuro arriba/abajo para que el texto se lea. */
export const Scrim: React.FC<{ top?: number; bottom?: number }> = ({
  top = 0.75,
  bottom = 0.85,
}) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, rgba(8,8,10,${top}) 0%, rgba(8,8,10,0) 38%, rgba(8,8,10,0) 55%, rgba(8,8,10,${bottom}) 100%)`,
    }}
  />
);

/* ------------------------------------------------------------------ */
/* Texto                                                               */
/* ------------------------------------------------------------------ */

/** Palabra que «golpea» la pantalla: escala grande + desenfoque → nítida. */
export const Slam: React.FC<{
  at: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  from?: number;
}> = ({ at, children, size = 150, color = COLORS.text, style, from = 1.9 }) => {
  const t = useTime();
  const p = ramp(t, [at, at + 0.22], [0, 1], outExpo);
  if (t < at) return null;
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: HEADING,
        fontSize: size,
        lineHeight: 0.92,
        color,
        opacity: p,
        scale: String(from + (1 - from) * p),
        filter: `blur(${(1 - p) * 14}px)`,
        textShadow: "0 8px 40px rgba(0,0,0,0.55)",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** Texto que entra deslizando hacia arriba con máscara. */
export const Rise: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  dur?: number;
}> = ({ at, children, style, dur = 0.45 }) => {
  const t = useTime();
  const p = ramp(t, [at, at + dur], [0, 1]);
  return (
    <div style={{ overflow: "hidden", paddingBottom: 6 }}>
      <div
        style={{
          translate: `0px ${(1 - p) * 110}%`,
          opacity: p > 0 ? 1 : 0,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Antetítulo en píldora (estilo de la web). */
export const Eyebrow: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, children, style }) => {
  const t = useTime();
  const p = popIn(t, at, 0.35);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 26px",
        borderRadius: 999,
        border: `2px solid ${COLORS.accent}66`,
        background: "rgba(139,35,50,0.28)",
        backdropFilter: "blur(8px)",
        color: COLORS.accent,
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: 6,
        textTransform: "uppercase",
        opacity: Math.min(1, p * 1.5),
        scale: String(0.6 + 0.4 * p),
        ...style,
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 99,
          background: COLORS.accent,
        }}
      />
      {children}
    </div>
  );
};

/** Texto con brillo de vinilo que lo recorre en diagonal. */
export const SheenText: React.FC<{
  at: number;
  children: React.ReactNode;
  size: number;
  base?: string;
  style?: React.CSSProperties;
}> = ({ at, children, size, base, style }) => {
  const t = useTime();
  const sweep = ramp(t, [at, at + 0.9], [-60, 160], (n) => n);
  const bg =
    base ??
    "linear-gradient(100deg, #7b5cff 0%, #3fd0ff 30%, #e07a88 60%, #b13bff 100%)";
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: HEADING,
        fontSize: size,
        lineHeight: 0.9,
        backgroundImage: `linear-gradient(115deg, transparent ${sweep - 12}%, rgba(255,255,255,0.95) ${sweep}%, transparent ${sweep + 12}%), ${bg}`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.5))",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** Subrayado/rotulador que se dibuja detrás del texto. */
export const Marker: React.FC<{
  at: number;
  children: React.ReactNode;
  color?: string;
  dur?: number;
}> = ({ at, children, color = COLORS.burgundy, dur = 0.35 }) => {
  const t = useTime();
  const p = ramp(t, [at, at + dur], [0, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -14,
          right: -14,
          top: "8%",
          bottom: "4%",
          background: color,
          transformOrigin: "left center",
          scale: `${p} 1`,
          borderRadius: 10,
          rotate: "-1.5deg",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

/** Tachado animado. */
export const Strike: React.FC<{
  at: number;
  children: React.ReactNode;
  color?: string;
}> = ({ at, children, color = COLORS.accent }) => {
  const t = useTime();
  const p = ramp(t, [at, at + 0.3], [0, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 1 - p * 0.45 }}>{children}</span>
      <span
        style={{
          position: "absolute",
          left: -10,
          right: -10,
          top: "46%",
          height: 16,
          background: color,
          borderRadius: 8,
          transformOrigin: "left center",
          scale: `${p} 1`,
          rotate: "-4deg",
          boxShadow: "0 0 24px rgba(224,122,136,0.6)",
        }}
      />
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Elementos de interfaz                                               */
/* ------------------------------------------------------------------ */

export const CheckIcon: React.FC<{ progress: number; size?: number }> = ({
  progress,
  size = 64,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={COLORS.burgundy} />
    <path
      d="M18 33 L28 43 L47 22"
      fill="none"
      stroke="#fff"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={50}
      strokeDashoffset={50 * (1 - progress)}
    />
  </svg>
);

/** Tarjeta de lista con check que entra desde un lateral. */
export const CheckRow: React.FC<{
  at: number;
  children: React.ReactNode;
  from?: "left" | "right";
}> = ({ at, children, from = "left" }) => {
  const t = useTime();
  const p = ramp(t, [at, at + 0.4], [0, 1]);
  const check = ramp(t, [at + 0.15, at + 0.45], [0, 1]);
  const flash = ramp(t, [at, at + 0.5], [1, 0]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        padding: "26px 34px",
        borderRadius: 28,
        background: `linear-gradient(90deg, rgba(139,35,50,${0.35 + flash * 0.5}), rgba(27,27,33,0.78))`,
        border: "2px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        opacity: p,
        translate: `${(1 - p) * (from === "left" ? -700 : 700)}px 0px`,
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: 48,
        color: COLORS.text,
      }}
    >
      <CheckIcon progress={check} />
      <span>{children}</span>
    </div>
  );
};

/** Marco de móvil con una captura de la web que hace scroll. */
export const Phone: React.FC<{
  src: string;
  width: number;
  height: number;
  scroll: number;
  imgWidth?: number;
  style?: React.CSSProperties;
}> = ({ src, width, height, scroll, style }) => {
  const bezel = 16;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 78,
        background: "#0a0a0a",
        padding: bezel,
        boxShadow:
          "0 0 0 3px #2c2c30, 0 40px 120px rgba(0,0,0,0.7), 0 0 120px rgba(139,35,50,0.35)",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 64,
          overflow: "hidden",
          position: "relative",
          background: "#1A1A1F",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            display: "block",
            translate: `0px ${-scroll}px`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            translate: "-50% 0px",
            width: 170,
            height: 46,
            borderRadius: 30,
            background: "#000",
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)",
          }}
        />
      </div>
    </div>
  );
};

/** Logo pequeño fijo arriba para marcar la escena. */
export const LogoBug: React.FC<{ at: number; src?: string; width?: number }> = ({
  at,
  src = "img/academia-logo-white.png",
  width = 430,
}) => {
  const t = useTime();
  const p = fadeIn(t, at, 0.4);
  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: p,
        translate: `0px ${(1 - p) * -30}px`,
      }}
    >
      <Img src={staticFile(src)} style={{ width }} />
    </div>
  );
};

/** Número que cuenta hasta un valor. */
export const Counter: React.FC<{
  from: number;
  to: number;
  start: number;
  end: number;
  format: (n: number) => string;
  style?: React.CSSProperties;
}> = ({ from, to, start, end, format, style }) => {
  const t = useTime();
  const v = ramp(t, [start, end], [from, to], outExpo);
  return <span style={style}>{format(Math.round(v))}</span>;
};

/** 1999 → "1.999" (separador de miles español también con 4 cifras). */
export const formatEs = (n: number) =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
