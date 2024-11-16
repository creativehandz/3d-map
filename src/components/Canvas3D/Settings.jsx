import { ModeContext } from "src/contexts/ModeContext.jsx";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useContext, Suspense, useRef, useMemo } from "react";
import { EffectComposer, Noise, Pixelation, SMAA } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Drawing from "./DrawingEffect.jsx";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Settings = () => {
  const mode = useContext(ModeContext);
  const drawingRef = useRef();

  const params = useControls("Postprocessing", {
    sobelThreshold: {
      value: 0.6,
      min: 0,
      max: 1.0,
      step: 0.01,
    },
    sobelMin: {
      value: 0.1,
      min: 0.001,
      max: 1.0,
      step: 0.001,
    },
    sobelMax: {
      value: 0.4,
      min: 0.001,
      max: 1.0,
      step: 0.001,
    },
  });

  return (
    <>
      {mode == "DEV" && <Perf position="top-left" />}

      <OrbitControls />

      <Suspense>
        <EffectComposer>
          <Drawing ref={drawingRef} {...params} blendFunction={BlendFunction.NORMAL} />
        </EffectComposer>
      </Suspense>
    </>
  );
};

export default Settings;
