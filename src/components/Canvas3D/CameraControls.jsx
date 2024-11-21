import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useContext, useEffect, useRef, useCallback } from "react";
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

const CameraControls = () => {
  const { zoneInfo, currentZone } = useContext(GlobalContext);

  const controlsRef = useRef();
  // const previousZone = useRef();
  // const savedPosition = useRef();
  // const savedTarget = useRef();

  const { camera } = useThree();

  const animateCamera = (to, view, options = {}) => {
    options.onStart = options.onStart || function () {};
    options.onComplete = options.onComplete || function () {};
    options.duration = options.duration || 1.2;
    options.delay = options.delay || 0.4;

    let controls = controlsRef.current;

    let p0 = camera.position.clone();
    let v0 = new THREE.Vector3();
    camera.getWorldDirection(v0);
    v0.normalize().multiplyScalar(0.001);

    let p1 = to.clone();
    let v1 = new THREE.Vector3().subVectors(view, to).normalize().multiplyScalar(0.001);

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

        let v = new THREE.Vector3()
          .lerpVectors(v0, v1, animation.progress)
          .normalize()
          .multiplyScalar(0.001)
          .add(camera.position);
        camera.lookAt(v);
        controls.target = v;
      },

      onComplete: () => {
        options.onComplete();
      },
    });
  };

  useEffect(() => {
    camera.position.copy(params.initialPosition);
    camera.lookAt(params.initialTarget);
    controlsRef.current.target = params.initialTarget;

    animateCamera(params.viewPosition, params.viewTarget, {
      delay: 0.4,
      duration: 5,
      onComplete: () => {
        controlsRef.current.target = params.viewTarget;
      },
    });
  }, []);

  useEffect(() => {
    if (currentZone == null) {
      return;
    }

    let controls = controlsRef.current;
    let zone = zoneInfo.current[currentZone];

    animateCamera(zone.camera, zone.target, {
      delay: 0.2,

      onStart: () => {
        controls.enabled = false;
      },

      onComplete: () => {
        controls.enabled = true;
      },
    });
  }, [currentZone]);

  // useEffect(() => {
  //   if (entered) {
  //     animateCamera(params.viewPosition, params.viewTarget, {
  //       duration: 5,
  //       delay: 0.4,
  //       onComplete: () => {
  //         controlsRef.current.target = new THREE.Vector3(-32, -154, -55);
  //         controlsRef.current.maxDistance = 1000;
  //         controlsRef.current.maxPolarAngle = Math.PI * 0.4;
  //         setTimeout(() => {
  //           setInitialAnimationCompleted(true);
  //         }, 200);
  //       },
  //     });
  //   }
  // }, [entered]);

  // useEffect(() => {
  //   let controls = controlsRef.current;

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

  // useEffect(() => {
  //   let controls = controlsRef.current;
  //   if (!focusedZone) {
  //     previousZone.current = null;
  //     if (savedPosition.current && savedTarget.current) {
  //       animateCamera(savedPosition.current, savedTarget.current, {
  //         onComplete: () => {
  //           controls.enabled = true;
  //           controls.target = savedTarget.current;
  //         },
  //       });
  //     }
  //     return;
  //   }

  //   if (!previousZone.current) {
  //     savedPosition.current = camera.position.clone();
  //     savedTarget.current = controls.target.clone();
  //   }
  //   animateCamera(focusedZone.camera, focusedZone.target);
  //   previousZone.current = focusedZone.name;
  // }, [focusedZone]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        dampingFactor={0.1}
        // maxPolarAngle={Math.PI * 0.26}
        panSpeed={0.4}
        rotateSpeed={0.4}
        zoomSpeed={0.3}
      />
    </>
  );
};

export default CameraControls;
