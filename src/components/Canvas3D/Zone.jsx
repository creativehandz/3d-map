import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/all";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const zoneNames = {
  _00Zone: "GrowTopia",
  _01Zone: "Exponent",
  _02Zone: "StepWest",
  _03Zone: "StepEast",
  _04Zone: "Exclaim",
  _05Zone: "Ampersand",
  _06Zone: "Tilde",
  _07Zone: "Hash",
  _08Zone: "Asterisk",
};

const Zone = ({ name, geometry, target, info, focusedZone, setFocusedZone }) => {
  const meshRef = useRef();
  const indicatorRef = useRef();
  const textRef = useRef();
  const lineRef = useRef();

  // Setting indicator's world coordinates
  useEffect(() => {
    let indicator = indicatorRef.current;
    let p = target.clone();

    indicator.position.copy(p);
    indicator.position.applyMatrix4(indicator.parent.matrixWorld.clone().invert());
    indicator.position.y = 40;
  }, []);

  // Timelines
  const hoverTl = useRef();

  useEffect(() => {
    let material = meshRef.current.material;

    let hTl = gsap.timeline().pause().reverse();
    hoverTl.current = hTl;
    let duration = 0.6;

    hTl.fromTo(
      material,
      { opacity: 0 },
      {
        opacity: 0.4,
        duration,
      }
    );

    hTl.to(
      textRef.current.material,
      {
        opacity: 1,
        duration,
      },
      "<"
    );

    hTl.from(
      textRef.current.position,
      {
        y: 40,
        duration,
      },
      "<"
    );

    hTl.to(
      lineRef.current.scale,
      {
        y: 1,
        duration,
      },
      "<"
    );
  }, []);

  // Event handlers
  const [status, setStatus] = useState("default");

  const onPointerEnter = useCallback(() => {
    if (focusedZone) {
      return;
    }

    document.body.style.cursor = "pointer";
    setStatus("hovered");
  }, [focusedZone]);

  const onPointerLeave = useCallback(() => {
    if (focusedZone) {
      return;
    }

    document.body.style.cursor = "auto";
    setStatus("default");
  }, [focusedZone]);

  const onClick = useCallback(() => {
    if (focusedZone) {
      return;
    }

    hoverTl.current.reverse();
    setFocusedZone(info);
  }, [focusedZone]);

  useEffect(() => {
    switch (status) {
      case "default":
        hoverTl.current.reverse();
        break;

      case "hovered":
        hoverTl.current.play();
        break;
    }
  }, [status]);

  // Updating rotation
  const { controls } = useThree();

  useEffect(() => {
    let update = () => {
      let indicatorPosition = target.clone();

      let cameraPosition = controls.object.position.clone();
      cameraPosition.y = indicatorPosition.y;

      indicatorRef.current.lookAt(cameraPosition);
    };

    update();

    controls.addEventListener("change", update);

    return () => {
      controls.removeEventListener("change", update);
    };
  }, [controls]);

  return (
    <>
      <mesh
        ref={meshRef}
        userData={{ name }}
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
          {zoneNames[name]}
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
      </group>
    </>
  );
};
export default Zone;
