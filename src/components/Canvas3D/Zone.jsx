import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import gsap from "gsap/all";
import { Html, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCallback, useEffect, useContext, useRef, useState } from "react";

const Zone = ({ id, geometry }) => {
  const { zoneInfo, setCurrentZone, started, animating } = useContext(GlobalContext);

  useEffect(() => {
    // console.log(id, geometry);
  }, []);

  // const meshRef = useRef();
  // const indicatorRef = useRef();
  // const textRef = useRef();
  // const lineRef = useRef();

  // // Setting indicator's world coordinates
  // useEffect(() => {
  //   let indicator = indicatorRef.current;
  //   let p = target.clone();

  //   indicator.position.copy(p);
  //   indicator.position.applyMatrix4(indicator.parent.matrixWorld.clone().invert());
  //   indicator.position.y = 40;
  // }, []);

  // // Timelines
  // const hoverTl = useRef();

  // useEffect(() => {
  //   let material = meshRef.current.material;

  //   let hTl = gsap.timeline().pause().reverse();
  //   hoverTl.current = hTl;
  //   let duration = 0.6;

  //   hTl.fromTo(
  //     material,
  //     { opacity: 0 },
  //     {
  //       opacity: 0.4,
  //       duration,
  //     }
  //   );

  //   hTl.to(
  //     textRef.current.material,
  //     {
  //       opacity: 1,
  //       duration,
  //     },
  //     "<"
  //   );

  //   hTl.from(
  //     textRef.current.position,
  //     {
  //       y: 40,
  //       duration,
  //     },
  //     "<"
  //   );

  //   hTl.to(
  //     lineRef.current.scale,
  //     {
  //       y: 1,
  //       duration,
  //     },
  //     "<"
  //   );
  // }, []);

  // // Event handlers
  // const [status, setStatus] = useState("default");

  const onPointerEnter = useCallback(() => {
    if (!started) {
      return;
    }

    document.body.style.cursor = "pointer";
  }, [started]);

  const onPointerLeave = useCallback(() => {
    if (!started) {
      return;
    }

    document.body.style.cursor = "auto";
  }, [started]);

  const onClick = useCallback(() => {
    if (!started || animating.current) {
      return;
    }

    setCurrentZone(id);
  }, [started]);

  // useEffect(() => {
  //   switch (status) {
  //     case "default":
  //       hoverTl.current.reverse();
  //       break;

  //     case "hovered":
  //       hoverTl.current.play();
  //       break;
  //   }
  // }, [status]);

  // // Updating rotation
  // const { controls } = useThree();

  // useEffect(() => {
  //   let update = () => {
  //     let indicatorPosition = target.clone();

  //     let cameraPosition = controls.object.position.clone();
  //     cameraPosition.y = indicatorPosition.y;

  //     indicatorRef.current.lookAt(cameraPosition);
  //   };

  //   update();

  //   controls.addEventListener("change", update);

  //   return () => {
  //     controls.removeEventListener("change", update);
  //   };
  // }, [controls]);

  return (
    <>
      {/* <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        renderOrder={4}
      >
        <meshBasicMaterial
          color={0xddffdd}
          depthWrite={false}
          depthTest={false}
          transparent
          opacity={0}
        />
      </mesh>

      <group ref={indicatorRef}>
        <Text ref={textRef} fontSize={30} textAlign="center" position-y={20} renderOrder={5}>
          ZoneName
          <meshBasicMaterial
            depthWrite={false}
            depthTest={false}
            side={THREE.DoubleSide}
            transparent
            opacity={0}
          />
        </Text>

        <mesh ref={lineRef} position-y={-18} scale-y={0} renderOrder={5}>
          <boxGeometry args={[1, 36, 1]} />
          <meshBasicMaterial transparent depthTest={false} />
        </mesh>
      </group> */}

      <mesh
        geometry={geometry}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
      >
        <meshBasicMaterial transparent opacity={0.2} depthTest={false} />
      </mesh>
    </>
  );
};
export default Zone;
