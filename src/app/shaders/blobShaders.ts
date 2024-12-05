export const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  void main() {
    vNormal = normal;
    vec3 newPosition = position + normal * sin(uTime + position.x * 10.0) * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;
export const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    vec3 pastelColor1 = vec3(0.0, 0.8, 0.7);
    vec3 pastelColor2 = vec3(0.1, 1.0, 0.5);
    vec3 color = mix(pastelColor1, pastelColor2, (vNormal.y + 0.1) * 0.6);
    float lightIntensity = max(dot(vNormal, vec3(0.0, 0.5, 0.5)), 0.2);
    color *= lightIntensity * 0.6 + 0.6;
    gl_FragColor = vec4(color, 1.0);
  }
`;
