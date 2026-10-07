import { Award } from "lucide-react";
import Chapter from "./Chapter";
import Tilt from "./Tilt";
import { achievements } from "../data";

/** 06 — PROOF: achievements as evidence. */
export default function Proof() {
  return (
    <section id="proof" className="relative z-10 overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div
        aria-hidden
        data-parallax="-0.4"
        className="text-stroke pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none opacity-20"
      >
        PROOF
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Chapter
          num="06"
          label="PROOF"
          title="Receipts, not&#10;*promises.*"
          sub="Hackathon finals, a winning build, a 100-participant event led — the paper trail of someone who shows up and ships."
        />

        <Tilt data-reveal-group>
        <div className="overflow-hidden rounded-2xl border border-line/70 glass-card">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              data-reveal-child
              className={`group flex items-center gap-5 bg-panel/60 px-6 py-6 backdrop-blur transition-colors hover:bg-magenta/5 sm:px-10 ${
                i !== achievements.length - 1 ? "border-b border-line/60" : ""
              }`}
              data-hover
            >
              <span className="font-mono text-sm text-dim transition-colors group-hover:text-magenta">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all group-hover:border-magenta/60 group-hover:shadow-[0_0_18px_rgba(236,47,125,0.3)]">
                <Award className="h-4 w-4 text-magenta" />
              </span>
              <div className="flex-1">
                <div className="font-display text-lg font-bold text-cream transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
                  {a.title}
                </div>
                <div className="mt-0.5 text-sm text-mist">{a.detail}</div>
              </div>
              <span className="hidden font-mono text-xs tracking-widest text-dim transition-all group-hover:translate-x-1 group-hover:text-magenta sm:block">
                VERIFIED →
              </span>
            </div>
          ))}
        </div>
        </Tilt>
      </div>
    </section>
  );
}
