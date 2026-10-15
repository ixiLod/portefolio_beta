export const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    vec3 newPosition = position + normal * sin(uTime + position.x * 10.0) * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);
    float ndv = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.4);

    vec3 liquid = N;
    liquid.x += sin(vWorldPos.y * 5.0 + uTime * 0.9) * 0.05;
    liquid.y += cos(vWorldPos.x * 4.5 - uTime * 0.7) * 0.05;
    liquid = normalize(liquid);

    vec3 glassCore = vec3(0.75, 0.90, 0.95);
    vec3 glassEdge = vec3(0.70, 0.84, 0.86);
    vec3 absorbed = mix(glassCore, glassEdge, fresnel);

    vec3 L1 = normalize(vec3(0.50, 0.85, 0.45));
    vec3 L2 = normalize(vec3(-0.65, 0.30, 0.60));
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);

    float spec = pow(max(dot(liquid, H1), 0.0), 72.0);
    float spec2 = pow(max(dot(liquid, H2), 0.0), 36.0);
    vec3 highlight = vec3(1.0) * spec * 0.70;
    highlight += vec3(0.88, 0.96, 0.95) * spec2 * 0.22;

    float caustic =
      sin(vWorldPos.x * 7.0 + uTime * 1.2) *
      sin(vWorldPos.y * 6.0 - uTime * 0.9) *
      sin(vWorldPos.z * 5.0 + uTime * 0.7);
    caustic = smoothstep(0.40, 0.88, caustic * 0.5 + 0.5);

    vec3 rim = vec3(0.72, 0.90, 0.88) * fresnel * 0.95;

    vec3 color = absorbed * (0.34 + ndv * 0.44);
    color += rim;
    color += highlight;
    color += vec3(0.45, 0.78, 0.74) * caustic * 0.08;

    float alpha = mix(0.64, 0.90, fresnel) + spec * 0.10;
    gl_FragColor = vec4(color, clamp(alpha, 0.58, 0.94));
  }
`;
