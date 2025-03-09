import BlobScene from '@/components/BlobScene';
import ParticleSystem from '@/components/ParticleSystem';
import AudioPlayer from '@/components/AudioPlayer';
import NavigationHandler from '@/components/NavigationHandler';

export default function Home() {
  return (
    <>
      <NavigationHandler />
      <div className="relative h-screen">
        <BlobScene />
        <h1 translate="no" className="sr-only">
          IXILOD
        </h1>
        <div
          aria-hidden="true"
          className="title-container pointer-events-none fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-ninna text-6xl text-gray-300 md:text-7xl"
        >
          IXILOD
        </div>
        <ParticleSystem isEjecting={false} />
        <AudioPlayer />
      </div>
    </>
  );
}
