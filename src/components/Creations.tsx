'use client';

import { ScrollControls, Scroll } from '@react-three/drei';
import CreationItem from './CreationItem';

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

  return (
    <ScrollControls
      pages={CREATIONS.length * 0.63}
      horizontal
      damping={0.1}
      distance={1}
      style={{
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      eps={0.00001}
    >
      <Scroll>
        <group position={[0, 0, 1.5]}>
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
                position={[index * (BASE_WIDTH + 1), 0, 0]}
                mediaUrl={creation.mediaUrl}
                mediaType={creation.mediaType}
                projectSlug={creation.slug}
                scale={[width, height, 1]}
              />
            );
          })}
        </group>
      </Scroll>
    </ScrollControls>
  );
};

export default Creations;
