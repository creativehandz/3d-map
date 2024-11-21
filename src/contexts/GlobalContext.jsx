import { createContext, useRef, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const zoneInfo = useRef([
    { id: 0, name: "GrowTopia", meshName: "_00Zone" },
    { id: 1, name: "Exponent", meshName: "_01Zone" },
    { id: 2, name: "StepWest", meshName: "_02Zone" },
    { id: 3, name: "StepEast", meshName: "_03Zone" },
    { id: 4, name: "Exclaim", meshName: "_04Zone" },
    { id: 5, name: "Ampersand", meshName: "_05Zone" },
    { id: 6, name: "Tilde", meshName: "_06Zone" },
    { id: 7, name: "Hash", meshName: "_07Zone" },
    { id: 8, name: "Asterisk", meshName: "_08Zone" },
  ]);

  const [currentZone, setCurrentZone] = useState(null);

  return (
    <GlobalContext.Provider value={{ zoneInfo, currentZone, setCurrentZone }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
