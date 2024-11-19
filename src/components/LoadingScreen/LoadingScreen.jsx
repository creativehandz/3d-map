import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { ModeContext } from "src/contexts/ModeContext.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap/all";

const LoadingScreen = () => {
  const mode = useContext(ModeContext);
  const { progress, completed } = useContext(LoaderContext);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const animation = useRef({ progress: 0 });
  const timeline = useRef(gsap.timeline());
  const container = useRef();
  const indicator = useRef();
  const line = useRef();
  const button = useRef();

  useEffect(() => {
    if (mode == "DEV") {
      // setCompleted(true);
      return;
    }

    let tl = timeline.current;
    let a = animation.current;

    tl.to(line.current, {
      scaleX: progress,
      ease: "linear",
      delay: progress < 0.3 ? 0.4 : 0.0,
      duration: 0.8,
      onComplete: () => {
        if (progress == 1) {
          setAnimationCompleted(true);
        }
      },
    });
  }, [progress]);

  useEffect(() => {
    if (animationCompleted) {
      let tl = timeline.current;
      console.log("a");
      tl.to(button.current, {
        delay: 0.2,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        ease: "back.out(4)",
      });
    }
  }, [animationCompleted]);

  return (
    <>
      {true && (
        <div
          id="loading"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          ref={container}
        >
          <div id="kenburn-wrapper" className="absolute inset-0">
            <img
              src="./V5.jpg"
              id="kenburn-img"
              className="absolute top-0 left-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
          </div>

          <div
            className="absolute top-3/4 -translate-y-1/2 left-0 right-0 flex flex-col items-center gap-y-8 z-50 py-2"
            ref={indicator}
          >
            <div className="relative hover:scale-105 transition">
              <button
                ref={button}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-white px-6 py-1 rounded-full text-6xl font-medium drop-shadow-lg pointer-events-none opacity-0 scale-0 cursor-pointer"
              >
                Enter
              </button>
            </div>

            <div className="h-6 border-2 shadow-xl container mx-auto bg-transparent relative">
              <div
                ref={line}
                className="absolute top-0 left-0 h-full origin-left w-full bg-white scale-x-0"
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
