'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

const AudioPlayer = forwardRef<HTMLAudioElement, unknown>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => audioRef.current || new Audio());

  return (
    <audio ref={audioRef} src="/assets/sounds/scizzie - aquatic ambience.mp3" preload="auto" loop />
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
