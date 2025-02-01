import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useCallback, useContext, useRef, useEffect } from "react";
import gsap from "gsap/all";

const ResetButton = () => {
  const { setCurrentZone, started, animating, setShowPopup } = useContext(GlobalContext);

  const onClick = useCallback(() => {
    if (!started || animating.current) {
      return;
    }

    setCurrentZone(-1);
    setShowPopup(false);
  }, [started, animating]);

  const showTl = useRef();

  useEffect(() => {
    let tl = gsap.timeline().pause();

    tl.fromTo(
      ".reset-button",
      {
        opacity: 0,
        y: 16,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "linear",
      }
    );

    showTl.current = tl;
  }, []);

  useEffect(() => {
    if (started) {
      showTl.current.play();
    }
  }, [started]);

  return (
    <div className="container absolute bottom-2 left-1/2 -translate-x-1/2 h-16 pointer-events-none z-[100]">
      <button
        className="reset-button rounded-[8px] absolute right-2 bottom-0 text-lg lg:text-xl text-white cursor-pointer pointer-events-auto border drop-shadow-md px-3 py-1 lg:px-4 lg:py-2 h-fit hover:bg-white hover:bg-opacity-10"
        onClick={onClick}
      >
        Reset
      </button>
    </div>
  );
};
export default ResetButton;
