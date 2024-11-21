import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import sources from "./assets/sources.js";
import Popup from "./components/Popup/Popup.jsx";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";

const App = () => {
  const [zone, setZone] = useState();
  const [entered, setEntered] = useState(false);

  return (
    <ModeProvider>
      <LoaderProvider sources={sources}>
        <div className="app">
          <Canvas3D entered={entered} zone={zone} setZone={setZone} />
          <LoadingScreen setEntered={setEntered} />

          {entered && <Navbar />}
          <Popup zone={zone} setZone={setZone} />
        </div>
      </LoaderProvider>
    </ModeProvider>
  );
};

export default App;
