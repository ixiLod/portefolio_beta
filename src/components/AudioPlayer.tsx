'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const AudioPlayer = forwardRef<
  {
    play: () => Promise<void>;
    getAnalyser: () => AnalyserNode | null;
    mute: () => void;
    isMuted: boolean;
  },
  unknown
>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 256;
      analyserRef.current = analyser;
      audioContextRef.current = audioContext;
      sourceRef.current = source;
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (audio) {
        return audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
      return Promise.resolve();
    },
    getAnalyser: () => analyserRef.current,
    mute: () => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
      }
    },
    isMuted: isMuted,
  }));

  return (
    <audio
      ref={audioRef}
      src="/assets/sounds/Donkey Kong Country - Aquatic Ambience [Restored] [2023 Mix].mp3"
      preload="none"
      loop
    />
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
