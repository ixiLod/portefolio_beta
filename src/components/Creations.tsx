'use client';

import { ScrollControls, Scroll } from '@react-three/drei';
import CreationItem from './CreationItem';

const CREATIONS = [
  {
    slug: 'disney',
    mediaUrl: '/creations/Disney.webm',
    mediaType: 'video' as const,
  },
  {
    slug: 'test',
    mediaUrl: '/creations/test.jpg',
    mediaType: 'image' as const,
  },
];

const Creations = () => {
  return (
    <ScrollControls
      pages={CREATIONS.length}
      damping={0.1}
      eps={0.00001}
      infinite
      style={{ scrollbarWidth: 'none' }}
    >
      <Scroll>
        {CREATIONS.map((creation, index) => (
          <CreationItem
            key={creation.slug}
            position={[
              Math.sin((index / CREATIONS.length) * Math.PI * 2),
              0,
              Math.cos((index / CREATIONS.length) * Math.PI * 2),
            ]}
            mediaUrl={creation.mediaUrl}
            mediaType={creation.mediaType}
            projectSlug={creation.slug}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};

export default Creations;
