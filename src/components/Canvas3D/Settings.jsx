import { ModeContext } from "src/contexts/ModeContext.jsx";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useContext, Suspense, useRef, useMemo } from "react";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Settings = () => {
  const mode = useContext(ModeContext);

  return (
    <>
      {mode == "DEV" && <Perf position="top-left" />}

      <OrbitControls makeDefault />
    </>
  );
};

export default Settings;
