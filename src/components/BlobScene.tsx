'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';

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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const BlobScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPulseAnimation, setShowPulseAnimation] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isParticlesEjected, setParticlesEjected] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioReactive, setIsAudioReactive] = useState(false);

  const audioRef = useRef<{
    play: () => Promise<void>;
    getAnalyser: () => AnalyserNode | null;
    mute: () => void;
    isMuted: boolean;
  } | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('section') === 'creations') {
      setIsLoading(false);
      setShowPulseAnimation(false);
      setSidebarVisible(true);
      setParticlesEjected(true);
      setIsClicked(true);
      setIsAudioReactive(true);
      if (audioRef.current) {
        const audio = audioRef.current;
        const analyser = audio.getAnalyser();
        const audioContext = analyser?.context as AudioContext;

        if (audioContext && audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            audio.play().catch((error) => console.error('Error playing audio:', error));
          });
        } else {
          audio.play().catch((error) => console.error('Error playing audio:', error));
        }
      }
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowPulseAnimation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const handleOpenMenu = () => {
      setShowPulseAnimation(false);
      setSidebarVisible(true);
      setParticlesEjected(true);
      setIsClicked(true);
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.play().catch((error) => console.error('Error playing audio:', error));
      }
    };

    const handleActivateCreations = () => {
      setActiveModal('creations');
    };

    window.addEventListener('openMenu', handleOpenMenu);
    window.addEventListener('activateCreations', handleActivateCreations);
    window.addEventListener('skipIntro', handleOpenMenu);
    window.addEventListener('showCreations', handleActivateCreations);

    return () => {
      window.removeEventListener('openMenu', handleOpenMenu);
      window.removeEventListener('activateCreations', handleActivateCreations);
      window.removeEventListener('skipIntro', handleOpenMenu);
      window.removeEventListener('showCreations', handleActivateCreations);
    };
  }, []);

  const handleBlobClick = () => {
    setShowPulseAnimation(false);
    setSidebarVisible((prev) => !prev);
    setParticlesEjected((prev) => !prev);
    setIsAudioReactive(true);
    setIsClicked(true);
    if (audioRef.current) {
      const audio = audioRef.current;
      const analyser = audio.getAnalyser();
      const audioContext = analyser?.context as AudioContext;

      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          console.log('AudioContext resumed');
          audio.play().catch((error) => console.error('Error playing audio:', error));
        });
      } else {
        audio.play().catch((error) => console.error('Error playing audio:', error));
      }
    }
  };

  const handleMuteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (audioRef.current) {
      audioRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AudioPlayer ref={audioRef} />
      {showPulseAnimation && <PulseAnimation />}

      {isClicked && (
        <motion.button
          onClick={handleMuteClick}
          className="fixed right-4 top-4 z-50 flex size-12 items-center justify-center rounded-full bg-slate-300 bg-opacity-10 p-2 text-white backdrop-blur-sm transition-all hover:bg-opacity-20"
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          initial={{ transform: 'translateX(200%)' }}
          animate={{ transform: 'translateX(0%)' }}
          transition={{
            type: 'tween',
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.6,
            delay: 0.1,
          }}
          style={{ willChange: 'transform' }}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="size-5" />
        </motion.button>
      )}

      <Canvas camera={{ position: [0, 0, 4], fov: 75 }} style={{ position: 'fixed' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} />
        <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.5} />
        <Blob
          onClick={handleBlobClick}
          analyser={audioRef.current?.getAnalyser() || null}
          isAudioReactive={isAudioReactive}
        />
        <ParticleSystem isEjecting={isParticlesEjected} />
        {activeModal === 'networks' && <Networks />}
        {activeModal === 'creations' && <Creations />}
      </Canvas>

      <Sidebar
        isVisible={isSidebarVisible}
        onMenuClick={setActiveModal}
        activeModal={activeModal}
      />
      {activeModal === 'about' && <About onClose={() => setActiveModal(null)} />}
      {activeModal === 'contact' && <Contact onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default BlobScene;
