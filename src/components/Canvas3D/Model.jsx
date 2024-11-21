import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import * as THREE from "three";
import { useContext } from "react";
import vs from "src/assets/shaders/vs.glsl?raw";
import fs from "src/assets/shaders/fs.glsl?raw";

const Model = () => {
  const { getNode, getTexture } = useContext(LoaderContext);

  return (
    <>
      <mesh geometry={getNode("model", "_00Base").geometry}>
        <shaderMaterial
          vertexShader={vs}
          fragmentShader={fs}
          uniforms={{
            uTexture: { value: getTexture("map") },
          }}
          transparent
        />
      </mesh>

      <mesh geometry={getNode("model", "_00Buildings").geometry}>
        <meshStandardMaterial roughness={0.7} metalness={0.2} flatShading />
      </mesh>

      <mesh geometry={getNode("model", "_00Roads").geometry}>
        <meshStandardMaterial
          roughness={0.7}
          metalness={0.2}
          color={0xcdcdcd}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh geometry={getNode("model", "_00Water").geometry}>
        <meshStandardMaterial
          roughness={0.7}
          metalness={0.2}
          color={0xafbff}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
export default Model;
