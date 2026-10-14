import "./fonts";
import { Composition } from "remotion";
import { CursoWrapping } from "./CursoWrapping";
import { CursoWrappingV2 } from "./v2/CursoWrappingV2";
import { TOTAL2 } from "./v2/cues";
import { FPS, HEIGHT, TOTAL_SECONDS, WIDTH, f } from "./lib/anim";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CursoWrappingV2"
        component={CursoWrappingV2}
        durationInFrames={f(TOTAL2)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CursoWrapping"
        component={CursoWrapping}
        durationInFrames={f(TOTAL_SECONDS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
