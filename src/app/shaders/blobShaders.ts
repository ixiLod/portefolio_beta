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
    float fresnel = pow(1.0 - ndv, 3.0);

    vec3 glassCore = vec3(0.12, 0.78, 0.72);
    vec3 glassEdge = vec3(0.28, 0.92, 0.86);
    vec3 absorbed = mix(glassCore, glassEdge, fresnel);

    vec3 L = normalize(vec3(0.45, 0.85, 0.55));
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 96.0);
    vec3 highlight = vec3(1.0) * spec * 0.55;

    vec3 L2 = normalize(vec3(-0.6, 0.3, 0.7));
    vec3 H2 = normalize(L2 + V);
    float spec2 = pow(max(dot(N, H2), 0.0), 48.0);
    highlight += vec3(0.90, 0.97, 1.0) * spec2 * 0.22;

    float caustic = sin(vWorldPos.x * 8.0 + uTime * 1.4)
                  * sin(vWorldPos.y * 7.0 - uTime * 1.1)
                  * sin(vWorldPos.z * 6.0 + uTime * 0.8);
    caustic = smoothstep(0.35, 0.85, caustic * 0.5 + 0.5);

    vec3 rim = vec3(0.45, 0.95, 0.90) * fresnel * 0.85;

    vec3 color = absorbed * (0.55 + ndv * 0.50);
    color += rim;
    color += highlight;
    color += vec3(0.20, 0.90, 0.82) * caustic * 0.12;

    float alpha = mix(0.72, 0.92, fresnel) + spec * 0.15;
    gl_FragColor = vec4(color, clamp(alpha, 0.68, 0.96));
  }
`;
