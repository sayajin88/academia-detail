import React from "react";
import { AbsoluteFill } from "remotion";
import { BODY, COLORS, HEADING, popIn, ramp } from "../lib/anim";
import { CheckRow, PhotoBg, Scrim, Slam, useTime } from "../lib/components";
import { ZoomIn } from "../lib/fx";

export interface NivelProps {
  start: number;
  end: number;
  number: string;
  title: string;
  titleAt: number;
  subtitle: string;
  photo: string;
  photoPosition: string;
  items: { at: number; text: string }[];
  extra?: { at: number; text: string };
}

/** Escena de un nivel del curso: foto real + checklist sincronizada con la voz. */
export const Nivel: React.FC<NivelProps> = ({
  start,
  end,
  number,
  title,
  titleAt,
  subtitle,
  photo,
  photoPosition,
  items,
  extra,
}) => {
  const t = useTime();
  const chip = popIn(t, start + 0.05, 0.35);
  const days = popIn(t, titleAt + 0.35, 0.4);
  const extraP = extra ? popIn(t, extra.at, 0.45) : 0;

  return (
    <ZoomIn at={start}>
      <PhotoBg
        src={photo}
        start={start}
        end={end}
        fromScale={1.08}
        toScale={1.22}
        position={photoPosition}
        dim={0.38}
      />
      <Scrim top={0.85} bottom={0.92} />

      <AbsoluteFill style={{ padding: "250px 80px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 34,
              letterSpacing: 6,
              color: "#fff",
              background: COLORS.burgundy,
              padding: "12px 26px",
              borderRadius: 14,
              scale: String(chip),
              transformOrigin: "left center",
            }}
          >
            NIVEL {number}
          </div>
          <div
            style={{
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 34,
              letterSpacing: 4,
              color: COLORS.bg,
              background: "#fff",
              padding: "12px 26px",
              borderRadius: 14,
              scale: String(days),
              transformOrigin: "left center",
            }}
          >
            2 DÍAS
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <Slam at={titleAt} size={200} from={1.6} style={{ letterSpacing: 2 }}>
            {title}
          </Slam>
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.muted,
            marginTop: 6,
            opacity: ramp(t, [titleAt + 0.2, titleAt + 0.5], [0, 1]),
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: "0 70px 380px",
          gap: 22,
        }}
      >
        {items.map((it, i) => (
          <CheckRow key={it.text} at={it.at} from={i % 2 ? "right" : "left"}>
            {it.text}
          </CheckRow>
        ))}
        {extra && (
          <div
            style={{
              alignSelf: "center",
              marginTop: 12,
              fontFamily: HEADING,
              fontSize: 64,
              color: COLORS.bg,
              background: COLORS.accent,
              padding: "10px 34px",
              borderRadius: 16,
              scale: String(extraP),
              rotate: "-2deg",
            }}
          >
            {extra.text}
          </div>
        )}
      </AbsoluteFill>
    </ZoomIn>
  );
};
