'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';

interface Position {
  x: number;
  y: number;
  z: number;
}

const quadraticBezier = (t: number, p0: Position, p1: Position, p2: Position): Position => {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  const z = (1 - t) * (1 - t) * p0.z + 2 * (1 - t) * t * p1.z + t * t * p2.z;
  return { x, y, z };
};

const Networks = () => {
  const gltfRef1 = useRef<THREE.Group | null>(null);
  const gltfRef2 = useRef<THREE.Group | null>(null);
  const gltfRef3 = useRef<THREE.Group | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [gltfModel1, setGltfModel1] = useState<THREE.Group | null>(null);
  const [gltfModel2, setGltfModel2] = useState<THREE.Group | null>(null);
  const [gltfModel3, setGltfModel3] = useState<THREE.Group | null>(null);

  const positions: Position[] = [
    { x: -0.9, y: 1.1, z: 1 },
    { x: 0.7, y: 1.1, z: 1 },
    { x: 0, y: 1.2, z: 1 },
  ];

  const startPositions: Position[] = [
    { x: 0, y: -3, z: 1 },
    { x: 0, y: -3, z: 1 },
    { x: 0, y: -3, z: 1 },
  ];

  const currentPositions = useRef([
    { ...startPositions[0] },
    { ...startPositions[1] },
    { ...startPositions[2] },
  ]);

  const offsets = useRef([Math.random() * 10, Math.random() * 10, Math.random() * 10]);

  const startDelays = useRef([0.2, 0.4, 0.6]);
  const startTimes = useRef([0, 0, 0]);

  const easeInOut = (t: number) => (1 - Math.cos(t * Math.PI)) / 2;

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/instagramLogo.gltf',
      (gltf: GLTF) => {
        setGltfModel1(gltf.scene);
        gltfRef1.current = gltf.scene;
      },
      undefined,
      (error: unknown) => {
        if (error instanceof Error) {
          console.error('Error loading the first GLTF model:', error);
        } else {
          console.error('An unknown error occurred while loading the first GLTF model.');
        }
      }
    );

    loader.load(
      '/assets/models/linktreeLogo.gltf',
      (gltf: GLTF) => {
        setGltfModel2(gltf.scene);
        gltfRef2.current = gltf.scene;
      },
      undefined,
      (error: unknown) => {
        if (error instanceof Error) {
          console.error('Error loading the second GLTF model:', error);
        } else {
          console.error('An unknown error occurred while loading the second GLTF model.');
        }
      }
    );

    loader.load(
      '/assets/models/githubLogo.gltf',
      (gltf: GLTF) => {
        setGltfModel3(gltf.scene);
        gltfRef3.current = gltf.scene;
      },
      undefined,
      (error: unknown) => {
        if (error instanceof Error) {
          console.error('Error loading the third GLTF model:', error);
        } else {
          console.error('An unknown error occurred while loading the third GLTF model.');
        }
      }
    );
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    [gltfRef1, gltfRef2, gltfRef3].forEach((ref, index) => {
      const targetPosition = positions[index];
      const startPosition = startPositions[index];
      const currentPosition = currentPositions.current[index];
      const obj = ref.current;

      if (obj) {
        if (startTimes.current[index] === 0) {
          startTimes.current[index] = elapsedTime + startDelays.current[index];
        }

        const timeSinceStart = elapsedTime - startTimes.current[index];
        if (timeSinceStart >= 0) {
          const duration = 1.75;
          const t = Math.min(timeSinceStart / duration, 1);
          const easedT = easeInOut(t);

          const controlPoint = {
            x: (startPosition.x + targetPosition.x) / 2,
            y: Math.max(startPosition.y, targetPosition.y),
            z: -5,
          };

          const newPosition = quadraticBezier(easedT, startPosition, controlPoint, targetPosition);
          currentPosition.x = newPosition.x;
          currentPosition.y = newPosition.y;
          currentPosition.z = newPosition.z;

          obj.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

          if (t === 1) {
            const time = state.clock.getElapsedTime();
            const offset = offsets.current[index];

            obj.position.y += Math.sin(time * 2 + offset) * 0.02;

            obj.rotation.x = Math.sin(time * 1.5 + offset) * 0.2;
            obj.rotation.y = Math.sin(time * 1.2 + offset) * 0.2;
          }
        }
      }
    });
  });

  const handleClick = (index: number) => {
    const urls = [
      'https://www.instagram.com/ixilod',
      'https://linktr.ee/ixilod',
      'https://github.com/ixilod',
    ];
    window.open(urls[index], '_blank');
  };

  return (
    <>
      {gltfModel1 && (
        <>
          <primitive
            ref={gltfRef1}
            object={gltfModel1}
            scale={[0.2, 0.2, 0.2]}
            position={[0, -3, 1]}
            onPointerOver={() => {
              setHoveredIndex(0);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredIndex(null);
              document.body.style.cursor = 'default';
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClick(0);
            }}
          />
          {hoveredIndex === 0 && (
            <Html
              position={[positions[0].x, positions[0].y + 0.5, positions[0].z]}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                Instagram
              </div>
            </Html>
          )}
        </>
      )}
      {gltfModel2 && (
        <>
          <primitive
            ref={gltfRef2}
            object={gltfModel2}
            scale={[0.2, 0.2, 0.2]}
            position={[0, -3, 1]}
            onPointerOver={() => {
              setHoveredIndex(1);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredIndex(null);
              document.body.style.cursor = 'default';
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClick(1);
            }}
          />
          {hoveredIndex === 1 && (
            <Html
              position={[positions[1].x, positions[1].y + 0.5, positions[1].z]}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                Linktree
              </div>
            </Html>
          )}
        </>
      )}
      {gltfModel3 && (
        <>
          <primitive
            ref={gltfRef3}
            object={gltfModel3}
            scale={[0.2, 0.2, 0.2]}
            position={[0, -3, 1]}
            onPointerOver={() => {
              setHoveredIndex(2);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredIndex(null);
              document.body.style.cursor = 'default';
            }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClick(2);
            }}
          />
          {hoveredIndex === 2 && (
            <Html
              position={[positions[2].x, positions[2].y + 0.5, positions[2].z]}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                Github
              </div>
            </Html>
          )}
        </>
      )}
    </>
  );
};

export default Networks;
