import "./fonts";
import { Composition } from "remotion";
import { CursoWrapping } from "./CursoWrapping";
import { FPS, HEIGHT, TOTAL_SECONDS, WIDTH, f } from "./lib/anim";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CursoWrapping"
      component={CursoWrapping}
      durationInFrames={f(TOTAL_SECONDS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
