import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import sources from "./assets/sources.js";

const App = () => {
  return (
    <ModeProvider>
      <LoaderProvider sources={sources}>
        <div className="app">
          <Canvas3D />
          <LoadingScreen />
        </div>
      </LoaderProvider>
    </ModeProvider>
  );
};

export default App;
