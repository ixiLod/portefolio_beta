'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface CreationItemProps {
  position: [number, number, number];
  mediaUrl: string;
  mediaType: 'image' | 'video';
  projectSlug: string;
}

const CreationItem = ({ position, mediaUrl, mediaType, projectSlug }: CreationItemProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (mediaType === 'video') {
      const video = document.createElement('video');
      video.src = mediaUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';

      video.load();
      video.play().catch(console.error);

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      setTexture(videoTexture);

      return () => {
        video.pause();
        video.src = '';
        video.load();
      };
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(
        mediaUrl,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        (err) => {
          console.error('Error loading texture:', err);
          setError(true);
        }
      );
    }
  }, [mediaUrl, mediaType]);

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.y += 0.01;
    }
  });

  if (error) return null;

  return (
    <mesh ref={meshRef} position={position} onClick={() => router.push(`/projects/${projectSlug}`)}>
      <planeGeometry args={[1.77, 1]} />
      <meshStandardMaterial map={texture} transparent opacity={1} />
    </mesh>
  );
};

export default CreationItem;
