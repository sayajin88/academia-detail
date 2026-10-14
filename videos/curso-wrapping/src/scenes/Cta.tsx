import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outExpo, popIn, ramp } from "../lib/anim";
import { Phone, Slam, useTime } from "../lib/components";
import { BrandBackdrop, ZoomIn } from "../lib/fx";
import { CUE } from "../cues";

const URL_TEXT = "academiadetail.com";

/** 38,65–43,4 s · «Reserva tu plaza en academiadetail.com» + cierre con logos. */
export const Cta: React.FC = () => {
  const t = useTime();
  const endCard = t >= CUE.voEnd;

  const phone = ramp(t, [38.65, 39.25], [0, 1], outExpo);
  const scroll = ramp(t, [38.85, 41.5], [0, 3300], (n) => n * n * (3 - 2 * n));
  const typed = Math.floor(ramp(t, [CUE.url, CUE.url + 0.8], [0, URL_TEXT.length], (n) => n));
  const caret = Math.floor(t * 4) % 2 === 0;
  const press = t > 41.0 && t < 41.2 ? 0.94 : 1;

  if (!endCard) {
    return (
      <ZoomIn at={38.65}>
        <BrandBackdrop glowY="60%" />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, textAlign: "center" }}>
          <Slam at={CUE.reserva} size={180} from={1.6}>
            RESERVA TU PLAZA
          </Slam>
          {/* Barra de URL que se escribe */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "20px 40px",
              borderRadius: 999,
              background: "#fff",
              color: COLORS.bg,
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 58,
              minWidth: 720,
              justifyContent: "center",
              scale: String(popIn(t, CUE.url - 0.25, 0.4) * press),
              boxShadow: `0 20px 70px rgba(224,122,136,0.55)`,
            }}
          >
            <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke={COLORS.burgundy} strokeWidth={2.4}>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
            </svg>
            <span>
              {URL_TEXT.slice(0, typed)}
              <span style={{ opacity: caret && typed < URL_TEXT.length ? 1 : 0, color: COLORS.burgundy }}>|</span>
            </span>
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center" }}>
          <div
            style={{
              marginTop: 620,
              translate: `0px ${(1 - phone) * 1300}px`,
              rotate: `${(1 - phone) * -10}deg`,
            }}
          >
            <Phone src="shots/m-scroll.jpg" width={560} height={1140} scroll={scroll} />
          </div>
        </AbsoluteFill>
      </ZoomIn>
    );
  }

  // Cierre con los dos logos
  const a = popIn(t, CUE.voEnd + 0.05, 0.5);
  const b = popIn(t, CUE.voEnd + 0.35, 0.5);
  const c = ramp(t, [CUE.voEnd + 0.6, CUE.voEnd + 0.9], [0, 1]);
  return (
    <ZoomIn at={CUE.voEnd} from={1.15}>
      <BrandBackdrop glowY="45%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40, textAlign: "center" }}>
        <Img src={staticFile("img/academia-logo-white.png")} style={{ width: 900, scale: String(a) }} />
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: COLORS.muted, opacity: c }}>
          FORMACIÓN REAL · EN UN TALLER REAL
        </div>
        <Img src={staticFile("img/detailpark-logo-white.png")} style={{ width: 520, scale: String(b) }} />
        <div style={{ opacity: c, marginTop: 30 }}>
          <div style={{ fontFamily: HEADING, fontSize: 92, color: "#fff", lineHeight: 1 }}>
            CURSO DE CAR <span style={{ color: COLORS.accent }}>WRAPPING</span>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 40, color: COLORS.muted, marginTop: 14 }}>
            Alicante · academiadetail.com
          </div>
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};
