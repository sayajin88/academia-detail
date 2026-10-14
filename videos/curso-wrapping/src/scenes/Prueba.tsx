import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outBack, popIn, ramp, shake } from "../lib/anim";
import {
  Counter,
  Eyebrow,
  formatEs,
  Marker,
  PhotoBg,
  Scrim,
  Slam,
  Strike,
  useTime,
} from "../lib/components";
import { ZoomIn } from "../lib/fx";
import { CUE } from "../cues";

/**
 * 31,2–38,6 s · «Y lo más importante: no vivimos de la formación. Vivimos de nuestros
 * clientes. Más de dos mil proyectos en Detail Park lo demuestran.»
 */
export const Prueba: React.FC = () => {
  const t = useTime();
  const partB = t >= 33.85;
  const partC = t >= 35.5;
  const s = shake(t, CUE.demuestran, 24, 0.4);

  if (!partC) {
    return (
      <AbsoluteFill>
        <PhotoBg
          src="img/daniel-detailpark.jpg"
          start={31.2}
          end={35.6}
          fromScale={1.05}
          toScale={1.25}
          fromY={0}
          toY={-60}
          position="50% 30%"
          dim={0.5}
        />
        <Scrim top={0.6} bottom={0.95} />
        {!partB ? (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 400, textAlign: "center" }}>
            <Eyebrow at={CUE.importante}>Lo más importante</Eyebrow>
            <div style={{ marginTop: 26 }}>
              <Slam at={CUE.noVivimos} size={170} from={1.5}>
                NO VIVIMOS DE LA
              </Slam>
            </div>
            <Slam at={CUE.formacion} size={230} from={2}>
              <Strike at={CUE.formacion + 0.45}>FORMACIÓN</Strike>
            </Slam>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 400, textAlign: "center" }}>
            <Slam at={33.9} size={170} from={1.5}>
              VIVIMOS DE NUESTROS
            </Slam>
            <div style={{ marginTop: 10 }}>
              <Slam at={CUE.clientesWord - 0.1} size={250} from={2.2}>
                <Marker at={CUE.clientesWord}>
                  <span style={{ fontFamily: HEADING, padding: "0 16px" }}>CLIENTES</span>
                </Marker>
              </Slam>
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  }

  const stamp = ramp(t, [CUE.demuestran, CUE.demuestran + 0.3], [0, 1], outBack);
  return (
    <ZoomIn at={35.5}>
      <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
        <PhotoBg src="img/taller.jpg" start={35.5} end={38.7} fromScale={1.35} toScale={1.15} fromX={80} toX={-60} position="40% 50%" dim={0.55} />
        <Scrim top={0.85} bottom={0.9} />
        <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popIn(t, 35.55, 0.4) }}>
          <Img src={staticFile("img/detailpark-logo-white.png")} style={{ width: 560 }} />
        </div>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 520, textAlign: "center" }}>
          <Slam at={CUE.masDe} size={110} from={1.4}>
            MÁS DE
          </Slam>
          <Counter
            from={0}
            to={2000}
            start={CUE.masDe + 0.1}
            end={CUE.proyectos}
            format={(n) => `+${formatEs(n)}`}
            style={{
              fontFamily: HEADING,
              fontSize: 340,
              lineHeight: 0.9,
              color: "#fff",
              textShadow: "0 0 60px rgba(224,122,136,0.6), 0 12px 40px rgba(0,0,0,0.6)",
              opacity: ramp(t, [CUE.masDe, CUE.masDe + 0.2], [0, 1]),
            }}
          />
          <Slam at={CUE.proyectos} size={130} color={COLORS.accent} from={1.6}>
            PROYECTOS REALES
          </Slam>
          <div style={{ marginTop: 12 }}>
            <Slam at={CUE.detailPark} size={80} from={1.3}>
              EN NUESTRO TALLER DE ALICANTE
            </Slam>
          </div>
        </AbsoluteFill>

        {/* Sello «prueba real» */}
        <div
          style={{
            position: "absolute",
            top: 1270,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "18px 44px",
              border: `7px solid ${COLORS.accent}`,
              borderRadius: 20,
              fontFamily: HEADING,
              fontSize: 96,
              color: COLORS.accent,
              background: "rgba(12,12,15,0.7)",
              rotate: "-6deg",
              scale: String(t < CUE.demuestran ? 0 : 3 - 2 * stamp),
              opacity: stamp,
              letterSpacing: 3,
            }}
          >
            ✓ SOMOS LA PRUEBA REAL
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 1460,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 18,
            fontFamily: BODY,
            fontWeight: 700,
            fontSize: 32,
            color: "#fff",
            opacity: ramp(t, [CUE.demuestran + 0.35, CUE.demuestran + 0.6], [0, 1]),
          }}
        >
          <span style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.12)" }}>
            500+ alumnos formados
          </span>
          <span style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.12)" }}>
            ★ 4,8 en Google
          </span>
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};
