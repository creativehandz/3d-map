import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import gsap from "gsap/all";
import { Html, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCallback, useEffect, useContext, useRef, useState, useMemo } from "react";

const Zone = ({ id, geometry, position }) => {
  const { currentZone, setCurrentZone, started, animating, setShowPopup } =
    useContext(GlobalContext);
  const { getTexture } = useContext(LoaderContext);

  const { controls } = useThree();
  const meshRef = useRef();

  const tlRef = useRef();

  useEffect(() => {
    let tl = gsap.timeline().reverse().pause();

    tl.to(meshRef.current.material, {
      opacity: 0.4,
    });

    tlRef.current = tl;
  }, []);

  const markerRef = useRef();

  useEffect(() => {
    let marker = markerRef.current;
    let p = position.clone();

    marker.position.copy(p);
    // marker.position.applyMatrix4(marker.parent.matrixWorld.clone().invert());
    marker.position.y = 32;

    let markerPosition = position.clone();

    let cameraPosition = new THREE.Vector3(-255, 348, 330);
    cameraPosition.y = markerPosition.y;

    markerRef.current.lookAt(cameraPosition);
  }, []);

  useFrame(({ clock }) => {
    markerRef.current.position.y = 32 + Math.sin(clock.getElapsedTime() * 1.8) * 4;
  });

  const updateRotation = useCallback(() => {
    if (!controls) {
      return;
    }

    let markerPosition = position.clone();

    let cameraPosition = controls.object.position.clone();
    cameraPosition.y = markerPosition.y;

    markerRef.current.lookAt(cameraPosition);
  }, [controls]);

  useEffect(() => {
    // controls.addEventListener("change", updateRotation);

    // () => {
    //   return controls.removeEventListener("change", updateRotation);
    // };

    setTimeout(() => {
      setInterval(() => {
        updateRotation();
      }, 1000 / 120);
    }, 500);
  }, [controls]);

  useEffect(() => {
    if (!tlRef.current) {
      return;
    }

    if (currentZone == id) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [currentZone]);

  const onPointerEnter = useCallback(() => {
    if (!started) {
      return;
    }

    document.body.style.cursor = "pointer";
    if (currentZone != id) {
      tlRef.current.play();
    }
  }, [started, currentZone]);

  const onPointerLeave = useCallback(() => {
    if (!started) {
      return;
    }

    document.body.style.cursor = "auto";
    if (currentZone != id) {
      tlRef.current.reverse();
    }
  }, [started, currentZone]);

  const onClick = useCallback(() => {
    if (!started || animating.current) {
      return;
    }

    setCurrentZone(id);
    setShowPopup(true);
  }, [started]);

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        renderOrder={10}
      >
        <meshBasicMaterial
          color={0x64dc96}
          transparent
          opacity={0}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={markerRef} renderOrder={20}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color={0x64dc96}
          alphaMap={getTexture("marker")}
          transparent
          depthTest={false}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
export default Zone;

{
  /* <mesh
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
      </group> */
}
