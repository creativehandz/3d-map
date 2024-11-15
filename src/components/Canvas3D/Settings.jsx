import { ModeContext } from "src/contexts/ModeContext.jsx";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useContext } from "react";

const Settings = () => {
  const mode = useContext(ModeContext);

  return (
    <>
      {mode == "DEV" && <Perf position="top-left" />}

      <OrbitControls />
    </>
  );
};

export default Settings;
