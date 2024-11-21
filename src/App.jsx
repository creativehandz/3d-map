import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import sources from "./assets/sources.js";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import Popup from "./components/Popup/Popup.jsx";
import ZoneSlider from "./components/ZoneSlider/ZoneSlider.jsx";
import { useState } from "react";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import PageOne from "./routes/PageOne/PageOne.jsx";
import PageTwo from "./routes/PageTwo/PageTwo.jsx";
import PageThree from "./routes/PageThree/PageThree.jsx";

const App = () => {
  return (
    <div className="app min-h-screen relative">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <GlobalProvider>
                <ModeProvider>
                  <LoaderProvider sources={sources}>
                    <div className="app">
                      <Canvas3D />

                      <LoadingScreen />

                      <Popup />

                      <ZoneSlider />
                    </div>
                  </LoaderProvider>
                </ModeProvider>
              </GlobalProvider>
            </>
          }
        />

        <Route path="/page-one" element={<PageOne />} />

        <Route path="/page-two" element={<PageTwo />} />

        <Route path="/page-three" element={<PageThree />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
