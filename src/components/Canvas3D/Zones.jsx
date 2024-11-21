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
  const [list, setList] = useState([]);

  useEffect(() => {
    let list = {};

    let zoneMeshes = assets.gltf.zones.scene;

    zoneMeshes.traverse((node) => {
      if (node.name.slice(-4) == "Zone") {
        list[node.name] = {
          geometry: node.geometry,
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
    setList(updated);
  }, []);

  return (
    <>
      <group>
        {list.map((zone) => {
          return (
            <Zone key={zone.id} id={zone.id} geometry={zone.geometry} position={zone.target} />
          );
        })}
      </group>
    </>
  );
};
export default Zones;
