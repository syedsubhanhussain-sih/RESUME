import { Rocket, Globe2, Cpu } from "lucide-react";
import Chapter from "./Chapter";
import Tilt from "./Tilt";
import { vision } from "../data";

const ICONS = [Rocket, Globe2, Cpu];

/** 07 — TRAJECTORY: the future vision. */
export default function Trajectory() {
  return (
    <section id="trajectory" className="relative z-10 overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div data-parallax="0.3" className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <Chapter
          num="07"
          label="TRAJECTORY"
          title="The mission&#10;doesn't end *at graduation.*"
          sub="2027 and beyond — the three vectors every decision is pointed at."
        />

        <div className="mx-auto flex max-w-4xl flex-col gap-6" data-reveal-group>
          {vision.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={v.title}
                data-reveal-child
                data-stack
                className="card-sheen group relative overflow-hidden rounded-3xl border border-line/70 bg-gradient-to-b from-panel to-abyss p-8 backdrop-blur transition-colors hover:border-magenta/50 hover:shadow-[0_20px_60px_rgba(236,47,125,0.12)] glass-card sm:p-10"
                data-hover
              >
                <Tilt>
                <div className="font-mono text-xs tracking-[0.35em] text-dim">
                  VECTOR {String(i + 1).padStart(2, "0")}
                </div>
                <span data-depth="0.7" className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-magenta/40 bg-magenta/10 shadow-[0_0_30px_rgba(236,47,125,0.2)]">
                  <Icon className="h-6 w-6 text-magenta" />
                </span>
                <h3 data-depth="0.4" className="mt-6 font-display text-2xl font-bold leading-tight text-cream sm:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-mist">{v.detail}</p>
                </Tilt>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center font-mono text-sm tracking-[0.25em] text-dim" data-reveal>
          CYBERSECURITY <span className="text-magenta">×</span> AI <span className="text-magenta">×</span> ENTREPRENEURSHIP
        </p>
      </div>
    </section>
  );
}
