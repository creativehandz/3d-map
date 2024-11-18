import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import gsap from "gsap/all";
import * as THREE from "three";
import { useCallback, useContext, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

const Zones = ({ focusTo }) => {
  const { getNode, assets } = useContext(LoaderContext);

  const [zoneList, setZoneList] = useState({});
  const { camera, controls } = useThree();

  const animateCamera = useCallback(
    (position, target) => {
      if (!controls) {
        return;
      }
      // camera.position.copy(position);
      // // camera.lookAt(target);
      // if (controls) {
      //   controls.target = target;
      // }

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
    },
    [controls]
  );

  useEffect(() => {
    let list = {};

    let zoneMeshes = assets.gltf.zones.scene;

    zoneMeshes.traverse((node) => {
      let material = new THREE.MeshBasicMaterial({
        color: 0x54c786,
        transparent: true,
        opacity: 0,
        depthTest: false,
      });

      let hoverTl = gsap.timeline().reverse().pause();
      hoverTl.to(material, {
        opacity: 0.6,
      });

      if (node.name.slice(-4) == "Zone") {
        list[node.name] = {
          geometry: node.geometry,
          material,
          hoverTl,
          camera: 0,
          target: 0,
        };
      }
    });

    let q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.27);

    zoneMeshes.traverse((node) => {
      let type = node.name.substring(3, node.name.length).toLowerCase();
      if (!(type == "target" || type == "camera")) {
        return;
      }

      let zoneName = node.name.slice(0, 3) + "Zone";
      let p = node.position.clone().applyQuaternion(q);

      list[zoneName][type] = p;
    });

    setZoneList(list);
  }, []);

  return (
    <>
      {Object.entries(zoneList).map(([name, zone]) => {
        return (
          <mesh
            key={name}
            geometry={zone.geometry}
            material={zone.material}
            onPointerEnter={() => {
              document.body.style.cursor = "pointer";
              zone.hoverTl.play();
            }}
            onPointerLeave={() => {
              document.body.style.cursor = "auto";
              zone.hoverTl.reverse();
            }}
            onClick={() => {
              focusTo(zone);
            }}
          ></mesh>
        );
      })}

      {/* {zoneList.map((zone) => {
        return (
          <mesh
            key={zone.name}
            geometry={zone.geometry}
            material={zone.material}
            onPointerEnter={() => {
              document.body.style.cursor = "pointer";
              zone.hoverTl.play();
            }}
            onPointerLeave={() => {
              document.body.style.cursor = "auto";
              zone.hoverTl.reverse();
            }}
          ></mesh>
        );
      })} */}
    </>
  );
};
export default Zones;
