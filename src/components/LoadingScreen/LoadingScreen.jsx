import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { ModeContext } from "src/contexts/ModeContext.jsx";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap/all";

const LoadingScreen = () => {
  const { setInitialized } = useContext(GlobalContext);
  const mode = useContext(ModeContext);
  const { progress, completed } = useContext(LoaderContext);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const container = useRef();
  const indicator = useRef();
  const line = useRef();
  const button = useRef();

  const animationTl = useMemo(() => gsap.timeline(), []);

  const hideTl = useRef(gsap.timeline().pause());
  useEffect(() => {
    if (mode == "DEV") {
      hideTl.current.play();
      setInitialized(true);
      return;
    }

    let tl = gsap.timeline().pause();

    tl.to(container.current, {
      delay: 0.2,
      duration: 0.8,
      onComplete: () => {
        container.current.style.display = "none";
      },
    });

    hideTl.current = tl;
  }, []);

  useEffect(() => {
    if (mode == "DEV") {
      return;
    }

    let tl = animationTl;

    tl.to(line.current, {
      scaleX: progress,
      ease: "linear",
      // delay: progress < 0.3 ? 0.4 : 0.0,
      duration: 0.1,
      onComplete: () => {
        if (progress == 1) {
          setAnimationCompleted(true);
        }
      },
    });
  }, [progress]);

  useEffect(() => {
    if (mode == "DEV") {
      return;
    }

    if (animationCompleted) {
      let tl = animationTl;

      tl.to(button.current, {
        delay: 0.2,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        ease: "back.out(4)",
      });
    }
  }, [animationCompleted]);

  const onEnter = () => {
    hideTl.current.play();
    setInitialized(true);
  };

  return (
    <>
      {mode != "DEV" && (
        <div
          id="loading"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-500"
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
          <div id="loading" className="inset-0 z-[100] w-full" ref={container}>
            <div className="w-full py-0 px-0">
              <div className="absolute left-1/2 -translate-x-1/2">
                <img
                  src="./ibtec-logo-t.png"
                  alt="Logo"
                  className="w-52 h-auto mt-[-100px] mx-auto mb-36"
                />
              </div>

              <p className="text-white px-5 text-2xl lg:text-6xl font-light text-center lg:leading-[78px]">
                Building Visions, Shaping The Future<br></br>
                Innovating Tomorrow, Sustainably Today
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center text-center"></div>
            <div className="absolute inset-0 bg-repeat z-10 pointer-events-none moving-cloud "></div>
            <div
              className="absolute bottom-44 left-0 right-0 flex flex-col items-center gap-y-8 z-50 py-2"
              ref={indicator}
            >
              <button
                ref={button}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-black px-6 py-1 rounded-[8px] text-xl lg:text-3xl drop-shadow-lg pointer-events-none opacity-0 scale-0 cursor-pointer bg-[#FFCC33]"
                onClick={onEnter}
              >
                Enter
              </button>
              <div className="h-6 border-2 shadow-xl container mx-auto bg-transparent relative opacity-0">
                <div
                  ref={line}
                  className="absolute top-0 left-0 h-full origin-left w-full bg-white scale-x-0"
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
