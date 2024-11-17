import { ModeContext } from "src/contexts/ModeContext.jsx";
import { LoaderContext } from "src/contexts/LoaderContext.jsx";
import DrawingEffect from "./DrawingEffect.jsx";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  NormalPass,
  RenderPass,
} from "postprocessing";
import * as THREE from "three";
import { useContext, useEffect, useMemo, useRef } from "react";

const Settings = () => {
  const mode = useContext(ModeContext);
  const { getTexture } = useContext(LoaderContext);

  const params = useControls("Postprocessing", {
    backgroundColor: "#d7e5d7",
    lineColor: "#4a93a0",
    sobelThreshold: {
      value: 0.6,
      min: 0,
      max: 1.0,
      step: 0.01,
    },
    sobelMin: {
      value: 0.1,
      min: 0.001,
      max: 1.0,
      step: 0.001,
    },
    sobelMax: {
      value: 0.4,
      min: 0.001,
      max: 1.0,
      step: 0.001,
    },
  });

  const { gl, scene, camera, size } = useThree();

  const postprocessing = useMemo(() => {
    let composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));

    let normalTarget = new THREE.WebGLRenderTarget(size.width, size.height);
    let normalPass = new NormalPass(scene, camera, {
      renderTarget: normalTarget,
    });
    gl._customNormalTarget = normalTarget;

    let effect = new DrawingEffect({
      ...params,
      noiseTexture: getTexture("noise"),
      blendFunction: BlendFunction.NORMAL,
    });

    composer.addPass(new EffectPass(camera, effect));
    return { composer, normalPass, normalTarget, effect };
  }, [gl, scene, camera]);

  useEffect(() => {
    postprocessing.effect.updateUniforms(params);
  }, [params]);

  useFrame(() => {
    postprocessing.normalPass.render(gl);

    postprocessing.composer.render();
  }, 1);

  return (
    <>
      {mode == "DEV" && <Perf position="top-left" />}

      <OrbitControls />
    </>
  );
};

export default Settings;
