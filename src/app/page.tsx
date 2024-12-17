import BlobScene from '@/components/BlobScene';
import ParticleSystem from '@/components/ParticleSystem';

export default function Home() {
  return (
    <div className="relative h-screen">
      <h1 className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-ninna text-7xl text-gray-300">
        IXILOD
      </h1>
      <BlobScene />
      <ParticleSystem isEjecting={false} />
    </div>
  );
}
