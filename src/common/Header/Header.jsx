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
    <header className="absolute top-0 left-0 w-full z-50 py-4 sm:py-8">
      <nav className="text-white flex flex-col sm:flex-row items-center justify-between container mx-auto gap-2">
        {/* Logo */}
        <div>
          <a href="/" className="nav-item">
            <img src="./ibtec-logo-t.png" className="w-24" />
          </a>
        </div>

        {/* Links */}
        <ul className="flex items-start sm:items-center justify-end gap-6 text-md sm:text-xl lg:text-2xl font-light text-center leading-4">
          <li className="nav-item p-2 cursor-pointer w-24 sm:w-fit">
            <a href="/page-one" className="hover:text-yellow-400">
              Gallery
            </a>
          </li>

          <li className="nav-item p-2 cursor-pointer w-24 sm:w-fit">
            <a href="/page-two" className="hover:text-yellow-400">
              Investor Relation
            </a>
          </li>
          <li className="nav-item p-2 cursor-pointer w-24 sm:w-fit">
            <a href="/page-three" className="hover:text-yellow-400">
              Project Overview
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
