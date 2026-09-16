import { motion } from "framer-motion";
import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS, mapsEmbedUrl, mapsDirectionsUrl } from "../config";

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Location & Directions" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#f6e2ae]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#f5eee2]/70">
            <MapPin size={14} className="text-[#eeb2c0]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        {/* map panel */}
        <Reveal delay={0.08} className="relative overflow-hidden rounded-3xl border border-[#e2c88f]/30 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <motion.iframe
            title="Wedding venue map"
            src={mapsEmbedUrl}
            className="h-64 w-full grayscale-[35%] contrast-[1.05] sm:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          />
        </Reveal>

        {/* actions */}
        <Reveal delay={0.14} className="grid grid-cols-1 gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#e2c88f] via-[#eeb2c0] to-[#e2c88f] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-[#1c1640] shadow-[0_8px_30px_rgba(238,178,192,0.35)] transition-transform active:scale-95"
          >
            {/* light sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ animation: "sweep 3.4s ease-in-out infinite" }}
            />
            <Navigation size={16} /> Get Directions
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#e2c88f]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#e2c88f]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Google Cal
            </a>
            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 rounded-full border border-[#e2c88f]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#e2c88f]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Apple / ICS
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
