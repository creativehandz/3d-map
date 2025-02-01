import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { ModeProvider } from "./contexts/ModeContext.jsx";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import PageOne from "./routes/PageOne/PageOne.jsx";
import PageTwo from "./routes/PageTwo/PageTwo.jsx";
import PageThree from "./routes/PageThree/PageThree.jsx";

const App = () => {
  return (
    <div className="app h-screen relative overflow-hidden">
      <GlobalProvider>
        <ModeProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/page-one" element={<PageOne />} />

            <Route path="/page-two" element={<PageTwo />} />

            <Route path="/page-three" element={<PageThree />} />
          </Routes>

          <Footer />
        </ModeProvider>
      </GlobalProvider>
    </div>
  );
};

export default App;
