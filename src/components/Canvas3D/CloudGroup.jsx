import vs from "src/assets/shaders/cloudsVs.glsl?raw";
import fs from "src/assets/shaders/cloudsFs.glsl?raw";
import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import { Clouds, Cloud } from "@react-three/drei";
import { useContext, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const CloudGroup = () => {
  const { started } = useContext(GlobalContext);
  const { getTexture } = useContext(LoaderContext);

  const uniforms = useRef({
    uNoise: { value: getTexture("noise") },
    uTime: { value: 0 },
  });

  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.getElapsedTime();
  });

  return (
    <>
      {!started && (
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
                  volume={900}
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

      <mesh rotation-x={-Math.PI * 0.5} position={[300, 70, 0]} renderOrder={100}>
        <planeGeometry args={[6000, 6000]} />
        <shaderMaterial
          vertexShader={vs}
          fragmentShader={fs}
          uniforms={uniforms.current}
          transparent
          depthTest={false}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
export default CloudGroup;
