import BlobScene from '@/components/BlobScene';
import ParticleSystem from '@/components/ParticleSystem';
import AudioPlayer from '@/components/AudioPlayer';
import NavigationHandler from '@/components/NavigationHandler';

export default function Home() {
  return (
    <>
      <NavigationHandler />
      <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
        <BlobScene />
        <h1 translate="no" className="sr-only">
          IXILOD
        </h1>
        <div
          aria-hidden="true"
          className="title-container pointer-events-none fixed left-1/2 top-4 z-20 flex h-12 -translate-x-1/2 items-center font-ninna text-4xl text-gray-300 md:text-5xl"
        >
          IXILOD
        </div>
        <ParticleSystem isEjecting={false} />
        <AudioPlayer />
      </div>
    </>
  );
}
