import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap/all";

const params = {
  initialPosition: new THREE.Vector3(50, 2400, 300),
  initialTarget: new THREE.Vector3(0, 0, 0),

  viewPosition: new THREE.Vector3(-255, 348, 330),
  viewTarget: new THREE.Vector3(-32, -154, -55),

  limitNX: -960,
  limitPX: 960,
  limitNZ: -640,
  limitPZ: 640,
  limitNY: 12,
};

const CameraControls = ({ entered, zone, setInitialAnimationCompleted }) => {
  const controlsRef = useRef();
  const previousZone = useRef();
  const savedPosition = useRef();
  const savedTarget = useRef();

  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(params.initialPosition);
    camera.lookAt(params.initialTarget);
    controlsRef.current.target = params.initialTarget;
  }, []);

  const animateCamera = (position, target, options = {}) => {
    options.onStart = options.onStart || function () {};
    options.onComplete = options.onComplete || function () {};
    options.duration = options.duration || 1.2;
    options.delay = options.delay || 0;

    let controls = controlsRef.current;

    let p0 = camera.position.clone();
    let t0 = new THREE.Vector3();
    camera.getWorldDirection(t0);
    t0.normalize().multiplyScalar(0.001);

    let p1 = position.clone();
    let t1 = new THREE.Vector3().subVectors(target, position).normalize().multiplyScalar(0.001);

    let tl = gsap.timeline();

    let animation = {
      progress: 0,
    };

    tl.to(animation, {
      progress: 1,
      duration: options.duration,
      delay: options.delay,
      onStart: () => {
        options.onStart();
      },

      onUpdate: () => {
        let p = new THREE.Vector3().lerpVectors(p0, p1, animation.progress);
        camera.position.copy(p);

        let t = new THREE.Vector3()
          .lerpVectors(t0, t1, animation.progress)
          .normalize()
          .multiplyScalar(0.001)
          .add(camera.position);
        camera.lookAt(t);
        controls.target = t;
      },

      onComplete: () => {
        options.onComplete();
      },
    });
  };

  useEffect(() => {
    if (entered) {
      animateCamera(params.viewPosition, params.viewTarget, {
        duration: 3,
        delay: 0.4,
        onComplete: () => {
          controlsRef.current.target = new THREE.Vector3(-32, -154, -55);
          setInitialAnimationCompleted(true);
        },
      });
    }
  }, [entered]);

  // useEffect(() => {
  //   let controls = controlsRef.current;
  //   let initialDirection = new THREE.Vector3().subVectors(
  //     params.controlsTarget,
  //     params.cameraPosition
  //   );

  //   camera.position.copy(params.cameraPosition);
  //   controls.target = params.controlsTarget;

  //   controls.addEventListener("change", () => {
  //     if (!controls.enabled) {
  //       return;
  //     }
  //     camera.position.x = Math.min(params.limitPX, Math.max(params.limitNX, camera.position.x));
  //     camera.position.y = Math.max(params.limitNY, camera.position.y);
  //     camera.position.z = Math.min(params.limitPZ, Math.max(params.limitNZ, camera.position.z));

  //     controls.target.x = Math.min(params.limitPX, Math.max(params.limitNX, controls.target.x));
  //     controls.target.z = Math.min(params.limitPZ, Math.max(params.limitNZ, controls.target.z));
  //   });
  // }, []);

  // const animateCamera = (position, target, zoomOut = false) => {
  //   let controls = controlsRef.current;

  //   let initialPosition = camera.position.clone();
  //   let initialDirection = new THREE.Vector3();
  //   camera.getWorldDirection(initialDirection);
  //   initialDirection.normalize().multiplyScalar(0.001);

  //   let targetPosition = position.clone();
  //   let targetDirection = new THREE.Vector3()
  //     .subVectors(target, position)
  //     .normalize()
  //     .multiplyScalar(0.001);

  //   let tl = gsap.timeline();

  //   let animation = {
  //     progress: 0,
  //   };

  //   tl.to(
  //     animation,
  //     {
  //       progress: 1,
  //       duration: 1.2,
  //       delay: zoomOut ? 0.8 : 0,
  //       onStart: () => {
  //         controls.enabled = false;
  //       },
  //       onUpdate: () => {
  //         let p = new THREE.Vector3().lerpVectors(
  //           initialPosition,
  //           targetPosition,
  //           animation.progress
  //         );
  //         camera.position.copy(p);

  //         let t = new THREE.Vector3()
  //           .lerpVectors(initialDirection, targetDirection, animation.progress)
  //           .normalize()
  //           .multiplyScalar(0.001)
  //           .add(camera.position);
  //         camera.lookAt(t);
  //         controls.target = t;
  //       },
  //       onComplete: () => {
  //         // setTimeout(() => {
  //         // }, 100);
  //         if (zoomOut) {
  //           controls.enabled = true;
  //           controls.target = savedTarget.current;
  //         }
  //       },
  //     },
  //     "<"
  //   );
  // };

  // useEffect(() => {
  //   console.log(entered);
  // }, [entered]);

  // useEffect(() => {
  //   let controls = controlsRef.current;
  //   if (!zone) {
  //     previousZone.current = null;
  //     if (savedPosition.current && savedTarget.current) {
  //       animateCamera(savedPosition.current, savedTarget.current, true);
  //     }
  //     return;
  //   }

  //   if (!previousZone.current) {
  //     savedPosition.current = camera.position.clone();
  //     savedTarget.current = controls.target.clone();
  //   }
  //   animateCamera(zone.camera, zone.target);
  //   previousZone.current = zone.name;
  // }, [zone]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        dampingFactor={0.1}
        // maxPolarAngle={Math.PI * 0.26}
        panSpeed={0.4}
        rotateSpeed={0.4}
        // maxDistance={1000}
        zoomSpeed={0.3}
      />
    </>
  );
};
export default CameraControls;