float getValue(int x, int y) {
    float noiseValue = noise(gl_FragCoord.xy);
    noiseValue = noiseValue * 2.0 - 1.0;
    noiseValue *= 10.0;

    return diffuseValue(x, y) + normalValue(x, y) * noiseValue;
}

float normalValue(int x, int y) {
    float cutoff = 50.0;
    float offset = 0.5 / cutoff;
    float noiseValue = clamp(texture(uTexture, vUv).r, 0.0, cutoff) / cutoff - offset;

    return valueAtPoint(uNormals, vUv + noiseValue, vec2(1.0 / uResolution.x, 1.0 / uResolution.y), vec2(x, y)) * 0.3;
}
