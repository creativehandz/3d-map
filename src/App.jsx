import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import sources from "./assets/sources.js";
import Popup from "./components/Popup/Popup.jsx";
import { useState } from "react";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import PageOne from "./routes/PageOne/PageOne.jsx";
import PageTwo from "./routes/PageTwo/PageTwo.jsx";
import PageThree from "./routes/PageThree/PageThree.jsx";

const App = () => {
  const [focusedZone, setFocusedZone] = useState();
  const [entered, setEntered] = useState(false);

  return (
    <ModeProvider>
      <LoaderProvider sources={sources}>
        <div className="app">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Canvas3D
                    entered={entered}
                    focusedZone={focusedZone}
                    setFocusedZone={setFocusedZone}
                  />
                  <LoadingScreen setEntered={setEntered} />

                  <Popup focusedZone={focusedZone} setFocusedZone={setFocusedZone} />
                </>
              }
            />

            <Route path="/page-one" element={<PageOne />} />

            <Route path="/page-two" element={<PageTwo />} />

            <Route path="/page-three" element={<PageThree />} />
          </Routes>
          <Footer />
        </div>
      </LoaderProvider>
    </ModeProvider>
  );
};

export default App;
