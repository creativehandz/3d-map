import { createContext } from "react";

const MODE = window.location.hash == "#panel" ? "DEV" : "PROD";

const ModeContext = createContext(MODE);

const ModeProvider = ({ children }) => {
  return <ModeContext.Provider value={MODE}>{children}</ModeContext.Provider>;
};

export { ModeContext, ModeProvider };
