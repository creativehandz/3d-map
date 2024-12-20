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

  // viewPosition: new THREE.Vector3(0, 1800, 0),
  // viewTarget: new THREE.Vector3(-32, -154, -55),

  limitNX: -960,
  limitPX: 960,
  limitNZ: -640,
  limitPZ: 640,
  limitNY: 12,
};

const CameraControls = () => {
  const {
    zoneInfo,
    currentZone,
    setCurrentZone,
    setStarted,
    animating,
    showPopup,
    setShowPopup,
  } = useContext(GlobalContext);

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

    options.delay == p1.distanceTo(p0) < 10 ? 0 : options.duration;
    options.duration == p1.distanceTo(p0) < 10 ? 0.1 : options.duration;

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
        controls.target = view;
        options.onComplete();
      },
    });
  };

  useEffect(() => {
    let controls = controlsRef.current;

    camera.position.copy(params.initialPosition);
    camera.lookAt(params.initialTarget);
    controls.target = params.initialTarget;

    let addListeners = () => {
      controls.addEventListener("change", () => {
        if (!controls.enabled) {
          return;
        }

        camera.position.x = Math.min(
          params.limitPX,
          Math.max(params.limitNX, camera.position.x)
        );
        camera.position.y = Math.max(params.limitNY, camera.position.y);
        camera.position.z = Math.min(
          params.limitPZ,
          Math.max(params.limitNZ, camera.position.z)
        );

        controls.target.x = Math.min(
          params.limitPX,
          Math.max(params.limitNX, controls.target.x)
        );
        controls.target.z = Math.min(
          params.limitPZ,
          Math.max(params.limitNZ, controls.target.z)
        );
      });
    };

    animateCamera(params.viewPosition, params.viewTarget, {
      delay: 0.4,
      duration: 5,

      onStart: () => {
        controls.enabled = false;
      },

      onComplete: () => {
        controls.enabled = true;
        controls.target = params.viewTarget;
        controls.maxPolarAngle = Math.PI * 0.36;
        controls.maxDistance = 1200;
        addListeners();
        setStarted(true);
      },
    });
  }, []);

  useEffect(() => {
    let controls = controlsRef.current;

    if (currentZone == null) {
      return;
    }

    if (currentZone == -1) {
      animateCamera(params.viewPosition, params.viewTarget, {
        delay: 0.2,

        onStart: () => {
          animating.current = true;
          controls.enabled = false;
        },

        onComplete: () => {
          animating.current = false;
          controls.enabled = true;
        },
      });

      return;
    }

    let zone = zoneInfo.current[currentZone];

    animateCamera(zone.camera, zone.target, {
      delay: 0.2,

      onStart: () => {
        animating.current = true;
        controls.enabled = false;
      },

      onComplete: () => {
        animating.current = false;
        controls.enabled = true;
      },
    });
  }, [currentZone]);

  useEffect(() => {
    let i = -1;
    let countdown = 7000;
    let timer;

    function startCounter() {
      clearInterval(timer);

      timer = setInterval(() => {
        if (!showPopup) {
          if (i <= 7) {
            i++;
          } else {
            i = -1;
          }

          setCurrentZone(i);
          setShowPopup(false);
        }
      }, countdown);
    }

    const handleClick = () => {
      if (!showPopup) {
        startCounter();
      }
    };

    document.addEventListener("click", handleClick);

    // Start the counter after 5 seconds
    const initialTimeout = setTimeout(() => {
      if (!showPopup) {
        startCounter();
      }
    }, 7000);

    // Cleanup on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(initialTimeout);
      document.removeEventListener("click", handleClick);
    };
  }, [showPopup]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        dampingFactor={0.1}
        panSpeed={0.4}
        rotateSpeed={0.4}
        zoomSpeed={0.3}
      />
    </>
  );
};

export default CameraControls;
