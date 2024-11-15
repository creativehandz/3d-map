import vs from "src/assets/shaders/vs.glsl?raw";
import fs from "src/assets/shaders/fs.glsl?raw";

const Scene = () => {
  return (
    <>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial vertexShader={vs} fragmentShader={fs} />
      </mesh>
    </>
  );
};

export default Scene;
