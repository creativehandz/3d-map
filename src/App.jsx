import { ModeProvider } from "./contexts/ModeContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import Canvas3D from "./components/Canvas3D/Canvas3D.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import sources from "./assets/sources.js";
import Popup from "./components/Popup/Popup.jsx";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from "./components/Pages/Gallery.jsx";
import InvestorRelations from "./components/Pages/InvestorRelations.jsx";
import ProjectOverview from "./components/Pages/ProjectOverview.jsx";

const App = () => {
  const [focusedZone, setFocusedZone] = useState();
  const [entered, setEntered] = useState(false);

  return (
    <ModeProvider>
      <LoaderProvider sources={sources}>
        <div className="app">
          <Canvas3D
            entered={entered}
            focusedZone={focusedZone}
            setFocusedZone={setFocusedZone}
          />
          <LoadingScreen setEntered={setEntered} />

          {entered && 
                    <Router>
                    {/* Add Navbar once here, it will appear on all pages */}
                    <Navbar />
        
                    {/* Define Routes for different pages */}
                    <Routes>
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/investor-relations" element={<InvestorRelations />} />
                      <Route path="/project-overview" element={<ProjectOverview />} />
                    </Routes>
                  </Router>}
          {/* <Popup zone={zone} setZone={setZone} /> */}

          <Popup focusedZone={focusedZone} setFocusedZone={setFocusedZone} />

        </div>
      </LoaderProvider>
    </ModeProvider>
  );
};

export default App;
