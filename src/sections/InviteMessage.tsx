import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Countdown from "../components/Countdown";
import { wedding } from "../config";

// The invitation text reveals itself word by word
function VerseWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className || "font-display text-lg sm:text-xl italic leading-relaxed text-[#f5eee2]/90"}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.03 } },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function InviteMessage() {
  return (
    <section className="relative flex flex-col items-center gap-10 px-6 py-24">
      <Reveal className="flex max-w-lg flex-col items-center gap-5 text-center">
        {/* Muslim signature */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-arabic text-2xl tracking-wider text-[#f6e2ae] drop-shadow-[0_2px_10px_rgba(217,164,65,0.4)]">
            {wedding.verse.arabic}
          </span>
          <span className="font-display text-[11px] uppercase tracking-[0.3em] text-[#e2c88f]/80">
            {wedding.verse.translation}
          </span>
        </div>

        <motion.img
          src="/assets/mandala.png"
          alt=""
          className="w-14 opacity-60 my-1"
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 16, ease: "linear" }}
        />

        {/* Space 1: Upper Card (Paragraph 1) */}
        <div className="rounded-2xl border border-[#e2c88f]/25 bg-white/[0.03] p-6 backdrop-blur-sm">
          <VerseWords
            text={wedding.verse.paragraph1}
            className="font-display text-lg sm:text-xl italic leading-relaxed text-[#f5eee2]/90"
          />
        </div>

        <div className="hairline-gold w-28 my-2" />

        {/* Space 2: Lower Space (Paragraph 2) */}
        <VerseWords
          text={wedding.verse.paragraph2}
          className="font-display text-lg sm:text-xl italic leading-relaxed text-[#f5eee2]/90"
        />
      </Reveal>

      {wedding.sections?.countdown && (
        <Reveal delay={0.15} className="flex flex-col items-center gap-6">
          <span className="text-[11px] uppercase tracking-[0.45em] text-[#eeb2c0]">
            Counting down to the big day
          </span>
          <Countdown targetISO={wedding.dateISO} />
        </Reveal>
      )}
    </section>
  );
}
