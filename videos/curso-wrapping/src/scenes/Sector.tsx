import React from "react";
import { AbsoluteFill } from "remotion";
import { BODY, COLORS, popIn, ramp } from "../lib/anim";
import { Eyebrow, PhotoBg, Rise, Scrim, Slam, useTime } from "../lib/components";
import { BrandBackdrop, Globe, GrowthChart, ZoomIn } from "../lib/fx";
import { CUE } from "../cues";

/** 4,5–10,9 s · Sector en auge + trabajar en cualquier parte del mundo. */
export const Sector: React.FC = () => {
  const t = useTime();
  const world = t >= 7.7;

  if (!world) {
    return (
      <ZoomIn at={4.5}>
        <PhotoBg
          src="img/ferrari.jpg"
          start={4.5}
          end={7.7}
          fromScale={1.25}
          toScale={1.1}
          position="30% 50%"
          dim={0.62}
          blur={3}
        />
        <Scrim top={0.6} bottom={0.8} />
        <AbsoluteFill
          style={{
            alignItems: "center",
            paddingTop: 300,
            textAlign: "center",
          }}
        >
          <Eyebrow at={CUE.carWrapping}>El sector</Eyebrow>
          <div style={{ marginTop: 30 }}>
            <Slam at={CUE.carWrapping} size={130} from={1.3}>
              EL CAR WRAPPING ES UN
            </Slam>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "baseline" }}>
            <Slam at={CUE.sector} size={180}>
              SECTOR
            </Slam>
            <Slam at={CUE.sector + 0.25} size={180}>
              EN
            </Slam>
            <Slam at={CUE.auge} size={220} color={COLORS.accent} from={2.4}>
              AUGE
            </Slam>
          </div>
          <div style={{ marginTop: 60 }}>
            <GrowthChart at={CUE.auge - 0.2} width={820} height={420} />
          </div>
          <div
            style={{
              marginTop: 40,
              padding: "18px 40px",
              borderRadius: 999,
              background: COLORS.burgundy,
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 46,
              color: "#fff",
              letterSpacing: 1,
              scale: String(popIn(t, CUE.crecer, 0.4)),
              boxShadow: "0 20px 60px rgba(139,35,50,0.6)",
            }}
          >
            ↗ No para de crecer
          </div>
        </AbsoluteFill>
      </ZoomIn>
    );
  }

  const g = ramp(t, [7.7, 8.2], [0, 1]);
  return (
    <ZoomIn at={7.7} from={0.8}>
      <BrandBackdrop glowY="52%" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          top: 120,
        }}
      >
        <div style={{ scale: String(0.6 + 0.4 * g), opacity: g }}>
          <Globe size={860} start={7.7} pinsAt={8.3} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ alignItems: "center", paddingTop: 260, textAlign: "center" }}
      >
        <Slam at={CUE.trabajar} size={120} from={1.4}>
          TRABAJA EN CASI
        </Slam>
        <Slam at={CUE.cualquier} size={160} color={COLORS.accent} from={1.6}>
          CUALQUIER PARTE
        </Slam>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 380,
        }}
      >
        <Slam at={CUE.mundo} size={220} from={2.2}>
          DEL MUNDO
        </Slam>
        <Rise at={CUE.mundo + 0.25}>
          <div
            style={{
              fontFamily: BODY,
              fontSize: 40,
              fontWeight: 600,
              color: COLORS.muted,
              marginTop: 10,
            }}
          >
            Un oficio que viaja contigo
          </div>
        </Rise>
      </AbsoluteFill>
    </ZoomIn>
  );
};
