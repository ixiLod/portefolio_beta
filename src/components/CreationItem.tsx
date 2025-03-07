'use client';

import { useFrame, extend } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { vertexShader, fragmentShader } from '@/app/shaders/creationTileShaders';

extend({ ShaderMaterial: THREE.ShaderMaterial });

interface CreationItemProps {
  position: [number, number, number];
  mediaUrl: string;
  mediaType: 'image' | 'video';
  projectSlug: string;
  amplitude?: number;
  frequency?: number;
  scale?: [number, number, number];
}

const CreationItem = ({
  position,
  mediaUrl,
  mediaType,
  projectSlug,
  amplitude = 0.3,
  frequency = 2.5,
  scale = [1, 1, 1],
}: CreationItemProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const [error, setError] = useState(false);
  const router = useRouter();

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uFrequency: { value: frequency },
    uTexture: { value: null as THREE.Texture | null },
  });

  useEffect(() => {
    const loadTexture = async () => {
      try {
        if (mediaType === 'video') {
          const video = document.createElement('video');
          video.src = mediaUrl;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.crossOrigin = 'anonymous';
          await video.play();

          const videoTexture = new THREE.VideoTexture(video);
          videoTexture.minFilter = THREE.LinearFilter;
          videoTexture.magFilter = THREE.LinearFilter;
          uniforms.current.uTexture.value = videoTexture;
        } else {
          const loader = new THREE.TextureLoader();
          loader.load(mediaUrl, (loadedTexture) => {
            uniforms.current.uTexture.value = loadedTexture;
          });
        }
      } catch (err) {
        console.error('Error loading media:', err);
        setError(true);
      }
    };

    loadTexture();
  }, [mediaUrl, mediaType]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      uniforms.current.uTime.value += delta * 1.5;
      materialRef.current.uniformsNeedUpdate = true;
    }
  });

  if (error) return null;

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={() => router.push(`/projects/${projectSlug}`)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default CreationItem;
