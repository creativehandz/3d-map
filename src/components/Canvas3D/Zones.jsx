import { GlobalContext } from "src/contexts/GlobalContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import gsap from "gsap/all";
import * as THREE from "three";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import Zone from "./Zone";

const Zones = () => {
  const { zoneInfo } = useContext(GlobalContext);
  const { assets } = useContext(LoaderContext);

  // Setting zone list

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
      p.x += 100;

      list[zoneName][type] = p;
    });

    let updated = [];

    zoneInfo.current.forEach((zone) => {
      updated.push({ ...zone, ...list[zone.meshName] });
    });

    zoneInfo.current = updated;
  }, []);

  // const { camera, controls, raycaster, pointer, scene } = useThree();
  // const groupRef = useRef();

  // const zoomOut = useCallback(() => {
  //   if (focusedZone) {
  //     return;
  //   }
  //   raycaster.setFromCamera(pointer, camera);
  //   let intersects = raycaster.intersectObjects(groupRef.current.children);
  //   if (intersects.length == 0) {
  //     setFocusedZone(null);
  //     return;
  //   }
  // }, [focusedZone]);

  // useEffect(() => {
  //   window.addEventListener("click", zoomOut);

  //   return () => {
  //     window.removeEventListener("click", zoomOut);
  //   };
  // }, [zoomOut]);

  return (
    <>
      {/* {initialAnimationCompleted && (
        <group ref={groupRef}>
          {Object.entries(zoneList).map(([name, zone]) => {
            return (
              <Zone
                key={name}
                info={zone}
                {...zone}
                focusedZone={focusedZone}
                setFocusedZone={setFocusedZone}
              />
            );
          })}
        </group>
      )} */}
    </>
  );
};
export default Zones;
