import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import * as THREE from "three";
import { useContext } from "react";

const Scene = () => {
  const { getNode, getTexture } = useContext(LoaderContext);

  return (
    <>
      <mesh geometry={getNode("model", "_00Base").geometry}>
        <meshBasicMaterial transparent opacity={0.9} map={getTexture("map")} />
      </mesh>

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
        <meshPhongMaterial color={0xcdcdcd} flatShading side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={getNode("model", "_00HardSurface").geometry}>
        <meshPhongMaterial color={0xc0c0c0} flatShading side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={getNode("model", "_00Water").geometry}>
        <meshPhongMaterial color={0xafbff} flatShading side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={getNode("model", "_00GreenMed").geometry}>
        <meshPhongMaterial color={0xddffdd} flatShading side={THREE.DoubleSide} />
      </mesh>

      <directionalLight position={[1, 1, 1]} intensity={1.2} />
      <hemisphereLight groundColor={0xffdfcf} color={0xddddff} />
      <ambientLight intensity={1.4} />

      <axesHelper args={[1000]} />
    </>
  );
};

export default Scene;
