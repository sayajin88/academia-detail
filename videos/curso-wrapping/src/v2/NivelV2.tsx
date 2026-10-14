import React from "react";
import { AbsoluteFill } from "remotion";
import { BODY, COLORS, outBack, outExpo, popIn, ramp } from "../lib/anim";
import { CheckIcon, PhotoBg, useTime } from "../lib/components";
import { BrandBackdrop } from "../lib/fx";
import { FlipPhotos, Text3D } from "./fx3d";

export interface Topic {
  at: number;
  title: string;
  sub: string;
  src: string;
  position?: string;
}

/**
 * Un nivel del curso: cabecera 3D, foto real que gira con cada materia
 * y lista que se va completando, todo sincronizado con la voz.
 */
export const NivelV2: React.FC<{
  start: number;
  end: number;
  number: string;
  title: string;
  titleAt: number;
  note: string;
  intro: { src: string; position?: string };
  topics: Topic[];
}> = ({ start, end, number, title, titleAt, note, intro, topics }) => {
  const t = useTime();
  let cur = -1;
  topics.forEach((tp, i) => {
    if (t >= tp.at) cur = i;
  });
  const head = ramp(t, [start, start + 0.55], [0, 1], outBack);
  const titleP = ramp(t, [titleAt - 0.05, titleAt + 0.35], [0, 1], outExpo);
  const capKey = cur >= 0 ? topics[cur].at : start;
  const cap = ramp(t, [capKey, capKey + 0.35], [0, 1], outExpo);

  return (
    <AbsoluteFill>
      <BrandBackdrop glowY="38%" />
      {/* fondo desenfocado con la foto actual */}
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <PhotoBg
          src={cur >= 0 ? topics[cur].src : intro.src}
          start={start}
          end={end}
          fromScale={1.3}
          toScale={1.2}
          dim={0.4}
          blur={30}
        />
      </AbsoluteFill>

      {/* Cabecera: NIVEL X · 2 DÍAS + título 3D */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 175 }}>
        <div style={{ perspective: 1200 }}>
          <div
            style={{
              display: "flex",
              gap: 16,
              transform: `rotateX(${(1 - head) * 90}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, letterSpacing: 6, color: "#fff", background: COLORS.burgundy, padding: "10px 24px", borderRadius: 14 }}>
              NIVEL {number}
            </span>
            <span style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: COLORS.bg, background: "#fff", padding: "10px 24px", borderRadius: 14 }}>
              2 DÍAS · 1.999 € + IVA
            </span>
          </div>
        </div>
        <div style={{ marginTop: 14, opacity: titleP, scale: String(1.6 - 0.6 * titleP) }}>
          <Text3D size={190} depth={16} rotX={10}>
            {title}
          </Text3D>
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: COLORS.muted, marginTop: 4, opacity: titleP }}>{note}</div>
      </AbsoluteFill>

      {/* Foto 3D con la materia actual */}
      <AbsoluteFill style={{ alignItems: "center", top: 560 }}>
        <div style={{ position: "relative" }}>
          <FlipPhotos
            width={900}
            height={600}
            items={[{ at: start, src: intro.src, position: intro.position }, ...topics.map((tp) => ({ at: tp.at, src: tp.src, position: tp.position }))]}
          />
          {cur >= 0 && (
            <div
              style={{
                position: "absolute",
                left: 30,
                right: 30,
                bottom: -46,
                padding: "18px 28px",
                borderRadius: 22,
                background: "rgba(12,12,15,0.88)",
                border: `2px solid ${COLORS.accent}88`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                opacity: cap,
                translate: `0px ${(1 - cap) * 40}px`,
              }}
            >
              <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 46, color: "#fff", lineHeight: 1.1 }}>
                <span style={{ color: COLORS.accent }}>{String(cur + 1).padStart(2, "0")} · </span>
                {topics[cur].title}
              </div>
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: COLORS.muted, marginTop: 4 }}>{topics[cur].sub}</div>
            </div>
          )}
        </div>
      </AbsoluteFill>

      {/* Lista que se completa */}
      <AbsoluteFill style={{ top: 1290, paddingLeft: 110, paddingRight: 110, gap: 10 }}>
        {topics.map((tp, i) => {
          const p = popIn(t, tp.at, 0.35);
          const done = t >= tp.at;
          return (
            <div
              key={tp.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: done ? 1 : 0.28,
                scale: String(done ? 0.92 + 0.08 * Math.min(1, p) : 0.92),
                transformOrigin: "left center",
                fontFamily: BODY,
                fontWeight: 700,
                fontSize: 34,
                color: done ? "#fff" : COLORS.muted,
              }}
            >
              <CheckIcon progress={done ? ramp(t, [tp.at, tp.at + 0.3], [0, 1]) : 0} size={44} />
              {tp.title}
              {i === cur && <span style={{ color: COLORS.accent, fontSize: 30 }}>◀</span>}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
