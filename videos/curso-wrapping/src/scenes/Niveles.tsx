import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outExpo, popIn, ramp } from "../lib/anim";
import { LogoBug, Phone, useTime } from "../lib/components";
import { BrandBackdrop } from "../lib/fx";
import { CUE } from "../cues";

const Badge: React.FC<{
  at: number;
  big: string;
  small: string;
  side: "left" | "right";
  top: number;
}> = ({ at, big, small, side, top }) => {
  const t = useTime();
  const p = popIn(t, at, 0.45);
  return (
    <div
      style={{
        position: "absolute",
        top,
        [side]: 40,
        padding: "22px 34px",
        borderRadius: 30,
        background: `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.burgundyDeep})`,
        border: "3px solid rgba(255,255,255,0.18)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        scale: String(p),
        rotate: side === "left" ? "-6deg" : "5deg",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div style={{ fontFamily: HEADING, fontSize: 130, lineHeight: 0.9 }}>{big}</div>
      <div
        style={{
          fontFamily: BODY,
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        {small}
      </div>
    </div>
  );
};

/** 10,9–14,55 s · «En Academia Detail tienes dos niveles, de dos días cada uno.» */
export const Niveles: React.FC = () => {
  const t = useTime();
  const enter = ramp(t, [10.9, 11.6], [0, 1], outExpo);
  const scroll = ramp(t, [11.6, 14.4], [0, 1150]);
  const desk = ramp(t, [10.95, 11.8], [0, 1]);

  return (
    <AbsoluteFill>
      <BrandBackdrop glowY="55%" />
      <LogoBug at={CUE.academia} width={620} />

      {/* Captura de escritorio detrás, en perspectiva */}
      <div
        style={{
          position: "absolute",
          top: 330,
          left: -120,
          width: 1100,
          borderRadius: 24,
          overflow: "hidden",
          opacity: 0.35 * desk,
          transform: `perspective(1600px) rotateY(28deg) rotateZ(-4deg) translateX(${(1 - desk) * -300}px)`,
          boxShadow: "0 30px 90px rgba(0,0,0,0.7)",
        }}
      >
        <Img src={staticFile("shots/d-hero.jpg")} style={{ width: "100%", display: "block" }} />
      </div>

      {/* Móvil con la web real */}
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            marginTop: 300,
            translate: `0px ${(1 - enter) * 1400}px`,
            rotate: `${(1 - enter) * 12}deg`,
          }}
        >
          <Phone src="shots/m-scroll.jpg" width={640} height={1300} scroll={scroll} />
        </div>
      </AbsoluteFill>

      <Badge at={CUE.dosNiveles} big="2" small="niveles" side="left" top={760} />
      <Badge at={CUE.dosDias} big="2 DÍAS" small="cada nivel" side="right" top={1140} />
    </AbsoluteFill>
  );
};
