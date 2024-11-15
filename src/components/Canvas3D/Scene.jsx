import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { useContext } from "react";

const Scene = () => {
  const { getNode } = useContext(LoaderContext);

  return (
    <>
      <mesh geometry={getNode("model", "_00Buildings").geometry}>
        <meshNormalMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_01Buildings").geometry}>
        <meshNormalMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_02Buildings").geometry}>
        <meshNormalMaterial flatShading />
      </mesh>

      <axesHelper args={[1000]} />
    </>
  );
};

export default Scene;
