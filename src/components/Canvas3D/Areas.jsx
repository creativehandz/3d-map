import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { useContext } from "react";

const Areas = () => {
  const { getNode } = useContext(LoaderContext);

  return (
    <>
      <mesh
        geometry={getNode("areas", "_00Area").geometry}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <meshBasicMaterial color={0x00ff00} depthTest={false} transparent opacity={0.5} />
      </mesh>
    </>
  );
};
export default Areas;
