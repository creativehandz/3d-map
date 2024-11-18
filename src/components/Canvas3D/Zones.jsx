import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import gsap from "gsap/all";
import * as THREE from "three";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

const Zones = ({ focusTo }) => {
  const { getNode, assets } = useContext(LoaderContext);

  const groupRef = useRef();
  const [zoneList, setZoneList] = useState({});
  const { camera, controls, raycaster, pointer, scene } = useThree();

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
          name: node.name,
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

    setZoneList(list);
  }, []);

  useEffect(() => {
    window.addEventListener("click", () => {
      raycaster.setFromCamera(pointer, camera);
      let intersects = raycaster.intersectObjects(groupRef.current.children);
      if (intersects.length == 0) {
        focusTo(false);
        return;
      }
    });
  }, []);

  return (
    <group ref={groupRef}>
      {Object.entries(zoneList).map(([name, zone]) => {
        return (
          <mesh
            key={name}
            userData={{ name }}
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
    </group>
  );
};
export default Zones;
