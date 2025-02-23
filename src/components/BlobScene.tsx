'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loading from './Loading/Loading';
import PulseAnimation from './PulseAnimation/PulseAnimation';
import Blob from './Blob';
import Sidebar from './Sidebar';
import ParticleSystem from './ParticleSystem';
import About from './About';
import Creations from './Creations';
import Networks from './Networks';
import Contact from './Contact';
import AudioPlayer from './AudioPlayer';

const BlobScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPulseAnimation, setShowPulseAnimation] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isParticlesEjected, setParticlesEjected] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowPulseAnimation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleBlobClick = () => {
    setShowPulseAnimation(false);
    setSidebarVisible((prev) => !prev);
    setParticlesEjected((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AudioPlayer ref={audioRef} />
      {showPulseAnimation && <PulseAnimation />}

      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} />
        <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.5} />
        <Blob onClick={handleBlobClick} />
        <ParticleSystem isEjecting={isParticlesEjected} />
        {activeModal === 'networks' && <Networks />}
      </Canvas>

      <Sidebar
        isVisible={isSidebarVisible}
        onMenuClick={setActiveModal}
        activeModal={activeModal}
      />
      {activeModal === 'about' && <About onClose={() => setActiveModal(null)} />}
      {activeModal === 'creations' && <Creations />}
      {activeModal === 'contact' && <Contact onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default BlobScene;
