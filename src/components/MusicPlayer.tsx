import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { wedding } from "../config";

export interface MusicPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, { autoPlayOnMount?: boolean }>(
  ({ autoPlayOnMount = false }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [, setIsPlaying] = useState(false);

    const playAudio = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked, waiting for user gesture:", err);
      }
    };

    const pauseAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      setIsPlaying(false);
    };

    const toggleAudio = () => {
      if (audioRef.current?.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    };

    useImperativeHandle(ref, () => ({
      play: playAudio,
      pause: pauseAudio,
      toggle: toggleAudio,
    }));

    useEffect(() => {
      if (autoPlayOnMount) {
        playAudio();
      }
    }, [autoPlayOnMount]);

    return (
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={wedding.music.m4a} type="audio/mp4" />
        <source src={wedding.music.webm} type="audio/webm" />
      </audio>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;

