import { Effect } from "postprocessing";
import drawingShader from "src/assets/shaders/drawingShader.glsl?raw";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, forwardRef, useState, useEffect } from "react";

class DrawingEffect extends Effect {
  constructor({ sobelThreshold, sobelMin, sobelMax, blendFunction = BlendFunction.DARKEN }) {
    super("DrawingEffect", drawingShader, {
      blendFunction,
      uniforms: new Map([
        ["uSobelThreshold", new THREE.Uniform(sobelThreshold)],
        ["uSobelMin", new THREE.Uniform(sobelMin)],
        ["uSobelMax", new THREE.Uniform(sobelMax)],
      ]),
    });
  }
}

const Drawing = forwardRef((props, ref) => {
  const effect = useMemo(() => new DrawingEffect(props), [props]);

  return <primitive ref={ref} object={effect} />;
});

export default Drawing;
