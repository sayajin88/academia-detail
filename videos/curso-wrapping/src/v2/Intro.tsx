import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outExpo, popIn, ramp, shake } from "../lib/anim";
import { Eyebrow, PhotoBg, Phone, Scrim, SheenText, Slam, useTime } from "../lib/components";
import { BrandBackdrop, Globe, GrowthChart, ZoomIn } from "../lib/fx";
import { Card3D, Carousel3D, Text3D, VinylPeel } from "./fx3d";
import { C } from "./cues";

const Clip: React.FC<{ src: string; filter?: string; scaleFrom?: number; scaleTo?: number; start: number; end: number }> = ({
  src,
  filter,
  scaleFrom = 1.1,
  scaleTo = 1.25,
  start,
  end,
}) => {
  const t = useTime();
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(ramp(t, [start, end], [scaleFrom, scaleTo], (n) => n)),
          filter,
        }}
      />
    </AbsoluteFill>
  );
};

/** Texto con aberración cromática (glitch). */
const Glitch: React.FC<{ at: number; children: React.ReactNode; size: number }> = ({ at, children, size }) => {
  const t = useTime();
  if (t < at) return null;
  const fr = Math.floor(t * 30);
  const k = ramp(t, [at, at + 0.5], [1, 0.15]);
  const jx = Math.sin(fr * 7.1) * 14 * k;
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    fontFamily: HEADING,
    fontSize: size,
    lineHeight: 0.95,
    textAlign: "center",
  };
  return (
    <div style={{ position: "relative", height: size * 0.95, width: "100%" }}>
      <div style={{ ...base, color: "#ff2d55", translate: `${jx}px 0px`, opacity: 0.8, mixBlendMode: "screen" }}>{children}</div>
      <div style={{ ...base, color: "#00e5ff", translate: `${-jx}px 0px`, opacity: 0.8, mixBlendMode: "screen" }}>{children}</div>
      <div style={{ ...base, color: "#fff" }}>{children}</div>
    </div>
  );
};

/** 0–4,5 s · Hook de dolor. */
export const HookV2: React.FC = () => {
  const t = useTime();
  const second = t >= 2.18;
  const s = shake(t, 0.05, 16, 1.2);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {!second ? (
        <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
          <Clip src="v2/reloj.mp4" start={0} end={2.2} scaleFrom={1.25} scaleTo={1.45} filter="contrast(1.15) saturate(0.9) brightness(0.8)" />
        </AbsoluteFill>
      ) : (
        <Clip src="v2/aburrido.mp4" start={2.18} end={4.6} scaleFrom={1.05} scaleTo={1.18} filter="grayscale(0.85) contrast(1.1) brightness(0.7) sepia(0.15) hue-rotate(180deg)" />
      )}
      <Scrim top={0.7} bottom={0.9} />

      {!second ? (
        <>
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
            <Slam at={C.otro} size={150} from={1.6}>
              ¿OTRO
            </Slam>
            <div style={{ opacity: ramp(t, [C.lunes, C.lunes + 0.15], [0, 1]), scale: String(ramp(t, [C.lunes, C.lunes + 0.3], [2.2, 1], outExpo)) }}>
              <Text3D size={300} side="#5a1420" depth={20} rotX={12}>
                LUNES?
              </Text3D>
            </div>
          </AbsoluteFill>
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 420, textAlign: "center" }}>
            <Slam at={C.trabajo} size={110} from={1.4}>
              EN UN TRABAJO
            </Slam>
            <Slam at={C.noTeLlena} size={140} from={1.6} color={COLORS.accent}>
              QUE NO TE LLENA
            </Slam>
          </AbsoluteFill>
        </>
      ) : (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", gap: 10 }}>
          <Slam at={2.2} size={120} from={1.3}>
            Y QUE NO TE LLEVA
          </Slam>
          <Glitch at={C.ninguna} size={190}>
            A NINGUNA PARTE
          </Glitch>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 4,5–6,95 s · «Hay un oficio que puede cambiarlo todo» (con transición de vinilo despegado). */
export const OficioV2: React.FC = () => {
  const t = useTime();
  const hue = ramp(t, [C.cambiarlo, 6.95], [0, 300], (n) => n);
  return (
    <AbsoluteFill>
      <PhotoBg
        src="v2/cromado-rosa.jpg"
        start={4.5}
        end={7}
        fromScale={1.3}
        toScale={1.05}
        position="50% 45%"
        dim={0.25}
        saturate={1.4}
      />
      {/* cambio de color del vinilo */}
      <AbsoluteFill style={{ backdropFilter: `hue-rotate(${hue}deg)` }} />
      <Scrim top={0.6} bottom={0.85} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, textAlign: "center" }}>
        <Slam at={C.hay + 0.1} size={130} from={1.4}>
          HAY UN OFICIO
        </Slam>
        <Slam at={C.cambiarlo - 0.15} size={110} from={1.3} color={COLORS.accent}>
          QUE PUEDE
        </Slam>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 430 }}>
        <Slam at={C.cambiarlo} size={170} from={1.6}>
          CAMBIARLO
        </Slam>
        <div
          style={{
            opacity: ramp(t, [C.todo - 0.05, C.todo + 0.1], [0, 1]),
            scale: String(ramp(t, [C.todo - 0.05, C.todo + 0.3], [2.4, 1], outExpo)),
          }}
        >
          <SheenText at={C.todo + 0.1} size={330}>
            TODO
          </SheenText>
        </div>
      </AbsoluteFill>
      <VinylPeel at={4.5} dur={0.75} coverSrc="v2/aburrido-still.jpg" />
    </AbsoluteFill>
  );
};

/** 6,95–12 s · Sector en auge + cualquier parte del mundo. */
export const SectorV2: React.FC = () => {
  const t = useTime();
  if (t < 9.3) {
    return (
      <ZoomIn at={6.95}>
        <PhotoBg src="v2/grupo-vinilo-azul.jpg" start={6.95} end={9.4} fromScale={1.3} toScale={1.12} position="45% 50%" dim={0.62} blur={2} />
        <Scrim top={0.6} bottom={0.8} />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 280, textAlign: "center" }}>
          <Eyebrow at={C.carWrapping}>Un sector en auge</Eyebrow>
          <div style={{ marginTop: 26 }}>
            <Slam at={C.carWrapping} size={150} from={1.3}>
              EL CAR WRAPPING
            </Slam>
          </div>
          <Slam at={7.72} size={170} from={1.5} color={COLORS.accent}>
            NO PARA DE CRECER
          </Slam>
          <div style={{ marginTop: 70 }}>
            <GrowthChart at={C.crecer - 0.3} width={820} height={460} />
          </div>
        </AbsoluteFill>
      </ZoomIn>
    );
  }
  const g = ramp(t, [9.3, 9.8], [0, 1]);
  return (
    <ZoomIn at={9.3} from={0.8}>
      <BrandBackdrop glowY="55%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 140 }}>
        <div style={{ scale: String(0.6 + 0.4 * g), opacity: g }}>
          <Globe size={860} start={9.3} pinsAt={9.6} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 250, textAlign: "center" }}>
        <Slam at={C.ejercerlo} size={120} from={1.3}>
          TRABAJA EN CASI
        </Slam>
        <Slam at={C.cualquier} size={160} from={1.6} color={COLORS.accent}>
          CUALQUIER PARTE
        </Slam>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 400 }}>
        <Slam at={C.mundo} size={220} from={2.2}>
          DEL MUNDO
        </Slam>
      </AbsoluteFill>
    </ZoomIn>
  );
};

const Badge3D: React.FC<{ at: number; big: string; small: string; rotY: number }> = ({ at, big, small, rotY }) => {
  const t = useTime();
  const p = popIn(t, at, 0.5);
  return (
    <div style={{ scale: String(p), opacity: Math.min(1, p * 2) }}>
      <Card3D width={330} height={250} rotY={rotY + (1 - Math.min(1, p)) * 60} rotX={6} depth={20} radius={30}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(135deg, ${COLORS.burgundy}, ${COLORS.burgundyDeep})`,
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: HEADING, fontSize: 130, lineHeight: 0.9 }}>{big}</div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 32, letterSpacing: 3 }}>{small}</div>
        </AbsoluteFill>
      </Card3D>
    </div>
  );
};

/** 12–16,7 s · Dos niveles de dos días, en un taller real. */
export const CursoV2: React.FC = () => {
  const t = useTime();
  if (t < 15.1) {
    const enter = ramp(t, [12.0, 12.7], [0, 1], outExpo);
    return (
      <AbsoluteFill>
        <BrandBackdrop glowY="50%" />
        <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: ramp(t, [C.academia - 0.1, C.academia + 0.3], [0, 1]) }}>
          <Img src={staticFile("img/academia-logo-white.png")} style={{ width: 760 }} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 420,
            left: 70,
            perspective: 1800,
            translate: `${(1 - enter) * -900}px 0px`,
          }}
        >
          <div style={{ transform: `rotateY(${18 - enter * 4}deg) rotateZ(-3deg)` }}>
            <Phone src="shots/m-scroll.jpg" width={540} height={1100} scroll={ramp(t, [12.4, 15.1], [0, 900])} />
          </div>
        </div>
        <div style={{ position: "absolute", right: 60, top: 560, display: "flex", flexDirection: "column", gap: 60 }}>
          <Badge3D at={C.dosNiveles} big="2" small="NIVELES" rotY={-16} />
          <Badge3D at={C.dosDias} big="2 DÍAS" small="CADA NIVEL" rotY={-16} />
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <ZoomIn at={15.1}>
      <BrandBackdrop glowY="55%" />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 260 }}>
        <Slam at={C.taller - 0.1} size={130} from={1.4}>
          EN UN TALLER
        </Slam>
        <div style={{ opacity: ramp(t, [C.real, C.real + 0.12], [0, 1]), scale: String(ramp(t, [C.real, C.real + 0.3], [2, 1], outExpo)) }}>
          <Text3D size={260} color={COLORS.accent} side="#4a0f1a" depth={18}>
            REAL
          </Text3D>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 860 }}>
        <Carousel3D
          srcs={["v2/pizarra.jpg", "v2/vinilo-azul-puerta.jpg", "v2/pistola-calor.jpg", "v2/grupo-puerta.jpg", "v2/corte-puerta.jpg", "v2/teoria.jpg", "v2/retrovisor.jpg"]}
          start={15.1}
          panelW={430}
          panelH={600}
          radius={520}
          speed={45}
        />
      </AbsoluteFill>
    </ZoomIn>
  );
};
