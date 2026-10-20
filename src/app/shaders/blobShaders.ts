export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uClickSpring;
  uniform float uClickWave;

  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  varying float vDisplacement;

  // --- Bruit Simplex 3D (Ashima Arts) ---
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float getBlobDisplacement(vec3 pos) {
    // Forme organique fixe un peu plus texturée (moins lisse, micro-reliefs naturels)
    vec3 warp = vec3(
      snoise(pos * 1.3 + vec3(uTime * 0.2, 0.0, 0.0)),
      snoise(pos * 1.3 + vec3(0.0, uTime * 0.2, 0.0)),
      snoise(pos * 1.3 + vec3(0.0, 0.0, uTime * 0.2))
    );

    float n = snoise((pos + warp * 0.3) * 1.6 + uTime * 0.25);
    float baseShape = smoothstep(-0.8, 0.8, n) * 0.042;

    // Léger effet au clic uniquement
    vec3 dir = normalize(pos);
    float clickSquash = (1.5 * dir.y * dir.y - 0.5) * uClickSpring * 0.08;
    float clickRipple = sin(length(dir.xy) * 4.0 - uTime * 6.0) * uClickWave * 0.035;

    return baseShape + clickSquash + clickRipple;
  }

  void main() {
    float d = getBlobDisplacement(position);
    vDisplacement = d;

    vec3 newPosition = position + normal * d;

    float eps = 0.03;
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    if (length(tangent) < 0.001) tangent = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
    vec3 bitangent = normalize(cross(normal, tangent));

    vec3 n1 = position + tangent * eps;
    vec3 n2 = position + bitangent * eps;
    vec3 displacedN1 = n1 + normalize(n1) * getBlobDisplacement(n1);
    vec3 displacedN2 = n2 + normalize(n2) * getBlobDisplacement(n2);

    vec3 recomputedNormal = normalize(cross(displacedN1 - newPosition, displacedN2 - newPosition));
    vec3 finalNormal = normalize(mix(normal, recomputedNormal, 0.6));

    vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * finalNormal);
    vNormal = normalize(normalMatrix * finalNormal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uBass;
  uniform float uMids;
  uniform float uClickWave;

  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  varying float vDisplacement;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);
    float ndv = clamp(dot(N, V), 0.0, 1.0);
    float fresnel = pow(1.0 - ndv, 2.4);

    // --- L'AUDIO RÉAGIT SUR LA VITESSE ET L'ÉNERGIE INTERNE ---
    // Vu que uTime accélère avec le son, le flux interne s'anime frénétiquement en cadence sur les basses !
    vec3 liquid = N;
    float internalFlow = 0.075 + uBass * 0.12 + uMids * 0.06 + uClickWave * 0.10;
    liquid.x += sin(vWorldPos.y * 5.0 + uTime * 1.2) * internalFlow;
    liquid.y += cos(vWorldPos.x * 4.5 - uTime * 1.0) * internalFlow;
    liquid.z += sin(vWorldPos.z * 4.0 + uTime * 0.9) * (internalFlow * 0.5);
    liquid = normalize(liquid);

    // Couleurs : s'illuminent franchement au rythme de la musique
    vec3 glassCore = vec3(0.10, 0.15, 0.15);
    vec3 glassEdge = vec3(0.10, 0.84, 0.86);
    float thickness = smoothstep(-0.07, 0.07, vDisplacement);

    float colorMix = clamp(fresnel + (thickness - 0.5) * 0.35 + uBass * 0.35 + uClickWave * 0.20, 0.0, 1.0);
    vec3 absorbed = mix(glassCore, glassEdge, colorMix);

    // Éclairage spéculaire (les reflets brillent et dansent plus vite avec le temps modulé)
    vec3 L1 = normalize(vec3(0.50, 0.85, 0.45));
    vec3 L2 = normalize(vec3(-0.65, 0.30, 0.60));
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);

    float spec = pow(max(dot(liquid, H1), 0.0), 64.0);
    float spec2 = pow(max(dot(liquid, H2), 0.0), 32.0);
    vec3 highlight = vec3(1.0) * spec * (0.80 + uBass * 0.40 + uClickWave * 0.25);
    highlight += vec3(0.88, 0.96, 0.95) * spec2 * (0.30 + uMids * 0.25);

    // Caustiques internes : elles s'accélèrent et pulsent directement avec la vitesse du temps
    float caustic =
      sin(vWorldPos.x * 6.0 + uTime * 1.3 + liquid.x * 2.0) *
      sin(vWorldPos.y * 5.2 - uTime * 1.0 + liquid.y * 2.0) *
      sin(vWorldPos.z * 4.8 + uTime * 0.8);
    caustic = smoothstep(0.35, 0.85, caustic * 0.5 + 0.5);

    float causticIntensity = 0.15 + uBass * 0.30 + uMids * 0.15 + uClickWave * 0.18;

    vec3 rim = vec3(0.72, 0.90, 0.88) * fresnel * (0.95 + uBass * 0.38 + uClickWave * 0.25);

    vec3 color = absorbed * (0.34 + ndv * 0.44);
    color += rim;
    color += highlight;
    color += vec3(0.45, 0.78, 0.74) * caustic * causticIntensity;

    float alpha = mix(0.64, 0.90, fresnel) + spec * 0.12 + uBass * 0.06;
    gl_FragColor = vec4(color, clamp(alpha, 0.58, 0.96));
  }
`;
