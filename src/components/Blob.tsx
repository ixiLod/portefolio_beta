'use client';

import { useRef, useState, useEffect } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/app/shaders/blobShaders';

interface BlobProps {
  onClick: () => void;
}

const Blob = ({ onClick }: BlobProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const clock = useRef(new THREE.Clock());
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

  useFrame(() => {
    if (meshRef.current) {
      const time = clock.current.getElapsedTime();
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = time;
      }

      const geometry = meshRef.current.geometry;
      const positionArray = geometry.attributes.position.array as Float32Array;

      if (!initialPositions.current) {
        initialPositions.current = new Float32Array(positionArray);
      }

      for (let i = 0; i < positionArray.length; i += 3) {
        const x = initialPositions.current[i];
        const y = initialPositions.current[i + 1];
        const z = initialPositions.current[i + 2];

        const offset =
          Math.sin(time * frequency + x * 5) * amplitude +
          Math.sin(time * frequency + y * 5) * amplitude +
          Math.sin(time * frequency + z * 5) * amplitude;

        positionArray[i] = x + (x / Math.sqrt(x * x + y * y + z * z)) * offset;
        positionArray[i + 1] = y + (y / Math.sqrt(x * x + y * y + z * z)) * offset;
        positionArray[i + 2] = z + (z / Math.sqrt(x * x + y * y + z * z)) * offset;
      }
      geometry.attributes.position.needsUpdate = true;
    }
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
