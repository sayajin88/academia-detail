import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BODY, COLORS, outExpo, popIn, ramp } from "../lib/anim";
import { Eyebrow, PhotoBg, Slam, useTime } from "../lib/components";
import { BrandBackdrop, ZoomIn } from "../lib/fx";
import { CUE } from "../cues";

const ICONS: Record<string, React.ReactNode> = {
  tools: (
    <path d="M14 50 L36 28 M30 22 a12 12 0 1 0 12 12 l8 -8 -6 -6 -8 8 M10 54 l6 -6" strokeWidth={5} />
  ),
  food: (
    <path d="M20 8 v20 a6 6 0 0 0 12 0 v-20 M26 8 v48 M44 8 c-8 6 -8 22 0 26 v22" strokeWidth={5} />
  ),
  cert: (
    <>
      <rect x="8" y="10" width="48" height="34" rx="4" strokeWidth={5} />
      <circle cx="32" cy="44" r="8" strokeWidth={5} />
      <path d="M26 50 l-4 10 6 -3 4 4 M38 50 l4 10 -6 -3 -4 4" strokeWidth={4} />
    </>
  ),
};

const Tile: React.FC<{ at: number; icon: keyof typeof ICONS; label: string }> = ({
  at,
  icon,
  label,
}) => {
  const t = useTime();
  const p = popIn(t, at, 0.45);
  return (
    <div
      style={{
        width: 300,
        padding: "34px 18px 30px",
        borderRadius: 32,
        background: "rgba(27,27,33,0.85)",
        border: `3px solid ${COLORS.accent}55`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        scale: String(p),
        translate: `0px ${(1 - Math.min(1, p)) * 80}px`,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 999,
          background: COLORS.burgundy,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={70} height={70} viewBox="0 0 64 64" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[icon]}
        </svg>
      </div>
      <div
        style={{
          fontFamily: BODY,
          fontWeight: 800,
          fontSize: 36,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.15,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Person: React.FC<{ at: number; highlight?: boolean }> = ({ at, highlight }) => {
  const t = useTime();
  const p = popIn(t, at, 0.4);
  return (
    <svg width={190} height={240} viewBox="0 0 64 80" style={{ scale: String(p) }}>
      <circle cx="32" cy="18" r="14" fill={highlight ? COLORS.accent : "#fff"} />
      <path d="M6 78 c0 -22 10 -34 26 -34 s26 12 26 34 Z" fill={highlight ? COLORS.accent : "#fff"} />
    </svg>
  );
};

/** 26,42–31,2 s · Qué incluye + máximo 3 alumnos por grupo. */
export const Incluye: React.FC = () => {
  const t = useTime();
  const partB = t >= 29.2;

  if (!partB) {
    const photo = ramp(t, [CUE.certificado - 0.1, CUE.certificado + 0.5], [0, 1], outExpo);
    return (
      <ZoomIn at={26.42}>
        <BrandBackdrop glowY="30%" />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 240 }}>
          <Eyebrow at={26.45}>Qué incluye tu plaza</Eyebrow>
          <div style={{ marginTop: 16 }}>
            <Slam at={26.5} size={170} from={1.5}>
              TODO INCLUIDO
            </Slam>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
            <Tile at={CUE.material} icon="tools" label={"Material y\nherramientas"} />
            <Tile at={CUE.comida} icon="food" label={"Comida\ntodos los días"} />
            <Tile at={CUE.certificado} icon="cert" label={"Certificado\nDetail Park"} />
          </div>
        </AbsoluteFill>
        {/* Foto real de alumnos con su certificado */}
        <div
          style={{
            position: "absolute",
            top: 1010,
            left: 60,
            right: 60,
            height: 520,
            borderRadius: 36,
            overflow: "hidden",
            opacity: photo,
            translate: `0px ${(1 - photo) * 300}px`,
            boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 4px rgba(255,255,255,0.15)",
          }}
        >
          <Img
            src={staticFile("img/certificados.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "38% 55%",
              scale: String(ramp(t, [CUE.certificado, 29.3], [1.35, 1.15], (n) => n)),
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 24,
              padding: "12px 22px",
              borderRadius: 14,
              background: "rgba(12,12,15,0.8)",
              fontFamily: BODY,
              fontWeight: 700,
              fontSize: 30,
              color: "#fff",
              opacity: ramp(t, [28.2, 28.5], [0, 1]),
            }}
          >
            + Bolsa de empleo y dudas resueltas después del curso
          </div>
        </div>
      </ZoomIn>
    );
  }

  return (
    <ZoomIn at={29.2} from={0.85}>
      <PhotoBg src="img/taller.jpg" start={29.2} end={31.3} fromScale={1.2} toScale={1.05} position="60% 50%" dim={0.72} blur={4} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, textAlign: "center" }}>
        <Slam at={CUE.maximo} size={150} from={1.4}>
          MÁXIMO
        </Slam>
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: -10 }}>
          <Slam at={CUE.tres} size={520} from={2.6} color={COLORS.accent}>
            3
          </Slam>
          <div style={{ textAlign: "left" }}>
            <Slam at={CUE.alumnos} size={140} from={1.4}>
              ALUMNOS
            </Slam>
            <br />
            <Slam at={CUE.alumnos + 0.35} size={110} from={1.4}>
              POR GRUPO
            </Slam>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
          <Person at={CUE.tres + 0.05} />
          <Person at={CUE.tres + 0.2} highlight />
          <Person at={CUE.tres + 0.35} />
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 600,
            fontSize: 42,
            color: COLORS.muted,
            marginTop: 40,
            opacity: ramp(t, [30.5, 30.8], [0, 1]),
          }}
        >
          El formador encima de tu técnica
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};
