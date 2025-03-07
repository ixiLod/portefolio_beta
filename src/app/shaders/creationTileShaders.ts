export const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave = sin(pos.x * uFrequency + uTime) * uAmplitude;
  wave += sin(pos.y * uFrequency * 0.8 + uTime * 1.2) * uAmplitude * 0.6;

  pos.z += wave;
  vPosition = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D uTexture;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  gl_FragColor = textureColor;
}
`;
