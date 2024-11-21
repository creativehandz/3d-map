import { Clouds, Cloud } from "@react-three/drei";

const CloudGroup = ({ initialAnimationCompleted }) => {
  return (
    <>
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
    </>
  );
};
export default CloudGroup;
