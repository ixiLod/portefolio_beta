'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import { Group } from 'three';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface ModelData {
  url: string;
  label: string;
  position: [number, number, number];
}

interface ModelProps {
  model: Group | null;
  ref: React.MutableRefObject<Group | null>;
  position: [number, number, number];
  index: number;
  label: string;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleClick: (index: number) => void;
}

const quadraticBezier = (t: number, p0: Position, p1: Position, p2: Position): Position => {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  const z = (1 - t) * (1 - t) * p0.z + 2 * (1 - t) * t * p1.z + t * t * p2.z;
  return { x, y, z };
};

const Model = ({
  model,
  ref,
  position,
  index,
  label,
  hoveredIndex,
  setHoveredIndex,
  handleClick,
}: ModelProps) => (
  <>
    {model && (
      <>
        <primitive
          ref={ref}
          object={model}
          scale={[0.2, 0.2, 0.2]}
          position={position}
          onPointerOver={() => {
            setHoveredIndex(index);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredIndex(null);
            document.body.style.cursor = 'default';
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            handleClick(index);
          }}
        />
        {hoveredIndex === index && (
          <Html
            position={[position[0], position[1] + 0.5, position[2]]}
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
              {label}
            </div>
          </Html>
        )}
      </>
    )}
  </>
);

const modelData: ModelData[] = [
  {
    url: '/assets/models/instagramLogo.gltf',
    label: 'Instagram',
    position: [0, -3, 1],
  },
  {
    url: '/assets/models/linktreeLogo.gltf',
    label: 'Linktree',
    position: [0, -3, 1],
  },
  {
    url: '/assets/models/githubLogo.gltf',
    label: 'Github',
    position: [0, -3, 1],
  },
];

const Networks = () => {
  const gltfRefs = [
    useRef<THREE.Group | null>(null),
    useRef<THREE.Group | null>(null),
    useRef<THREE.Group | null>(null),
  ];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [gltfModels, setGltfModels] = useState<(THREE.Group | null)[]>([null, null, null]);

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

    modelData.forEach((model, index) => {
      loader.load(
        model.url,
        (gltf: GLTF) => {
          setGltfModels((prev) => {
            const newModels = [...prev];
            newModels[index] = gltf.scene;
            return newModels;
          });
          gltfRefs[index].current = gltf.scene;
        },
        undefined,
        (error: unknown) => {
          if (error instanceof Error) {
            console.error(`Error loading the model from ${model.url}:`, error);
          } else {
            console.error(`An unknown error occurred while loading the model from ${model.url}.`);
          }
        }
      );
    });
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    gltfRefs.forEach((ref, index) => {
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
      {modelData.map((model, index) => (
        <Model
          key={index}
          model={gltfModels[index]}
          ref={gltfRefs[index]}
          position={model.position}
          index={index}
          label={model.label}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          handleClick={handleClick}
        />
      ))}
    </>
  );
};

export default Networks;
