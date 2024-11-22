uniform sampler2D uNoise;
uniform float uTime;

varying vec2 vUv;


void main() {

  vec3 color = vec3(1.0);

  vec2 uv = vUv;
  uv.x += uTime * 0.01;
  uv.y += sin(uTime * 0.02) * 0.01;

  float noise = texture2D(uNoise, uv).r;
  float alpha = pow(noise, 4.5);

  float offset = 0.25;

  alpha *= smoothstep(0.0, offset, vUv.x);
  alpha *= 1.0 - smoothstep(1.0 - offset, 1.0, vUv.x);

  alpha *= smoothstep(0.0, offset * 2.0, vUv.y);
  alpha *= 1.0 - smoothstep(1.0 - offset * 2.0, 1.0, vUv.y);
  
  alpha *= smoothstep(0.0, 0.2, distance(vUv, vec2(0.5)));

  gl_FragColor = vec4(color, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
