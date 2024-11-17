import { Effect } from "postprocessing";
import drawingShader from "src/assets/shaders/drawingShader.glsl?raw";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, forwardRef, useState, useEffect } from "react";

class DrawingEffect extends Effect {
  constructor({
    backgroundColor,
    lineColor,
    sobelThreshold,
    sobelMin,
    sobelMax,
    noiseTexture,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("DrawingEffect", drawingShader, {
      blendFunction,
      uniforms: new Map([
        ["uBackgroundColor", new THREE.Uniform(new THREE.Color(backgroundColor))],
        ["uLineColor", new THREE.Uniform(new THREE.Color(lineColor))],
        ["uSobelThreshold", new THREE.Uniform(sobelThreshold)],
        ["uSobelMin", new THREE.Uniform(sobelMin)],
        ["uSobelMax", new THREE.Uniform(sobelMax)],
        ["uNoise", new THREE.Uniform(noiseTexture)],
        ["uNormalBuffer", new THREE.Uniform(null)],
      ]),
    });
  }

  update(renderer) {
    this.uniforms.get("uNormalBuffer").value = renderer._customNormalTarget.texture;
  }

  updateUniforms(params) {
    this.uniforms.get("uBackgroundColor").value = new THREE.Color(params.backgroundColor);
    this.uniforms.get("uLineColor").value = new THREE.Color(params.lineColor);
    this.uniforms.get("uSobelThreshold").value = params.sobelThreshold;
    this.uniforms.get("uSobelMin").value = params.sobelMin;
    this.uniforms.get("uSobelMax").value = params.sobelMax;
  }
}

export default DrawingEffect;
