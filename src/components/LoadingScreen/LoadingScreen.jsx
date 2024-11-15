import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { ModeContext } from "src/contexts/ModeContext.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap/all";

const LoadingScreen = () => {
  const mode = useContext(ModeContext);
  const { progress } = useContext(LoaderContext);
  const [completed, setCompleted] = useState(false);

  const animation = useRef({ progress: 0 });
  const timeline = useRef(gsap.timeline());
  const container = useRef();
  const indicator = useRef();
  const line = useRef();
  const text = useRef();

  useEffect(() => {
    if (mode == "DEV") {
      setCompleted(true);
      return;
    }

    let tl = timeline.current;
    let a = animation.current;

    tl.to(a, {
      progress: progress,
      duration: 0.2,
      ease: "linear",
      onUpdate: () => {
        text.current.innerText = `${(a.progress * 100).toFixed(0)}%`;
        line.current.style.transform = `scaleX(${a.progress})`;

        if (a.progress == 1) {
          tl.to(indicator.current, {
            y: "100%",
            delay: 0.8,
            duration: 0.4,
            opacity: 0,
            ease: "power1.out",
          });

          tl.to(container.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
              setCompleted(true);
            },
          });
        }
      },
    });
  }, [progress]);

  return (
    <>
      {!completed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ffffff]"
          ref={container}
        >
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-y-4"
            ref={indicator}
          >
            <div className="text-[#121212]" ref={text}>
              0%
            </div>

            <div className="h-2 w-full origin-left scale-x-0 bg-[#121212]" ref={line}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;

