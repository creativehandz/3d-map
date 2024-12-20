import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <Environment preset="forest" />

      <directionalLight position={[1, 1, 1]} intensity={1.2} />
      <hemisphereLight groundColor={0xffdfcf} color={0xddddff} />
      <ambientLight intensity={2.4} />
    </>
  );
};
export default Lights;
