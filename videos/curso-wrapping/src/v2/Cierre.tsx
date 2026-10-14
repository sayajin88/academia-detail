import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { BODY, COLORS, HEADING, outBack, outExpo, popIn, ramp, shake } from "../lib/anim";
import { Counter, Eyebrow, Marker, PhotoBg, Scrim, Slam, Strike, formatEs, useTime } from "../lib/components";
import { BrandBackdrop, ZoomIn } from "../lib/fx";
import { Card3D, Text3D } from "./fx3d";
import { C } from "./cues";

/* ------------------------------------------------------------------ */
/* Precio + 20 % por los dos niveles                                    */
/* ------------------------------------------------------------------ */

export const PrecioV2: React.FC = () => {
  const t = useTime();
  const s1 = shake(t, C.precioEnd, 24, 0.35);
  const s2 = shake(t, C.veinte, 34, 0.45);
  const s = t < 36.9 ? s1 : s2;

  if (t < 36.9) {
    const slam = ramp(t, [C.precioEnd, C.precioEnd + 0.25], [1.25, 1], outExpo);
    const card = ramp(t, [33.7, 34.4], [0, 1], outExpo);
    return (
      <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
        <BrandBackdrop glowY="28%" />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 240 }}>
          <Eyebrow at={C.cadaNivel}>Precio por nivel</Eyebrow>
          <div style={{ marginTop: 18, scale: String(slam) }}>
            <Text3D size={300} depth={22} rotX={14}>
              <Counter from={0} to={1999} start={C.precioStart - 0.1} end={C.precioEnd} format={(n) => `${formatEs(n)}€`} />
            </Text3D>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 56, color: COLORS.accent, scale: String(popIn(t, C.iva, 0.35)), marginTop: 18 }}>
            + IVA · 2 días
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", top: 860 }}>
          <div style={{ translate: `0px ${(1 - card) * 1000}px` }}>
            <Card3D width={820} height={600} rotX={18} rotY={-8} depth={16} radius={28}>
              <Img src={staticFile("shots/precio-card.jpg")} style={{ width: "100%", display: "block" }} />
            </Card3D>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  const stamp = ramp(t, [C.veinte, C.veinte + 0.3], [0, 1], outBack);
  const calc = ramp(t, [C.descuento - 0.2, C.descuento + 0.3], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
      <PhotoBg src="v2/fernando-2-certificados.jpg" start={36.9} end={40.4} fromScale={1.15} toScale={1.3} position="50% 40%" dim={0.55} />
      <Scrim top={0.85} bottom={0.9} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, textAlign: "center" }}>
        <Slam at={C.siHaces} size={120} from={1.4}>
          ¿Y SI HACES
        </Slam>
        <Slam at={C.losDos} size={170} from={1.6} color={COLORS.accent}>
          LOS DOS NIVELES?
        </Slam>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 40 }}>
        <div
          style={{
            opacity: stamp,
            scale: String(t < C.veinte ? 0 : 3 - 2 * stamp),
            rotate: "-8deg",
          }}
        >
          <Text3D size={400} color="#fff" side={COLORS.burgundy} depth={26} rotX={10} rotY={-10}>
            -20%
          </Text3D>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 1270 }}>
        <div
          style={{
            opacity: calc,
            translate: `0px ${(1 - calc) * 80}px`,
            padding: "22px 40px",
            borderRadius: 28,
            background: "rgba(12,12,15,0.88)",
            border: `3px solid ${COLORS.accent}`,
            textAlign: "center",
            boxShadow: `0 0 60px ${COLORS.burgundy}`,
          }}
        >
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 34, color: COLORS.muted }}>Nivel 1 + Nivel 2 · 4 días</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 26, justifyContent: "center", marginTop: 6 }}>
            <span style={{ fontFamily: HEADING, fontSize: 70, color: COLORS.muted }}>
              <Strike at={C.descuento}>3.998 €</Strike>
            </span>
            <span style={{ fontFamily: HEADING, fontSize: 110, color: "#fff" }}>3.198,40 €</span>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 30, color: COLORS.accent }}>+ IVA · 20 % de descuento</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Qué incluye + máximo 3 alumnos                                       */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, React.ReactNode> = {
  tools: <path d="M14 50 L36 28 M30 22 a12 12 0 1 0 12 12 l8 -8 -6 -6 -8 8 M10 54 l6 -6" strokeWidth={5} />,
  food: <path d="M20 8 v20 a6 6 0 0 0 12 0 v-20 M26 8 v48 M44 8 c-8 6 -8 22 0 26 v22" strokeWidth={5} />,
  cert: (
    <>
      <rect x="8" y="10" width="48" height="34" rx="4" strokeWidth={5} />
      <circle cx="32" cy="44" r="8" strokeWidth={5} />
      <path d="M26 50 l-4 10 6 -3 4 4 M38 50 l4 10 -6 -3 -4 4" strokeWidth={4} />
    </>
  ),
};

const Tile3D: React.FC<{ at: number; icon: keyof typeof ICONS; label: string; rotY: number }> = ({ at, icon, label, rotY }) => {
  const t = useTime();
  const p = ramp(t, [at, at + 0.5], [0, 1], outBack);
  return (
    <div style={{ opacity: Math.min(1, p * 2) }}>
      <Card3D width={300} height={300} rotY={rotY + (1 - p) * 90} rotX={8} depth={18} radius={30}>
        <AbsoluteFill style={{ background: "linear-gradient(160deg, #26262d, #141418)", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div style={{ width: 120, height: 120, borderRadius: 999, background: COLORS.burgundy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={70} height={70} viewBox="0 0 64 64" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[icon]}
            </svg>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, color: "#fff", textAlign: "center", lineHeight: 1.15, whiteSpace: "pre-line" }}>{label}</div>
        </AbsoluteFill>
      </Card3D>
    </div>
  );
};

export const IncluyeV2: React.FC = () => {
  const t = useTime();
  if (t < 43.1) {
    const photo = ramp(t, [C.certificado, C.certificado + 0.5], [0, 1], outExpo);
    return (
      <ZoomIn at={40.35}>
        <BrandBackdrop glowY="30%" />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
          <Slam at={40.4} size={160} from={1.5}>
            TODO INCLUIDO
          </Slam>
          <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
            <Tile3D at={C.material} icon="tools" label={"Material y\nherramientas"} rotY={14} />
            <Tile3D at={C.comida} icon="food" label={"Comida\ntodos los días"} rotY={0} />
            <Tile3D at={C.certificado} icon="cert" label={"Certificado\nDetail Park"} rotY={-14} />
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", top: 1000 }}>
          <div style={{ opacity: photo, translate: `0px ${(1 - photo) * 300}px` }}>
            <Card3D width={900} height={560} rotX={10} rotY={6} depth={16} radius={32}>
              <Img
                src={staticFile("v2/entrega-certificado.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(ramp(t, [C.certificado, 43.2], [1.25, 1.08], (n) => n)) }}
              />
            </Card3D>
          </div>
        </AbsoluteFill>
      </ZoomIn>
    );
  }
  return (
    <ZoomIn at={43.1} from={0.85}>
      <PhotoBg src="v2/grupo-4.jpg" start={43.1} end={45.3} fromScale={1.25} toScale={1.08} position="50% 40%" dim={0.55} />
      <Scrim top={0.85} bottom={0.9} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 260, textAlign: "center" }}>
        <Slam at={C.maximo} size={140} from={1.4}>
          MÁXIMO
        </Slam>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ opacity: ramp(t, [C.tres, C.tres + 0.1], [0, 1]), scale: String(ramp(t, [C.tres, C.tres + 0.3], [2.5, 1], outExpo)) }}>
            <Text3D size={460} color={COLORS.accent} side="#4a0f1a" depth={22}>
              3
            </Text3D>
          </div>
          <div style={{ textAlign: "left" }}>
            <Slam at={C.alumnos} size={140} from={1.4}>
              ALUMNOS
            </Slam>
            <br />
            <Slam at={C.alumnos + 0.4} size={110} from={1.4}>
              POR GRUPO
            </Slam>
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 420 }}>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 42, color: "#fff", opacity: ramp(t, [44.4, 44.7], [0, 1]), background: "rgba(12,12,15,0.7)", padding: "12px 28px", borderRadius: 16 }}>
          El formador, encima de tu técnica
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};

/* ------------------------------------------------------------------ */
/* Prueba real                                                          */
/* ------------------------------------------------------------------ */

export const PruebaV2: React.FC = () => {
  const t = useTime();
  const s = shake(t, C.demuestran, 26, 0.4);
  if (t < 48.9) {
    const partB = t >= 47.1;
    return (
      <AbsoluteFill>
        <PhotoBg src="img/daniel-detailpark.jpg" start={45.25} end={49} fromScale={1.05} toScale={1.25} toY={-60} position="50% 30%" dim={0.5} />
        <Scrim top={0.6} bottom={0.95} />
        {!partB ? (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 400, textAlign: "center" }}>
            <Slam at={C.noVivimos} size={170} from={1.5}>
              NO VIVIMOS DE LA
            </Slam>
            <Slam at={C.formacion} size={230} from={2}>
              <Strike at={C.formacion + 0.45}>FORMACIÓN</Strike>
            </Slam>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 400, textAlign: "center" }}>
            <Slam at={C.vivimos} size={160} from={1.5}>
              VIVIMOS DE NUESTROS
            </Slam>
            <div style={{ marginTop: 10 }}>
              <Slam at={C.clientes - 0.1} size={250} from={2.2}>
                <Marker at={C.clientes}>
                  <span style={{ fontFamily: HEADING, padding: "0 16px" }}>CLIENTES</span>
                </Marker>
              </Slam>
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  }
  const stamp = ramp(t, [C.demuestran, C.demuestran + 0.3], [0, 1], outBack);
  return (
    <ZoomIn at={48.9}>
      <AbsoluteFill style={{ translate: `${s.x}px ${s.y}px` }}>
        <PhotoBg src="img/taller.jpg" start={48.9} end={50.8} fromScale={1.35} toScale={1.15} fromX={80} toX={-60} position="40% 50%" dim={0.55} />
        <Scrim top={0.85} bottom={0.9} />
        <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popIn(t, 48.95, 0.4) }}>
          <Img src={staticFile("img/detailpark-logo-white.png")} style={{ width: 560 }} />
        </div>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 520, textAlign: "center" }}>
          <Slam at={C.masDe} size={110} from={1.4}>
            MÁS DE
          </Slam>
          <Text3D size={330} depth={20} rotX={10}>
            <Counter from={0} to={2000} start={C.masDe + 0.1} end={C.proyectos} format={(n) => `+${formatEs(n)}`} />
          </Text3D>
          <Slam at={C.proyectos} size={130} color={COLORS.accent} from={1.6}>
            PROYECTOS REALES
          </Slam>
        </AbsoluteFill>
        <div style={{ position: "absolute", top: 1300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
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
              scale: String(t < C.demuestran ? 0 : 3 - 2 * stamp),
              opacity: stamp,
              letterSpacing: 3,
            }}
          >
            ✓ LO DEMUESTRAN
          </div>
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};

/* ------------------------------------------------------------------ */
/* Cierre: alumno con su certificado, foto de grupo y CTA               */
/* ------------------------------------------------------------------ */

const URL_TEXT = "academiadetail.com";

export const CtaV2: React.FC = () => {
  const t = useTime();

  // 1) Vídeo real: un alumno recibe su certificado
  if (t < 52.45) {
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <OffthreadVideo
          src={staticFile("v2/fernando.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(ramp(t, [50.75, 52.5], [1.08, 1.18], (n) => n)) }}
        />
        {/* tapa los subtítulos quemados del vídeo original */}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.92) 74%, #000 100%)" }} />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 230 }}>
          <Eyebrow at={50.8}>Alumno del curso de wrapping</Eyebrow>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 380, textAlign: "center" }}>
          <Slam at={C.plazas} size={170} from={1.5}>
            PLAZAS
          </Slam>
          <Slam at={C.limitadas} size={200} from={1.8} color={COLORS.accent}>
            LIMITADAS
          </Slam>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // 2) Foto de todos + URL
  if (t < 55.2) {
    const typed = Math.floor(ramp(t, [C.url, C.url + 0.9], [0, URL_TEXT.length], (n) => n));
    const caret = Math.floor(t * 4) % 2 === 0;
    return (
      <ZoomIn at={52.45}>
        <PhotoBg src="v2/grupo-detailpark.jpg" start={52.45} end={55.3} fromScale={1.3} toScale={1.2} dim={0.55} blur={24} />
        <Scrim top={0.7} bottom={0.9} />
        {/* foto de todo el grupo frente al logo de Detail Park, en tarjeta 3D */}
        <AbsoluteFill style={{ alignItems: "center", top: 560 }}>
          <Card3D
            width={980}
            height={665}
            rotY={ramp(t, [52.45, 55.2], [14, -6], (n) => n)}
            rotX={6}
            depth={18}
            radius={28}
            sheen={ramp(t, [52.6, 53.6], [-30, 140], (n) => n)}
          >
            <Img src={staticFile("v2/grupo-detailpark.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(ramp(t, [52.45, 55.2], [1.12, 1.02], (n) => n)) }} />
          </Card3D>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 240, textAlign: "center" }}>
          <Slam at={C.reserva} size={180} from={1.6}>
            RESERVA LA TUYA
          </Slam>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 420 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "22px 44px",
              borderRadius: 999,
              background: "#fff",
              color: COLORS.bg,
              fontFamily: BODY,
              fontWeight: 800,
              fontSize: 60,
              minWidth: 760,
              justifyContent: "center",
              scale: String(popIn(t, C.url - 0.3, 0.4)),
              boxShadow: "0 20px 70px rgba(224,122,136,0.6)",
            }}
          >
            <svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke={COLORS.burgundy} strokeWidth={2.4}>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
            </svg>
            <span>
              {URL_TEXT.slice(0, typed)}
              <span style={{ opacity: caret && typed < URL_TEXT.length ? 1 : 0, color: COLORS.burgundy }}>|</span>
            </span>
          </div>
        </AbsoluteFill>
      </ZoomIn>
    );
  }

  // 3) Tarjeta final con CTA clara
  const a = popIn(t, 55.25, 0.5);
  const btn = popIn(t, 55.7, 0.45);
  const pulse = 1 + Math.sin((t - 56) * 6) * 0.03;
  const tap = t > 56.6 && t < 56.85 ? 0.93 : 1;
  const cursor = ramp(t, [56.0, 56.6], [0, 1], outExpo);
  return (
    <ZoomIn at={55.2} from={1.15}>
      <BrandBackdrop glowY="55%" />
      {/* fotos reales de alumnos con certificado en 3D */}
      <AbsoluteFill style={{ top: 250 }}>
        {[
          { src: "v2/alumno-certificado-1.jpg", x: 70, r: -10, d: 0 },
          { src: "v2/fernando-2-certificados.jpg", x: 375, r: 2, d: 0.12 },
          { src: "v2/alumno-certificado-2.jpg", x: 680, r: 10, d: 0.24 },
        ].map((p) => {
          const k = ramp(t, [55.3 + p.d, 55.8 + p.d], [0, 1], outBack);
          return (
            <div key={p.src} style={{ position: "absolute", left: p.x, opacity: Math.min(1, k * 2), translate: `0px ${(1 - k) * 200}px` }}>
              <Card3D width={330} height={420} rotY={p.r * 2} rotZ={p.r} rotX={8} depth={14} radius={20}>
                <Img src={staticFile(p.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Card3D>
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 760, gap: 26 }}>
        <Img src={staticFile("img/academia-logo-white.png")} style={{ width: 860, scale: String(a) }} />
        <div style={{ position: "relative", scale: String(btn * pulse * tap) }}>
          <div
            style={{
              padding: "34px 70px",
              borderRadius: 999,
              background: `linear-gradient(180deg, #a52a3c, ${COLORS.burgundy})`,
              boxShadow: `0 16px 0 #4a0f1a, 0 30px 80px rgba(139,35,50,0.8)`,
              fontFamily: HEADING,
              fontSize: 96,
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            RESERVA TU PLAZA →
          </div>
          {/* cursor que pulsa */}
          <svg
            width={110}
            height={110}
            viewBox="0 0 24 24"
            style={{ position: "absolute", right: 30, bottom: -70, opacity: cursor, translate: `${(1 - cursor) * 200}px ${(1 - cursor) * 200}px`, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.6))" }}
          >
            <path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 19.8 L12 13.8 L18 13.5 Z" fill="#fff" stroke="#000" strokeWidth={1} />
          </svg>
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 52, color: "#fff", opacity: btn }}>academiadetail.com</div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 36, color: COLORS.muted, opacity: ramp(t, [56.2, 56.5], [0, 1]) }}>
          o escríbenos por WhatsApp · +34 622 773 555
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10, opacity: ramp(t, [56.5, 56.8], [0, 1]) }}>
          <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 28, color: COLORS.muted, letterSpacing: 4 }}>BY</span>
          <Img src={staticFile("img/detailpark-logo-white.png")} style={{ width: 360 }} />
        </div>
      </AbsoluteFill>
    </ZoomIn>
  );
};
