import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outExpo, popIn, ramp, shake } from "../lib/anim";
import { Counter, Eyebrow, formatEs, useTime } from "../lib/components";
import { BrandBackdrop } from "../lib/fx";
import { CUE } from "../cues";

/** 23,15–26,42 s · «Cada nivel, 1.999 euros más IVA…» con la tarjeta real de la web. */
export const Precio: React.FC = () => {
  const t = useTime();
  const s = shake(t, CUE.precioEnd, 26, 0.4);
  const slam = ramp(t, [CUE.precioEnd, CUE.precioEnd + 0.25], [1.25, 1], outExpo);
  const card = ramp(t, [23.3, 24.0], [0, 1], outExpo);
  const iva = popIn(t, CUE.iva, 0.35);
  const ring = ramp(t, [CUE.precioEnd + 0.1, CUE.precioEnd + 0.5], [0, 1]);
  const glow = ramp(t, [CUE.precioEnd, CUE.precioEnd + 0.6], [1, 0.25]);

  // Posición de los precios dentro de la captura (995 x 1240 px, mostrada a 820 px de ancho)
  const k = 820 / 995;

  return (
    <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
      <BrandBackdrop glowY="25%" />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
        <Eyebrow at={CUE.cadaNivel}>Precio por nivel</Eyebrow>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "flex-start",
            scale: String(slam),
          }}
        >
          <Counter
            from={0}
            to={1999}
            start={CUE.precioStart - 0.1}
            end={CUE.precioEnd}
            format={(n) => `${formatEs(n)}€`}
            style={{
              fontFamily: HEADING,
              fontSize: 330,
              lineHeight: 0.95,
              color: "#fff",
              textShadow: `0 0 ${80 * glow}px rgba(224,122,136,${glow}), 0 12px 40px rgba(0,0,0,0.6)`,
              fontVariantNumeric: "tabular-nums",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 800,
            fontSize: 54,
            color: COLORS.accent,
            scale: String(iva),
            marginTop: -10,
          }}
        >
          + IVA · por nivel
        </div>
      </AbsoluteFill>

      {/* Tarjeta de precios real de academiadetail.com */}
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            top: 820,
            width: 820,
            translate: `0px ${(1 - card) * 1100}px`,
            transform: `perspective(1800px) rotateX(${(1 - card) * 25 + 8}deg)`,
            transformOrigin: "50% 0%",
            borderRadius: 30,
            boxShadow: "0 40px 120px rgba(0,0,0,0.75), 0 0 0 3px rgba(255,255,255,0.12)",
          }}
        >
          <Img src={staticFile("shots/precio-card.jpg")} style={{ width: "100%", display: "block", borderRadius: 30 }} />
          {/* Resaltado de los dos precios */}
          {[150, 365].map((y, i) => (
            <div
              key={y}
              style={{
                position: "absolute",
                left: 680 * k,
                top: y * k,
                width: 300 * k,
                height: 92 * k,
                border: `5px solid ${COLORS.accent}`,
                borderRadius: 18,
                opacity: ring,
                scale: String(1.3 - 0.3 * ramp(t, [CUE.precioEnd + 0.1 + i * 0.1, CUE.precioEnd + 0.45 + i * 0.1], [0, 1])),
                boxShadow: `0 0 30px ${COLORS.accent}`,
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
