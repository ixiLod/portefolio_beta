'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Blob from './Blob';
import Sidebar from './Sidebar';
import ParticleSystem from './ParticleSystem';
import About from './About';
import Creations from './Creations';
import Networks from './Networks';
import Contact from './Contact';
import Loading from './Loading';

const BlobScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isParticlesEjected, setParticlesEjected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleBlobClick = () => {
    setSidebarVisible((prev) => !prev);
    setParticlesEjected((prev) => !prev);
  };

  const handleMenuClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
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
        onMenuClick={handleMenuClick}
        activeModal={activeModal}
      />
      {activeModal === 'about' && <About onClose={closeModal} />}
      {activeModal === 'creations' && <Creations />}
      {activeModal === 'contact' && <Contact onClose={closeModal} />}
    </>
  );
};

export default BlobScene;
