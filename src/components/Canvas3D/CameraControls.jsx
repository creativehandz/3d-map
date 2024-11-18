import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap/all";

const params = {
  cameraPosition: new THREE.Vector3(-255, 348, 330),
  controlsTarget: new THREE.Vector3(-32, -154, -55),
  limitNX: -720,
  limitPX: 720,
  limitNZ: -480,
  limitPZ: 480,
  limitNY: 12,
};

const CameraControls = ({ zone }) => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    let controls = controlsRef.current;
    let initialDirection = new THREE.Vector3().subVectors(
      params.controlsTarget,
      params.cameraPosition
    );

    camera.position.copy(params.cameraPosition);
    controls.target = params.controlsTarget;

    // window.addEventListener("click", () => {
    //   console.log("camera: ", camera.position);
    //   console.log("target: ", controls.target);
    // });

    controls.addEventListener("change", () => {
      camera.position.x = Math.min(params.limitPX, Math.max(params.limitNX, camera.position.x));
      camera.position.y = Math.max(params.limitNY, camera.position.y);
      camera.position.z = Math.min(params.limitPZ, Math.max(params.limitNZ, camera.position.z));
    });
  }, []);

  const animateCamera = (position, target) => {
    let controls = controlsRef.current;

    let initialPosition = camera.position.clone();
    let initialDirection = new THREE.Vector3();
    camera.getWorldDirection(initialDirection);
    initialDirection.normalize().multiplyScalar(0.001);

    let targetPosition = position.clone();
    let targetDirection = new THREE.Vector3()
      .subVectors(target, position)
      .normalize()
      .multiplyScalar(0.001);

    let tl = gsap.timeline();

    let animation = {
      progress: 0,
    };

    tl.to(
      animation,
      {
        progress: 1,
        duration: 1.2,
        onStart: () => {
          controls.enabled = false;
        },
        onUpdate: () => {
          let p = new THREE.Vector3().lerpVectors(
            initialPosition,
            targetPosition,
            animation.progress
          );
          camera.position.copy(p);

          let t = new THREE.Vector3()
            .lerpVectors(initialDirection, targetDirection, animation.progress)
            .normalize()
            .multiplyScalar(0.001)
            .add(camera.position);
          camera.lookAt(t);
          controls.target = t;
        },
        onComplete: () => {
          controls.enabled = true;
        },
      },
      "<"
    );
  };

  useEffect(() => {
    if (!zone) {
      return;
    }

    animateCamera(zone.camera, zone.target);
  }, [zone]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        dampingFactor={0.1}
        maxPolarAngle={Math.PI * 0.4}
        panSpeed={0.4}
        rotateSpeed={0.4}
      />
    </>
  );
};
export default CameraControls;
