import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/all";

const Popup = ({ zone, setZone }) => {
  const popupRef = useRef();
  const toggleTl = useRef();

  const [active, setActive] = useState(false);

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

    if (active) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [active]);

  useEffect(() => {
    if (zone) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [zone]);

  return (
    <div
      id="popup"
      ref={popupRef}
      className="fixed inset-16 bg-green-50 rounded-2xl grid grid-cols-3 gap-4 p-4 shadow-xl scale-0 pointer-events-none hidden"
    >
      {/* Image */}
      <div className="col-span-2 rounded-2xl overflow-hidden shadow-md">
        <img src="./5.jpg" className="w-full h-full object-cover" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 justify-center px-4 relative">
        <h1 className="text-5xl font-bold tracking-tighter drop-shadow-md text-green-900">
          Zone Name
        </h1>

        <p className="text-lg font-light drop-shadow-sm text-green-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat at officiis,
          necessitatibus, aliquid vitae obcaecati beatae ullam non autem aut quibusdam unde
          commodi, delectus sit aperiam reprehenderit tenetur iure architecto!
        </p>

        <a
          href="#"
          className="hover:scale-105 transition text-white text-lg bg-green-900 px-6 py-2 rounded-full w-fit"
        >
          More Info
        </a>

        <button
          className="bg-red-200 px-4 py-1 rounded-full font-light text-gray-700 hover:scale-105 transition hover:bg-red-300 absolute bottom-4 right-4"
          onClick={() => {
            setActive(false);
            setZone(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup;
