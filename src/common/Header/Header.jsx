import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext, useRef, useEffect } from "react";
import gsap from "gsap/all";

const Header = () => {
  const { started } = useContext(GlobalContext);

  const showTl = useRef();

  useEffect(() => {
    let tl = gsap.timeline().pause();

    tl.fromTo(
      ".nav-item",
      {
        opacity: 0,
        y: -32,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
      }
    );

    showTl.current = tl;
  }, []);

  useEffect(() => {
    if (started || window.location.pathname != "/") {
      showTl.current.play();
    }
  }, [started]);

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8">
      <nav className="text-white flex items-center justify-between container mx-auto">
        {/* Logo */}
        <div>
          <a href="/" className="nav-item text-4xl">
            <img src="./ibtec-logo-t.png" className="w-24" />
          </a>
        </div>

        {/* Links */}
        <ul className="flex items-center justify-end gap-6 text-2xl font-light">
          <li className="nav-item p-2 cursor-pointer">
            <a href="/page-one">Gallery</a>
          </li>

          <li className="nav-item p-2 cursor-pointer">
            <a href="/page-two">Investor Relation</a>
          </li>
          <li className="nav-item p-2 cursor-pointer">
            <a href="/page-three">Project Overview</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
