'use client';

import { ScrollControls, Scroll, useScroll, Html } from '@react-three/drei';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { Group } from 'three';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  ShaderMaterial,
  Mesh,
  Texture,
  VideoTexture,
  LinearFilter,
  TextureLoader,
  DoubleSide,
} from 'three';

import { vertexShader, fragmentShader } from '@/app/shaders/creationTileShaders';

extend({ ShaderMaterial: ShaderMaterial });

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
  const meshRef = useRef<Mesh>(null!);
  const materialRef = useRef<ShaderMaterial>(null!);
  const [error, setError] = useState(false);
  const router = useRouter();

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uFrequency: { value: frequency },
    uTexture: { value: null as Texture | null },
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

          const videoTexture = new VideoTexture(video);
          videoTexture.minFilter = LinearFilter;
          videoTexture.magFilter = LinearFilter;
          uniforms.current.uTexture.value = videoTexture;
        } else {
          const loader = new TextureLoader();
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
        side={DoubleSide}
      />
    </mesh>
  );
};

const CREATIONS = [
  {
    slug: 'disney',
    mediaUrl: '/creations/Disney.webm',
    mediaType: 'video' as const,
    mediaRatio: 16 / 9,
  },
  {
    slug: 'test',
    mediaUrl: '/creations/test.mp4',
    mediaType: 'video' as const,
    mediaRatio: 9 / 16,
  },
  {
    slug: 'test2',
    mediaUrl: '/creations/test2.mp4',
    mediaType: 'video' as const,
    mediaRatio: 1,
  },
];

const Creations = () => {
  const BASE_WIDTH = 3;
  const SPACING = 1.5;
  const { viewport } = useThree();
  const scroll = useScroll();
  const groupRef = useRef<Group>(null!);

  const totalWidth = CREATIONS.length * (BASE_WIDTH + SPACING) - SPACING;
  const pages = Math.max(totalWidth / viewport.width, CREATIONS.length * 0.63);

  useFrame(() => {
    if (scroll && groupRef.current) {
      const maxScroll = totalWidth - viewport.width;
      groupRef.current.position.x = scroll.offset * maxScroll;
    }
  });

  return (
    <ScrollControls
      pages={pages}
      horizontal
      damping={0.1}
      distance={1}
      style={{
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      eps={0.00001}
    >
      <Scroll>
        <group ref={groupRef} position={[0, 0, 1.5]}>
          {CREATIONS.map((creation, index) => {
            const isVertical = creation.mediaRatio < 1;
            const isSquare = creation.mediaRatio === 1;

            let width, height;
            if (isSquare) {
              width = BASE_WIDTH * 0.75;
              height = width;
            } else if (isVertical) {
              width = BASE_WIDTH * 0.5625;
              height = width / creation.mediaRatio;
            } else {
              width = BASE_WIDTH;
              height = width / creation.mediaRatio;
            }

            return (
              <CreationItem
                key={creation.slug}
                position={[index * (BASE_WIDTH + SPACING), 0, 0]}
                mediaUrl={creation.mediaUrl}
                mediaType={creation.mediaType}
                projectSlug={creation.slug}
                scale={[width, height, 1]}
              />
            );
          })}
          <Html
            as="div"
            style={{
              width: `${totalWidth}vw`,
              height: '1px',
              marginLeft: '2vw',
            }}
          />
        </group>
      </Scroll>
    </ScrollControls>
  );
};

export default Creations;
