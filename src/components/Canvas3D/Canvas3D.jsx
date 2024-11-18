import Settings from "./Settings.jsx";
import Scene from "./Scene.jsx";
import { ModeContext } from "src/contexts/ModeContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useContext, useState } from "react";
import CameraControls from "./CameraControls.jsx";

const Canvas3D = () => {
  const mode = useContext(ModeContext);
  const { completed } = useContext(LoaderContext);

  const rendererProps = useControls("Renderer", {
    outputColorSpace: {
      value: THREE.LinearSRGBColorSpace,
      options: {
        LinearSRGB: THREE.LinearSRGBColorSpace,
        SRGB: THREE.SRGBColorSpace,
      },
    },
    toneMapping: {
      value: THREE.NeutralToneMapping,
      options: {
        NoToneMapping: THREE.NoToneMapping,
        LinearToneMapping: THREE.LinearToneMapping,
        ReinhardToneMapping: THREE.ReinhardToneMapping,
        CineonToneMapping: THREE.CineonToneMapping,
        ACESFilmicToneMapping: THREE.ACESFilmicToneMapping,
        AgXToneMapping: THREE.AgXToneMapping,
        NeutralToneMapping: THREE.NeutralToneMapping,
      },
    },
    toneMappingExposure: {
      value: 1,
      min: 0,
      max: 3,
      step: 0.01,
    },
  });

  const [zone, setZone] = useState();
  const focusTo = (zone) => {
    setZone(zone);
  };

  return (
    <div className="fixed inset-0">
      {completed && (
        <Canvas
          gl={{
            ...rendererProps,
            // antialias: false,
          }}
          camera={{
            position: [-300, 700, 200],
            far: 100000,
            near: 2,
          }}
        >
          <Settings />

          <CameraControls zone={zone} />
          <Scene focusTo={focusTo} />
        </Canvas>
      )}

      <Leva hidden={mode != "DEV"} />
    </div>
  );
};

export default Canvas3D;
