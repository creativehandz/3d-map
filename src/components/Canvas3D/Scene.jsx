import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import * as THREE from "three";
import { useContext } from "react";
import Zones from "./Zones.jsx";

const Scene = ({ focusTo }) => {
  const { getNode, getTexture } = useContext(LoaderContext);

  return (
    <>
      <group rotation-y={Math.PI * 0.27} position-x={100}>
        <mesh geometry={getNode("model", "_00Base").geometry}>
          <meshBasicMaterial map={getTexture("map")} />
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

        {/* <mesh geometry={getNode("model", "_00GreenMed").geometry}>
        <meshPhongMaterial color={0xddffdd} flatShading side={THREE.DoubleSide} />
      </mesh> */}

        <directionalLight position={[1, 1, 1]} intensity={1.2} />
        <hemisphereLight groundColor={0xffdfcf} color={0xddddff} />
        <ambientLight intensity={2.4} />

        <Zones focusTo={focusTo} />
      </group>

      <axesHelper args={[1000]} position-y={4} />
    </>
  );
};

export default Scene;
