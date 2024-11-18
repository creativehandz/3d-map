uniform sampler2D uTexture;

varying vec2 vUv;

void main() {

  vec3 color = texture2D(uTexture, vUv).rgb;

  float offset = 0.15;
  // float alpha = smoothstep(1.0 - offset, 1.0, vUv.x);
  float alpha = smoothstep(0.0, offset, vUv.x);
  alpha *= 1.0 - smoothstep(1.0 - offset, 1.0, vUv.x);
  alpha *= smoothstep(0.0, offset, vUv.y);
  alpha *= 1.0 - smoothstep(1.0 - offset, 1.0, vUv.y);


  gl_FragColor = vec4(color, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
