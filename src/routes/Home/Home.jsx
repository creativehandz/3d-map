import { LoaderProvider } from "src/contexts/LoaderContext.jsx";
import sources from "src/assets/sources.js";
import Canvas3D from "src/components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "src/components/LoadingScreen/LoadingScreen.jsx";
import Popup from "src/components/Popup/Popup.jsx";
import ZoneSlider from "src/components/ZoneSlider/ZoneSlider.jsx";

const Home = () => {
  return (
    <LoaderProvider sources={sources}>
      <div className="app">
        <Canvas3D />

        <LoadingScreen />

        <Popup />

        <ZoneSlider />
      </div>
    </LoaderProvider>
  );
};
export default Home;
