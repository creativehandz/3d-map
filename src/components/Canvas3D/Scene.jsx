import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import * as THREE from "three";
import { useContext } from "react";
import Zones from "./Zones.jsx";
import vs from "src/assets/shaders/vs.glsl?raw";
import fs from "src/assets/shaders/fs.glsl?raw";
import { Cloud, Clouds } from "@react-three/drei";

const Scene = ({ initialAnimationCompleted, focusedZone, setFocusedZone }) => {
  const { getNode, getTexture } = useContext(LoaderContext);

  return (
    <>
      <group rotation-y={Math.PI * 0.27} position-x={100}>
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

        {/* <mesh geometry={getNode("model", "_00GreenMed").geometry}>
        <meshPhongMaterial color={0xddffdd} flatShading side={THREE.DoubleSide} />
      </mesh> */}

        <directionalLight position={[1, 1, 1]} intensity={1.2} />
        <hemisphereLight groundColor={0xffdfcf} color={0xddddff} />
        <ambientLight intensity={2.4} />

        <Zones
          initialAnimationCompleted={initialAnimationCompleted}
          focusedZone={focusedZone}
          setFocusedZone={setFocusedZone}
        />

        {!initialAnimationCompleted && (
          <Clouds renderOrder={5}>
            {Array(16)
              .fill(1)
              .map((i, index) => {
                return (
                  <Cloud
                    key={index}
                    segments={6}
                    bounds={[400, 200, 400]}
                    scale={[2, 2, 2]}
                    volume={1000}
                    position={[
                      (Math.random() - 0.5) * 500,
                      1500 + (Math.random() - 0.5) * 300,
                      (Math.random() - 0.5) * 500,
                    ]}
                  />
                );
              })}
          </Clouds>
        )}
      </group>

      {/* <axesHelper args={[1000]} position-y={4} /> */}
    </>
  );
};

export default Scene;
