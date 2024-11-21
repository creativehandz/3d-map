import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext, useEffect, useCallback } from "react";

const ZoneSlider = () => {
  const { zoneInfo, currentZone, setCurrentZone, started, animating } =
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

  useEffect(() => {
    // console.log(started);
  }, [started]);

  return (
    <div className="absolute bottom-24 container left-1/2 -translate-x-1/2">
      <div className="w-full flex items-center justify-between">
        {zoneInfo.current.map((zone) => {
          return (
            <button
              className={`cursor-pointer text-xl px-2 py-1 relative transition duration-500 hover:scale-105 ${zone.id == currentZone ? "text-green-500 font-bold scale-105" : "text-white"}`}
              key={zone.name}
              onClick={() => {
                onButtonClick(zone.id);
              }}
            >
              <p className="drop-shadow-lg">{zone.name}</p>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-2 bg-white"></div>
            </button>
          );
        })}

        <div className="absolute top-full translate-y-2 w-full h-px bg-white"></div>
      </div>
    </div>
  );
};
export default ZoneSlider;
