import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, getStaticFiles, interpolate, staticFile } from "remotion";
import { COLORS, f } from "../lib/anim";
import { Scene } from "../lib/components";
import { CutFlashes, Grain, ProgressBar, Vignette } from "../lib/fx";
import { C, CUTS2, S2, TOTAL2, VO2_OFFSET } from "./cues";
import { CursoV2, HookV2, OficioV2, SectorV2 } from "./Intro";
import { NivelV2 } from "./NivelV2";
import { CtaV2, IncluyeV2, PrecioV2, PruebaV2 } from "./Cierre";

const hasFile = (name: string) => getStaticFiles().some((s) => s.name === name);

const Sfx: React.FC<{ file: string; at: number; volume: number; name: string; dur?: number }> = ({ file, at, volume, name, dur = 60 }) =>
  hasFile(file) ? (
    <Sequence from={Math.max(0, f(at + VO2_OFFSET) - 2)} durationInFrames={dur} name={name}>
      <Audio src={staticFile(file)} volume={volume} />
    </Sequence>
  ) : null;

const SoundtrackV2: React.FC = () => {
  const total = f(TOTAL2);
  const vo = (sec: number) => f(sec + VO2_OFFSET);
  return (
    <>
      {hasFile("audio/music-v2.mp3") && (
        <Audio
          src={staticFile("audio/music-v2.mp3")}
          volume={(fr) =>
            interpolate(
              fr,
              [0, 8, vo(0.2), vo(C.voEnd), vo(C.voEnd) + 12, total - 30, total - 1],
              [0, 0.45, 0.24, 0.24, 0.6, 0.6, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}
      {hasFile("audio/vo-v2.mp3") && (
        <Sequence from={vo(0)} name="Voz en off (mujer)">
          <Audio src={staticFile("audio/vo-v2.mp3")} />
        </Sequence>
      )}
      <Sfx file="audio/alarm.mp3" at={0} volume={0.3} name="Despertador" dur={f(2.1)} />
      {CUTS2.map((c) => (
        <Sfx key={c} file="audio/whoosh.mp3" at={c - 0.15} volume={0.3} name="Whoosh" dur={30} />
      ))}
      <Sfx file="audio/vinyl.mp3" at={4.45} volume={0.55} name="Vinilo despegado" />
      <Sfx file="audio/impact.mp3" at={C.todo} volume={0.35} name="Impacto" />
      <Sfx file="audio/impact.mp3" at={C.precioEnd} volume={0.35} name="Impacto precio" />
      <Sfx file="audio/stamp.mp3" at={C.veinte} volume={0.6} name="Sello -20%" />
      <Sfx file="audio/stamp.mp3" at={C.demuestran} volume={0.55} name="Sello prueba" />
      <Sfx file="audio/impact.mp3" at={55.2} volume={0.3} name="Impacto final" />
    </>
  );
};

export const CursoWrappingV2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <Sequence from={f(VO2_OFFSET)} name="Escenas" layout="absolute-fill">
      <Scene name="1 · Hook (dolor)" start={S2.hook[0]} end={S2.hook[1]}>
        <HookV2 />
      </Scene>
      <Scene name="2 · Un oficio que lo cambia todo" start={S2.oficio[0]} end={S2.oficio[1]}>
        <OficioV2 />
      </Scene>
      <Scene name="3 · Sector" start={S2.sector[0]} end={S2.sector[1]}>
        <SectorV2 />
      </Scene>
      <Scene name="4 · Dos niveles, taller real" start={S2.curso[0]} end={S2.curso[1]}>
        <CursoV2 />
      </Scene>
      <Scene name="5 · Nivel principiante" start={S2.nivel1[0]} end={S2.nivel1[1]}>
        <NivelV2
          start={S2.nivel1[0]}
          end={S2.nivel1[1]}
          number="1"
          title="PRINCIPIANTE"
          titleAt={C.principiante}
          note="Fundamentos completos · desde cero"
          intro={{ src: "v2/vinilo-azul-puerta.jpg" }}
          topics={[
            { at: C.tipos, title: "Tipos y calidades de vinilo", sub: "Mate, satinado, brillo y texturizados", src: "v2/pizarra.jpg" },
            { at: C.preparacion, title: "Preparación y desmontaje", sub: "Limpieza, descontaminación y desmontaje", src: "v2/desmontaje.jpg", position: "50% 35%" },
            { at: C.corte, title: "Metodología de corte", sub: "Recortes limpios y precisos", src: "v2/corte-cuter.jpg" },
            { at: C.tensado, title: "Tensado con calor", sub: "Posicionamiento, tensión y pistola de calor", src: "v2/pistola-calor.jpg", position: "50% 30%" },
            { at: C.presupuestar, title: "Cómo presupuestar al cliente", sub: "Explicar y presupuestar un cambio de color", src: "v2/explicacion-cliente.jpg" },
          ]}
        />
      </Scene>
      <Scene name="6 · Nivel avanzado" start={S2.nivel2[0]} end={S2.nivel2[1]}>
        <NivelV2
          start={S2.nivel2[0]}
          end={S2.nivel2[1]}
          number="2"
          title="AVANZADO"
          titleAt={C.avanzado}
          note="Recomendado tras el nivel principiante"
          intro={{ src: "v2/grupo-puerta-2.jpg" }}
          topics={[
            { at: C.cromados, title: "Instalación de cromados", sub: "El vinilo más exigente", src: "v2/cromado-rosa-2.jpg", position: "50% 55%" },
            { at: C.retrovisores, title: "Retrovisores y paragolpes", sub: "Curvas y zonas complejas", src: "v2/retrovisor-rasqueta.jpg" },
            { at: C.interiores, title: "Interiores de puerta", sub: "Acabado de alta gama", src: "v2/corte-puerta.jpg" },
            { at: C.sellado, title: "Sellado y bordes invisibles", sub: "Post-calentado y control de calidad", src: "v2/calor-marco.jpg" },
          ]}
        />
      </Scene>
      <Scene name="7 · Precio y -20%" start={S2.precio[0]} end={S2.precio[1]}>
        <PrecioV2 />
      </Scene>
      <Scene name="8 · Qué incluye" start={S2.incluye[0]} end={S2.incluye[1]}>
        <IncluyeV2 />
      </Scene>
      <Scene name="9 · Prueba real" start={S2.prueba[0]} end={S2.prueba[1]}>
        <PruebaV2 />
      </Scene>
      <Scene name="10 · Certificado y CTA" start={S2.cta[0]} end={S2.cta[1]}>
        <CtaV2 />
      </Scene>
    </Sequence>

    <CutFlashes cuts={CUTS2.filter((c) => c !== 4.5)} offset={VO2_OFFSET} />
    <Vignette />
    <Grain />
    <ProgressBar />
    <SoundtrackV2 />
  </AbsoluteFill>
);
