'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import { Mesh, ShaderMaterial, MathUtils } from 'three';
import { vertexShader, fragmentShader } from '@/app/shaders/blobShaders';

interface BlobProps {
  onClick: () => void;
  analyser: AnalyserNode | null;
  isAudioReactive: boolean;
}

const BASE_AMPLITUDE = 0.05; // Léger relief organique constant
const BASE_FREQUENCY = 1.6; // Fréquence légèrement plus riche (moins lisse)

const Blob = ({ onClick, analyser, isAudioReactive }: BlobProps) => {
  const meshRef = useRef<Mesh>(null!);
  const materialRef = useRef<ShaderMaterial>(null!);
  const freqData = useRef<Uint8Array | null>(null);

  const state = useRef({
    smoothBass: 0,
    smoothMids: 0,
    timeAcc: 0, // Compteur de temps modulé par l'audio
    clickPos: 0,
    clickVel: 0,
    clickWave: 0,
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 10 },
      uBass: { value: 0 },
      uMids: { value: 0 },
      uClickSpring: { value: 0 },
      uClickWave: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    const dt = Math.min(delta, 0.05);
    const s = state.current;

    let rawBass = 0;
    let rawMids = 0;

    if (isAudioReactive && analyser) {
      if (!freqData.current || freqData.current.length !== analyser.frequencyBinCount) {
        freqData.current = new Uint8Array(analyser.frequencyBinCount);
      }
      analyser.getByteFrequencyData(freqData.current);

      let bassSum = 0;
      for (let i = 0; i < 10; i++) bassSum += freqData.current[i];
      rawBass = bassSum / 10 / 255;

      let midsSum = 0;
      for (let i = 10; i < 45; i++) midsSum += freqData.current[i];
      rawMids = midsSum / 35 / 255;
    }

    // Lissage ultra-propre (EMA) pour éviter toute saccade sur les vitesses
    const targetBass = Math.min(1.0, Math.pow(rawBass, 1.3) * 1.5);
    const targetMids = Math.min(1.0, Math.pow(rawMids, 1.2) * 1.4);

    const bassRate = targetBass > s.smoothBass ? 20 : 5;
    const midsRate = targetMids > s.smoothMids ? 15 : 5;

    s.smoothBass = MathUtils.lerp(s.smoothBass, targetBass, 1 - Math.exp(-bassRate * dt));
    s.smoothMids = MathUtils.lerp(s.smoothMids, targetMids, 1 - Math.exp(-midsRate * dt));

    // Physique du clic (rebond souple)
    const stiffness = 60;
    const damping = 5.0;
    const springForce = -stiffness * s.clickPos - damping * s.clickVel;
    s.clickVel += springForce * dt;
    s.clickPos += s.clickVel * dt;
    s.clickWave = MathUtils.lerp(s.clickWave, 0, 1 - Math.exp(-2.5 * dt));

    const u = materialRef.current.uniforms;

    // --- LE CŒUR DE L'IDÉE : La vitesse du temps réagit au son ---
    // Au repos, le temps avance paisiblement (0.55). Quand la musique tape, la vitesse s'accélère en cadence (jusqu'à x2.5).
    const speedMultiplier = 0.55 + s.smoothBass * 1.4 + s.smoothMids * 0.55 + s.clickWave * 1.2;
    s.timeAcc += dt * speedMultiplier;
    u.uTime.value = s.timeAcc;

    u.uBass.value = s.smoothBass;
    u.uMids.value = s.smoothMids;
    u.uClickSpring.value = s.clickPos;
    u.uClickWave.value = s.clickWave;
  });

  const handleClick = () => {
    state.current.clickVel = 3.0;
    state.current.clickPos = 0.28;
    state.current.clickWave = 1.0;
    onClick();
  };

  return (
    <Icosahedron
      args={[0.5, 64]}
      ref={meshRef}
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      <shaderMaterial
        ref={materialRef}
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </Icosahedron>
  );
};

export default Blob;
