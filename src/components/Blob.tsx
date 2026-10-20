'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Mesh, ShaderMaterial } from 'three';
import { vertexShader, fragmentShader } from '@/app/shaders/blobShaders';

interface BlobProps {
  onClick: () => void;
  analyser: AnalyserNode | null;
  isAudioReactive: boolean;
}

const Blob = ({ onClick, analyser, isAudioReactive }: BlobProps) => {
  const meshRef = useRef<Mesh>(null!);
  const initialPositions = useRef<Float32Array | null>(null);
  const freqData = useRef(new Uint8Array(128));
  const [amplitude, setAmplitude] = useState(0.02);
  const [frequency, setFrequency] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isAnimating) {
      interval = setInterval(() => {
        setAmplitude((prev) => prev + (0.02 - prev) * 0.1);
        setFrequency((prev) => prev + (4 - prev) * 0.1);
      }, 16);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating]);

  const prevBassStrength = useRef(0);
  const prevMidStrength = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as ShaderMaterial;
    if (material.uniforms?.uTime) {
      if (material.uniforms.uTime.value === 0) {
        material.uniforms.uTime.value = 10;
      }

      material.uniforms.uTime.value += delta * 0.9;
    }

    const geometry = meshRef.current.geometry;
    const positionArray = geometry.attributes.position.array as Float32Array;

    if (!initialPositions.current) {
      initialPositions.current = new Float32Array(positionArray);
    }

    let dynamicAmplitude = amplitude;
    let dynamicFrequency = frequency;

    if (isAudioReactive && analyser) {
      if (freqData.current.length !== analyser.frequencyBinCount) {
        freqData.current = new Uint8Array(analyser.frequencyBinCount);
      }

      analyser.getByteFrequencyData(freqData.current);
      const dataArray = freqData.current;

      const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const mids = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 40;

      const smoothedBass = prevBassStrength.current * 0.9 + bass * 0.1;
      const smoothedMids = prevMidStrength.current * 0.9 + mids * 0.1;

      prevBassStrength.current = smoothedBass;
      prevMidStrength.current = smoothedMids;

      dynamicAmplitude += smoothedBass * 0.0003;
      dynamicFrequency += smoothedMids * 0.001;
    }

    const time = material.uniforms.uTime.value;

    for (let i = 0; i < positionArray.length; i += 3) {
      const x = initialPositions.current[i];
      const y = initialPositions.current[i + 1];
      const z = initialPositions.current[i + 2];
      const len = Math.sqrt(x * x + y * y + z * z) || 1;

      const offset =
        Math.sin(time * dynamicFrequency + x * 3) * dynamicAmplitude * 0.5 +
        Math.sin(time * dynamicFrequency + y * 3) * dynamicAmplitude * 0.5 +
        Math.sin(time * dynamicFrequency + z * 3) * dynamicAmplitude * 0.5;

      positionArray[i] = x + (x / len) * offset;
      positionArray[i + 1] = y + (y / len) * offset;
      positionArray[i + 2] = z + (z / len) * offset;
    }

    geometry.attributes.position.needsUpdate = true;
  });

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAmplitude(0.08);
    setFrequency(5);
    setTimeout(() => {
      setAmplitude(0.02);
      setFrequency(4);
      setIsAnimating(false);
    }, 350);

    onClick();
  };

  return (
    <Sphere
      args={[0.5, 64, 64]}
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
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        wireframe={false}
      />
    </Sphere>
  );
};

export default Blob;
