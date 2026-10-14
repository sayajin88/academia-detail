import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, HEADING, ramp, shake } from "../lib/anim";
import {
  Marker,
  PhotoBg,
  Scrim,
  SheenText,
  Slam,
  Strike,
  useTime,
} from "../lib/components";
import { CUE } from "../cues";

/** 0–4,5 s · «Esto no es pintura… ¡Es VINILO! Y puede ser tu nueva profesión.» */
export const Hook: React.FC = () => {
  const t = useTime();
  const s = shake(t, CUE.esVinilo, 30, 0.4);
  const part2 = t >= 1.42;
  const part3 = t >= 2.5;

  return (
    <AbsoluteFill style={{ background: COLORS.bg, translate: `${s.x}px ${s.y}px` }}>
      {/* Fondo: vinilo tornasolado (1) → instalación con pistola de calor (3) */}
      {!part3 ? (
        <AbsoluteFill>
          <PhotoBg
            src="img/hook-colorshift.jpg"
            start={0}
            end={2.5}
            fromScale={part2 ? 1.55 : 1.9}
            toScale={part2 ? 1.3 : 1.45}
            position="38% 50%"
            dim={part2 ? 0.25 : 0.45}
            saturate={part2 ? 1.5 : 0.25}
          />
          {/* Aberración cromática en el golpe */}
          {part2 && (
            <AbsoluteFill
              style={{
                opacity: ramp(t, [1.42, 1.9], [0.6, 0]),
                mixBlendMode: "screen",
                translate: `${ramp(t, [1.42, 1.9], [26, 0])}px 0px`,
              }}
            >
              <Img
                src={staticFile("img/hook-colorshift.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "38% 50%",
                  scale: "1.55",
                  filter: "hue-rotate(120deg) saturate(2)",
                }}
              />
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      ) : (
        <PhotoBg
          src="img/heatgun.jpg"
          start={2.5}
          end={4.6}
          fromScale={1.35}
          toScale={1.1}
          fromX={60}
          toX={-40}
          position="42% 50%"
          dim={0.3}
        />
      )}
      <Scrim top={0.55} bottom={0.9} />

      {/* Parte 1: ESTO NO ES PINTURA */}
      {!part2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <Slam at={CUE.esto} size={150}>
              ESTO
            </Slam>
            <Slam at={CUE.no} size={150} color={COLORS.accent}>
              NO
            </Slam>
            <Slam at={CUE.es} size={150}>
              ES
            </Slam>
          </div>
          <Slam at={CUE.pintura} size={250} from={2.4}>
            <Strike at={1.05}>PINTURA</Strike>
          </Slam>
        </AbsoluteFill>
      )}

      {/* Parte 2: ¡ES VINILO! */}
      {part2 && !part3 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Slam at={CUE.esVinilo} size={130}>
            ES
          </Slam>
          <div
            style={{
              scale: String(ramp(t, [CUE.vinilo - 0.1, CUE.vinilo + 0.25], [2.6, 1])),
              opacity: ramp(t, [CUE.vinilo - 0.1, CUE.vinilo + 0.1], [0, 1]),
            }}
          >
            <SheenText at={CUE.vinilo + 0.1} size={360}>
              VINILO
            </SheenText>
          </div>
        </AbsoluteFill>
      )}

      {/* Parte 3: Y PUEDE SER TU NUEVA PROFESIÓN */}
      {part3 && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: 430,
            textAlign: "center",
          }}
        >
          <Slam at={CUE.puedeSer} size={110} from={1.4}>
            Y PUEDE SER
          </Slam>
          <Slam at={CUE.tuNueva} size={150} from={1.4}>
            TU NUEVA
          </Slam>
          <div style={{ marginTop: 14 }}>
            <Slam at={CUE.profesion} size={210} from={2}>
              <Marker at={CUE.profesion + 0.1}>
                <span style={{ fontFamily: HEADING, padding: "0 10px" }}>PROFESIÓN</span>
              </Marker>
            </Slam>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
