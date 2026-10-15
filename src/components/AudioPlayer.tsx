'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

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
  const gainRef = useRef<GainNode | null>(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    if (audioRef.current && !audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const gain = audioContext.createGain();
      const source = audioContext.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(gain);
      gain.connect(audioContext.destination);

      analyser.fftSize = 256;
      gain.gain.value = 1;

      analyserRef.current = analyser;
      audioContextRef.current = audioContext;
      gainRef.current = gain;
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
      const ctx = audioContextRef.current;
      const gain = gainRef.current;
      if (!ctx || !gain) return;

      isMutedRef.current = !isMutedRef.current;
      const value = isMutedRef.current ? 0 : 1;
      gain.gain.setValueAtTime(value, ctx.currentTime);

      if (audioRef.current) {
        audioRef.current.muted = isMutedRef.current;
      }
    },
    get isMuted() {
      return isMutedRef.current;
    },
  }));

  return <audio ref={audioRef} src="/assets/sounds/aquaticAmbient.mp3" preload="none" loop />;
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
