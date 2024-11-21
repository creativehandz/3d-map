import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import sources from "./assets/sources.js";
import Popup from "./components/Popup/Popup.jsx";
import ZoneSlider from "./components/ZoneSlider/ZoneSlider.jsx";
import { useState } from "react";

const App = () => {
  const [focusedZone, setFocusedZone] = useState();
  const [entered, setEntered] = useState(false);

  return (
    <GlobalProvider>
      <ModeProvider>
        <LoaderProvider sources={sources}>
          <div className="app">
            <Canvas3D
              entered={entered}
              focusedZone={focusedZone}
              setFocusedZone={setFocusedZone}
            />
            <LoadingScreen setEntered={setEntered} />

            <Popup focusedZone={focusedZone} setFocusedZone={setFocusedZone} />

            <ZoneSlider />
          </div>
        </LoaderProvider>
      </ModeProvider>
    </GlobalProvider>
  );
};

export default App;
