import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { wedding } from "../config";

export interface MusicPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, { autoPlayOnMount?: boolean }>(
  ({ autoPlayOnMount = false }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
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
      <>
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

        {/* Floating audio control badge */}
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={toggleAudio}
            title={isPlaying ? "Pause music" : "Play music"}
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
            className="group flex items-center gap-2.5 rounded-full border border-[#e2c88f]/40 bg-[#0c0a24]/80 px-3.5 py-2 text-xs backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all hover:border-[#e2c88f] hover:bg-[#161338]/90 active:scale-95"
          >
            {/* Animated sound wave bars or music icon */}
            {isPlaying ? (
              <div className="flex items-end gap-[3px] h-3.5 w-3.5 text-[#eeb2c0]">
                <span className="w-[2.5px] rounded-full bg-[#eeb2c0] animate-[music-bar_0.8s_ease-in-out_infinite_alternate]" />
                <span className="w-[2.5px] rounded-full bg-[#e2c88f] animate-[music-bar_1.2s_ease-in-out_infinite_alternate_0.2s]" />
                <span className="w-[2.5px] rounded-full bg-[#eeb2c0] animate-[music-bar_0.9s_ease-in-out_infinite_alternate_0.4s]" />
              </div>
            ) : (
              <VolumeX size={14} className="text-[#f5eee2]/60 group-hover:text-[#f6e2ae]" />
            )}

            <span className="font-display tracking-[0.15em] text-[11px] text-[#f6e2ae] uppercase">
              {isPlaying ? "Amaran ♪" : "Play Music"}
            </span>

            {isPlaying ? (
              <Volume2 size={13} className="text-[#e2c88f]/80" />
            ) : (
              <Music size={13} className="text-[#f5eee2]/40" />
            )}
          </button>
        </div>
      </>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
