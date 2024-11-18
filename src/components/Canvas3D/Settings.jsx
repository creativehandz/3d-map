import { ModeContext } from "src/contexts/ModeContext.jsx";
import { Perf } from "r3f-perf";
import { useContext, Suspense, useRef, useMemo } from "react";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

const Settings = () => {
  const mode = useContext(ModeContext);

  return (
    <>
      ({mode == "DEV" && <Perf position="top-left" />})
      <Environment preset="forest" />
    </>
  );
};

export default Settings;
