'use client';

import { useRef, useEffect, useState } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/app/shaders/blobShaders';

interface BlobProps {
  onClick: () => void;
  analyser: AnalyserNode | null;
  isAudioReactive: boolean;
}

const Blob = ({ onClick, analyser, isAudioReactive }: BlobProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPositions = useRef<Float32Array | null>(null);
  const [amplitude, setAmplitude] = useState(0.02);
  const [frequency, setFrequency] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setAmplitude((prev) => prev + (0.02 - prev) * 0.1);
        setFrequency((prev) => prev + (4 - prev) * 0.1);
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const prevBassStrength = useRef(0);
  const prevMidStrength = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (material.uniforms) {
      if (material.uniforms.uTime.value === 0) {
        material.uniforms.uTime.value = 10;
      }

      const speed = 0.9;
      material.uniforms.uTime.value += delta * speed;

      if (material.uniforms.uTime.value >= 60) {
        material.uniforms.uTime.value = 10;
      }
    }

    const geometry = meshRef.current.geometry;
    const positionArray = geometry.attributes.position.array as Float32Array;

    if (!initialPositions.current) {
      initialPositions.current = new Float32Array(positionArray);
    }

    let dynamicAmplitude = amplitude;
    let dynamicFrequency = frequency;

    if (isAudioReactive && analyser) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const mids = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 40;

      const smoothedBass = prevBassStrength.current * 0.9 + bass * 0.1;
      const smoothedMids = prevMidStrength.current * 0.9 + mids * 0.1;

      prevBassStrength.current = smoothedBass;
      prevMidStrength.current = smoothedMids;

      dynamicAmplitude += smoothedBass * 0.0003;
      dynamicFrequency += smoothedMids * 0.001;
    }

    for (let i = 0; i < positionArray.length; i += 3) {
      const x = initialPositions.current[i];
      const y = initialPositions.current[i + 1];
      const z = initialPositions.current[i + 2];

      const offset =
        Math.sin(material.uniforms.uTime.value * dynamicFrequency + x * 3) *
          dynamicAmplitude *
          0.5 +
        Math.sin(material.uniforms.uTime.value * dynamicFrequency + y * 3) *
          dynamicAmplitude *
          0.5 +
        Math.sin(material.uniforms.uTime.value * dynamicFrequency + z * 3) * dynamicAmplitude * 0.5;

      positionArray[i] = x + (x / Math.sqrt(x * x + y * y + z * z)) * offset;
      positionArray[i + 1] = y + (y / Math.sqrt(x * x + y * y + z * z)) * offset;
      positionArray[i + 2] = z + (z / Math.sqrt(x * x + y * y + z * z)) * offset;
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
        uniforms={{
          uTime: { value: 0 },
        }}
        wireframe={false}
      />
    </Sphere>
  );
};

export default Blob;
