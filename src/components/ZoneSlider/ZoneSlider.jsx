import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useContext } from "react";

const ZoneSlider = () => {
  const { zoneInfo } = useContext(GlobalContext);

  const onButtonClick = (id) => {
    console.log(zoneInfo[id]);
  };

  return (
    <div className="absolute bottom-24 container left-1/2 -translate-x-1/2">
      <div className="w-full flex items-center justify-between">
        {zoneInfo.map((zone) => {
          return (
            <button
              className="cursor-pointer text-white text-xl px-2 py-1 relative transition hover:scale-105"
              key={zone.name}
              onClick={() => {
                onButtonClick(zone.id);
              }}
            >
              <p>{zone.name}</p>

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
