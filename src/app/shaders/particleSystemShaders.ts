export const vertexShader = `
    varying vec3 vColor;
    attribute vec3 color;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = 2.5;
    }
  `;

export const fragmentShader = `
    varying vec3 vColor;

    void main() {
      float brightness = 0.5 + 0.5 * sin(gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1);
      gl_FragColor = vec4(1.0, 1.0, 1.0, brightness);
    }
  `;
