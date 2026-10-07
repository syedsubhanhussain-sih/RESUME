import { Briefcase } from "lucide-react";
import Chapter from "./Chapter";
import Tilt from "./Tilt";
import { experience } from "../data";

/** 03 — MISSIONS: the experience timeline. */
export default function Missions() {
  return (
    <section id="missions" className="relative z-10 overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      {/* giant drifting backdrop word */}
      <div
        aria-hidden
        data-parallax="-0.45"
        className="text-stroke pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-bold leading-none opacity-25"
      >
        MISSIONS
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Chapter
          num="03"
          label="MISSIONS"
          title="Deployments in&#10;*the field.*"
          sub="Four cybersecurity internships in a single year — plus hundreds of lab hours and a college-wide security event led end to end."
        />

        <div className="timeline-list relative mx-auto max-w-4xl">
          {/* timeline spine (dim base) */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-white/40 via-line to-transparent sm:left-1/2" />
          {/* scroll-driven white water-flow line */}
          <div
            aria-hidden
            className="timeline-flowwrap absolute bottom-0 left-[19px] top-0 sm:left-1/2"
            style={{ height: "0%" }}
          >
            <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.95),0_0_44px_rgba(255,255,255,0.35)]" />
            <div className="timeline-flowbands absolute inset-y-0 left-1/2 w-[7px] -translate-x-1/2" />
          </div>

          {experience.map((e, i) => (
            <div
              key={e.org}
              className={`timeline-item relative mb-8 flex flex-col gap-4 pl-14 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:pr-14 sm:text-right"
                  : "sm:ml-auto sm:pl-14"
              }`}
            >
              {/* node */}
              <span
                className={`timeline-node absolute top-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-void ${
                  i % 2 === 0
                    ? "left-0 sm:left-auto sm:-right-5"
                    : "left-0 sm:-left-5"
                }`}
              >
                <Briefcase className="h-4 w-4 text-white/70 transition-colors" />
              </span>

              <Tilt className="w-full">
              <div
                className="card-sheen h-full rounded-2xl border border-line/70 bg-panel/60 p-6 text-left backdrop-blur transition-colors hover:border-magenta/40 glass-card"
                data-hover
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-magenta/10 px-3 py-1 font-mono text-[11px] tracking-widest text-magenta">
                    {e.period.toUpperCase()}
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-widest text-dim">
                    {e.tag.toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-cream">{e.org}</h3>
                <div className="font-mono text-sm text-magenta/90">{e.role}</div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-mist">— {p}</li>
                  ))}
                </ul>
              </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
