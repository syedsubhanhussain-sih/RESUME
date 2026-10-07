import { BadgeCheck, RotateCcw } from "lucide-react";
import Chapter from "./Chapter";
import Tilt from "./Tilt";
import FlipCard from "./FlipCard";
import { certifications } from "../data";

/** 05 — CREDENTIALS: tap-to-flip certification cards in 3D tilt frames. */
export default function Credentials() {
  return (
    <section id="credentials" className="relative z-10 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Chapter
          num="05"
          label="CREDENTIALS"
          title="Verified. Certified.&#10;*Battle-tested.*"
          sub="Ten certifications across networking, Linux, ethical hacking, cloud and DevOps — tap any card to flip it."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {certifications.map((c, i) => (
            <Tilt key={c.name} data-reveal-child className="h-full">
              <FlipCard
                front={
                  <div className="card-sheen group flex h-full items-start gap-4 rounded-2xl border border-line/70 bg-panel/60 p-6 backdrop-blur transition-colors hover:border-magenta/40 glass-card">
                    <span
                      data-depth="0.6"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-magenta/30 bg-magenta/5 transition-colors group-hover:bg-magenta/15"
                    >
                      <BadgeCheck className="h-5 w-5 text-magenta" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-dim">
                        CERT {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-1 font-display font-semibold leading-snug text-cream">
                        {c.name}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-mist">{c.org}</div>
                      <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] text-magenta/60">
                        <RotateCcw className="h-3 w-3" /> TAP TO FLIP
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-magenta/30 bg-panel/60 p-6 text-center backdrop-blur glass-card">
                    <BadgeCheck className="h-8 w-8 text-magenta" />
                    <div className="font-display text-xl font-bold text-cream">{c.org}</div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-dim">
                      {c.name.toUpperCase()}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] text-magenta/60">
                      <RotateCcw className="h-3 w-3" /> TAP TO FLIP BACK
                    </div>
                  </div>
                }
              />
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
