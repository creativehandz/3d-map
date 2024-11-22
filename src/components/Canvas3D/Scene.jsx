import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import * as THREE from "three";
import { useContext } from "react";
import Zones from "./Zones.jsx";
import Model from "./Model.jsx";
import CloudGroup from "./CloudGroup.jsx";
import Lights from "./Lights.jsx";

const Scene = () => {
  return (
    <>
      <group>
        <Model />

        <CloudGroup />

        <Lights />

        <Zones />
      </group>
    </>
  );
};

export default Scene;
