import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext, useEffect, useCallback, useRef } from "react";
import gsap from "gsap/all";

const ZoneSlider = () => {
  const { zoneInfo, currentZone, setCurrentZone, started, animating, setShowPopup } =
    useContext(GlobalContext);

  const onButtonClick = useCallback(
    (id) => {
      if (!started || animating.current) {
        return;
      }

      setCurrentZone(id);
    },
    [started]
  );

  const sliderRef = useRef();
  const showTl = useRef();

  useEffect(() => {
    let tl = gsap.timeline().pause();

    // console.log(sliderRef.current.querySelectorAll(".slider-button"));

    tl.fromTo(
      ".slider-button",
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
      }
    );

    tl.fromTo(
      ".slider-line",
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 8,
      },
      "<"
    );

    showTl.current = tl;
  }, []);

  useEffect(() => {
    if (started) {
      showTl.current.play();
    }
  }, [started]);

  return (
    <div className="absolute bottom-20 container left-1/2 -translate-x-1/2" ref={sliderRef}>
      <div className="w-full flex items-center justify-between">
        {zoneInfo.current.map((zone) => {
          return (
            <button
              className={`slider-button cursor-pointer text-xl px-2 py-1 relative group ${zone.id == currentZone ? "text-amber-400 font-bold scale-105" : "text-white"}`}
              key={zone.name}
              onClick={() => {
                onButtonClick(zone.id);
                setShowPopup(true);
              }}
            >
              <p className="group-hover:scale-105 transition drop-shadow-lg">{zone.name}</p>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-2 bg-white"></div>
            </button>
          );
        })}

        <div className="slider-line absolute top-full translate-y-2 w-full h-px bg-white"></div>
      </div>
    </div>
  );
};
export default ZoneSlider;
