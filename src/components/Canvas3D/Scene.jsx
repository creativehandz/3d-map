import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { useContext } from "react";

const Scene = () => {
  const { getNode } = useContext(LoaderContext);

  return (
    <>
      <mesh geometry={getNode("model", "_00Buildings").geometry}>
        <meshPhongMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_01Buildings").geometry}>
        <meshPhongMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_02Buildings").geometry}>
        <meshPhongMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_03Buildings").geometry}>
        <meshPhongMaterial flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_00Roads").geometry}>
        <meshPhongMaterial color={0xcdcdcd} flatShading />
      </mesh>

      <directionalLight position={[1, 1, 1]} />
      <hemisphereLight groundColor={0xffdfcf} color={0xddddff} />
      <ambientLight intensity={0.4} />

      <axesHelper args={[1000]} />
    </>
  );
};

export default Scene;
