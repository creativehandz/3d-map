import { ModeContext } from "src/contexts/ModeContext.jsx";
import { Perf } from "r3f-perf";
import { useContext } from "react";

const Settings = () => {
  const mode = useContext(ModeContext);

  return <>({mode == "DEV" && <Perf position="top-left" />})</>;
};

export default Settings;
