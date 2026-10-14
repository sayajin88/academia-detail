import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, getStaticFiles, interpolate, staticFile } from "remotion";
import { COLORS, TOTAL_SECONDS, VO_OFFSET, f } from "./lib/anim";
import { Scene } from "./lib/components";
import { CutFlashes, Grain, ProgressBar, Vignette } from "./lib/fx";
import { CUE, CUTS, SCENES } from "./cues";
import { Hook } from "./scenes/Hook";
import { Sector } from "./scenes/Sector";
import { Niveles } from "./scenes/Niveles";
import { Nivel } from "./scenes/Nivel";
import { Precio } from "./scenes/Precio";
import { Incluye } from "./scenes/Incluye";
import { Prueba } from "./scenes/Prueba";
import { Cta } from "./scenes/Cta";

const hasFile = (name: string) => getStaticFiles().some((s) => s.name === name);

/** Pistas de audio: voz en off, música y efectos. Solo se montan si existen los ficheros. */
const Soundtrack: React.FC = () => {
  const total = f(TOTAL_SECONDS);
  const vo = (sec: number) => f(sec + VO_OFFSET);
  return (
    <>
      {hasFile("audio/music.mp3") && (
        <Audio
          src={staticFile("audio/music.mp3")}
          volume={(fr) =>
            interpolate(
              fr,
              [0, 6, vo(0.3), vo(CUE.voEnd), vo(CUE.voEnd) + 10, total - 25, total - 1],
              [0, 0.55, 0.2, 0.2, 0.5, 0.5, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}
      {hasFile("audio/vo.mp3") && (
        <Sequence from={vo(0)} name="Voz en off">
          <Audio src={staticFile("audio/vo.mp3")} volume={1} />
        </Sequence>
      )}
      {hasFile("audio/whoosh.mp3") &&
        CUTS.map((c) => (
          <Sequence key={c} from={Math.max(0, vo(c) - 6)} durationInFrames={30} name="Whoosh">
            <Audio src={staticFile("audio/whoosh.mp3")} volume={0.35} />
          </Sequence>
        ))}
      {hasFile("audio/impact.mp3") &&
        [CUE.esVinilo, CUE.precioEnd, CUE.demuestran, CUE.voEnd].map((c) => (
          <Sequence key={c} from={vo(c) - 1} durationInFrames={60} name="Impacto">
            <Audio src={staticFile("audio/impact.mp3")} volume={0.55} />
          </Sequence>
        ))}
      {hasFile("audio/vinyl.mp3") &&
        [CUE.pintura, CUE.principiante].map((c) => (
          <Sequence key={c} from={vo(c)} durationInFrames={60} name="Vinilo">
            <Audio src={staticFile("audio/vinyl.mp3")} volume={0.4} />
          </Sequence>
        ))}
    </>
  );
};

export const CursoWrapping: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence from={f(VO_OFFSET)} name="Escenas" layout="absolute-fill">
        <Scene name="1 · Hook" start={SCENES.hook[0]} end={SCENES.hook[1]}>
          <Hook />
        </Scene>
        <Scene name="2 · Sector en auge" start={SCENES.sector[0]} end={SCENES.sector[1]}>
          <Sector />
        </Scene>
        <Scene name="3 · Dos niveles" start={SCENES.niveles[0]} end={SCENES.niveles[1]}>
          <Niveles />
        </Scene>
        <Scene name="4 · Principiante" start={SCENES.principiante[0]} end={SCENES.principiante[1]}>
          <Nivel
            start={SCENES.principiante[0]}
            end={SCENES.principiante[1]}
            number="1"
            title="PRINCIPIANTE"
            titleAt={CUE.principiante}
            subtitle="Fundamentos completos de car wrapping"
            photo="img/cutting.jpg"
            photoPosition="50% 40%"
            items={[
              { at: CUE.tiposVinilo, text: "Tipos y calidades de vinilo" },
              { at: CUE.corte, text: "Metodología de corte" },
              { at: CUE.instalacion, text: "Instalación práctica" },
              { at: CUE.instalacion + 0.7, text: "Cómo explicárselo al cliente" },
            ]}
          />
        </Scene>
        <Scene name="5 · Avanzado" start={SCENES.avanzado[0]} end={SCENES.avanzado[1]}>
          <Nivel
            start={SCENES.avanzado[0]}
            end={SCENES.avanzado[1]}
            number="2"
            title="AVANZADO"
            titleAt={CUE.avanzado}
            subtitle="Técnicas avanzadas para profesionales"
            photo="img/heatgun.jpg"
            photoPosition="72% 50%"
            items={[
              { at: CUE.cromados, text: "Instalación de cromados" },
              { at: CUE.interiores, text: "Interiores de puerta" },
              { at: CUE.tecnicas, text: "Técnicas de nivel avanzado" },
            ]}
            extra={{ at: 22.35, text: "LOS DOS SEGUIDOS: 4 DÍAS" }}
          />
        </Scene>
        <Scene name="6 · Precio" start={SCENES.precio[0]} end={SCENES.precio[1]}>
          <Precio />
        </Scene>
        <Scene name="7 · Qué incluye" start={SCENES.incluye[0]} end={SCENES.incluye[1]}>
          <Incluye />
        </Scene>
        <Scene name="8 · Prueba real" start={SCENES.prueba[0]} end={SCENES.prueba[1]}>
          <Prueba />
        </Scene>
        <Scene name="9 · CTA y logos" start={SCENES.cta[0]} end={SCENES.cta[1]}>
          <Cta />
        </Scene>
      </Sequence>

      <CutFlashes cuts={CUTS} offset={VO_OFFSET} />
      <Vignette />
      <Grain />
      <ProgressBar />
      <Soundtrack />
    </AbsoluteFill>
  );
};
