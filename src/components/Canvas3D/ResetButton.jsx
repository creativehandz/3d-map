import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { useCallback, useContext } from "react";

const ResetButton = () => {
  const { setCurrentZone, started, animating } = useContext(GlobalContext);

  const onClick = useCallback(() => {
    if (!started || animating.current) {
      return;
    }

    setCurrentZone(-1);
  }, [started, animating]);

  return (
    <div className="container absolute bottom-4 left-1/2 -translate-x-1/2 h-16 pointer-events-none">
      <button
        className="absolute right-0 bottom-0 text-xl text-white cursor-pointer pointer-events-auto border drop-shadow-md px-4 py-2 h-fit transition hover:scale-105 hover:bg-white hover:bg-opacity-10"
        onClick={onClick}
      >
        Reset
      </button>
    </div>
  );
};
export default ResetButton;
