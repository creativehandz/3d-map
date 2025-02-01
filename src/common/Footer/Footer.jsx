import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext, useRef, useEffect } from "react";
import gsap from "gsap/all";

const Footer = () => {
  const { started } = useContext(GlobalContext);

  const showTl = useRef();

  useEffect(() => {
    let tl = gsap.timeline().pause();

    tl.fromTo(
      ".footer-item",
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "linear",
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
    <footer className="absolute bottom-5 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Copyright */}
        <div className="footer-item text-white opacity-80 text-lg lg:text-xl pointer-events-auto">
          <p>
            &copy; Copyright{" "}
            <a
              href="https://thefacecraft.com/"
              target="_blank"
              className="hover:text-yellow-400"
            >
              FaceCraft GmbH
            </a>{" "}
            2024
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
