import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";

const doorEase: [number, number, number, number] = [0.65, 0, 0.35, 1];

// Midnight gate + palace-door opening transition
export default function IntroGate({
  onOpening,
  onOpened,
  onPlayMusic,
}: {
  onOpening: () => void;
  onOpened: () => void;
  onPlayMusic?: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    if (onPlayMusic) {
      onPlayMusic();
    }
    onOpening();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left door */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#0c0a24]"
        animate={opening ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
      >
        <img
          src="/assets/navy-texture.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a24]/60 to-transparent" />
        {/* half mandala — splits as doors part */}
        <img
          src="/assets/mandala.png"
          alt=""
          className="absolute right-[-42vmin] top-1/2 w-[84vmin] max-w-none -translate-y-1/2 opacity-25"
        />
      </motion.div>

      {/* Right door */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#0c0a24]"
        animate={opening ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
        onAnimationComplete={() => opening && onOpened()}
      >
        <img
          src="/assets/navy-texture.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0c0a24]/60 to-transparent" />
        <img
          src="/assets/mandala.png"
          alt=""
          className="absolute left-[-42vmin] top-1/2 w-[84vmin] max-w-none -translate-y-1/2 opacity-25"
        />
      </motion.div>

      {/* Light spilling through the seam */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[70px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,224,168,0.85), transparent)",
          filter: "blur(10px)",
        }}
        initial={{ opacity: 0, scaleX: 0.1 }}
        animate={opening ? { opacity: [0, 1, 0.9], scaleX: [0.1, 1, 2.2] } : {}}
        transition={{ duration: 1.5, delay: 0.35, ease: doorEase }}
      />

      {/* Gate content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        animate={opening ? { opacity: 0, y: -26 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* garland crown above the gate content */}
        <motion.img
          src="/assets/garland-top.webp"
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 w-full object-cover object-top opacity-90"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative flex flex-col items-center gap-4 text-center max-w-md mx-auto"
        >
          {/* Royal golden Bismillah medallion */}
          <motion.img
            src="/assets/bismillah.png"
            alt="Bismillah Ar-Rahman Ar-Rahim"
            className="w-28 drop-shadow-[0_0_25px_rgba(226,200,143,0.65)] sm:w-32"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <div className="flex flex-col items-center gap-1">
            <span className="font-arabic text-xl tracking-wider text-[#f6e2ae] drop-shadow-[0_2px_8px_rgba(217,164,65,0.4)]">
              {wedding.verse.arabic}
            </span>
            <span className="font-display text-[10px] tracking-[0.25em] text-[#e2c88f]/80 uppercase">
              {wedding.verse.translation}
            </span>
          </div>

          <div className="hairline-gold w-24 my-1" />

          <p className="font-display text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] text-[#f5eee2]/80">
            {wedding.verse.kicker}
          </p>
          <p className="font-display text-sm sm:text-base italic text-[#eeb2c0]">
            {wedding.verse.invitation}
          </p>
          {/* Groom First, then Bride */}
          <h1 className="font-script text-gold text-6xl leading-tight sm:text-7xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            {wedding.groom} & {wedding.bride}
          </h1>

          <motion.button
            onClick={handleOpen}
            whileTap={{ scale: 0.94 }}
            className="group relative mt-4 rounded-full border border-[#e2c88f]/70 bg-[#0c0a24]/60 backdrop-blur-sm px-10 py-4 text-[12px] uppercase tracking-[0.35em] text-[#f6e2ae] transition-all hover:bg-[#e2c88f]/15 hover:border-[#e2c88f] shadow-[0_4px_25px_rgba(226,200,143,0.25)]"
          >
            <span
              className="absolute inset-0 rounded-full border border-[#e2c88f]/40"
              style={{ animation: "glow-pulse 2.6s ease-in-out infinite" }}
            />
            Open Invitation ♡
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
