import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/all";

const Popup = () => {
  const { zoneInfo, currentZone, setCurrentZone, showPopup, setShowPopup } =
    useContext(GlobalContext);

  const popupRef = useRef();
  const toggleTl = useRef();
  const titleRef = useRef();

  useEffect(() => {
    let tl = gsap.timeline().reverse().pause();
    let popup = popupRef.current;

    tl.to(popup, {
      delay: 1.4,
      pointerEvents: "auto",
      scale: 1,
      ease: "back.out(1)",
      duration: 0.8,
    });

    toggleTl.current = tl;
  }, []);

  useEffect(() => {
    let tl = toggleTl.current;

    if (currentZone != -1 && currentZone != null && showPopup) {
      tl.play();
      titleRef.current.innerText = zoneInfo.current[currentZone].name;
    } else {
      tl.reverse();
    }
  }, [currentZone, showPopup]);

  return (
    <div
      id="popup"
      ref={popupRef}
      className="fixed inset-6 lg:inset-64 lg:top-32 lg:bottom-64 bg-[#ffffff] rounded-2xl grid lg:grid-cols-3 gap-4 p-2 sm:p-4 shadow-xl scale-0 pointer-events-none z-50"
    >
      {/* Image */}
      <div className="col-span-2 rounded-2xl overflow-hidden shadow-md">
        <img src="./5.jpg" className="w-full h-full object-cover" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 justify-center px-4 relative">
        <h1
          className="text-5xl font-bold tracking-tighter drop-shadow-md text-[#000000]"
          ref={titleRef}
        >
          Zone Name
        </h1>

        <p className="text-lg font-light drop-shadow-sm text-[#000000]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at officiis,
          necessitatibus, aliquid vitae obcaecati beatae ullam non autem aut quibusdam unde
          commodi, delectus sit aperiam reprehenderit tenetur iure architecto!
        </p>

        <a
          href="#"
          className="hover:scale-105 transition text-white text-lg bg-[#ffcc33] px-6 py-2 rounded-[8px] w-fit"
        >
          More Info
        </a>

        <button
          className="bg-red-200 px-4 py-1 rounded-[8px] font-light text-gray-700 hover:scale-105 transition hover:bg-red-300 absolute bottom-2 right-2 sm:bottom-4 sm:right-4"
          onClick={() => {
            setCurrentZone(-1);
            setShowPopup(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup;
