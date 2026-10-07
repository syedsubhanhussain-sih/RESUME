import Chapter from "./Chapter";
import Tilt from "./Tilt";
import { skillGroups, toolChips } from "../data";

/** 02 — ARSENAL: skills with animated bars + tool chips. */
export default function Arsenal() {
  return (
    <section id="arsenal" className="relative z-10 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Chapter
          num="02"
          label="ARSENAL"
          title="Weapons-grade&#10;*capability.*"
          sub="Not a list of buzzwords — every bar below maps to hours in labs, live traffic and real triage queues."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {skillGroups.map((g) => (
            <Tilt key={g.title} className="h-full" data-reveal-child>
            <div
              className="card-sheen h-full rounded-2xl border border-line/70 bg-panel/60 p-7 backdrop-blur transition-colors hover:border-magenta/40 glass-card"
              data-hover
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold text-cream">{g.title}</h3>
                <span className="font-mono text-sm text-magenta">{g.level}%</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line/60">
                <div
                  data-bar={`${g.level}%`}
                  className="h-full rounded-full bg-gradient-to-r from-magenta to-ember shadow-[0_0_12px_rgba(236,47,125,0.6)]"
                  style={{ width: "0%" }}
                />
              </div>
              <ul className="mt-5 flex flex-col gap-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-magenta/70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            </Tilt>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line/70 bg-abyss/70 p-7 backdrop-blur glass-card" data-reveal>
          <div className="mb-5 font-mono text-xs tracking-[0.3em] text-dim">TOOLKIT // DAILY DRIVERS</div>
          <div className="flex flex-wrap gap-3">
            {toolChips.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-sm text-mist transition-all hover:-translate-y-0.5 hover:border-magenta/60 hover:text-magenta hover:shadow-[0_0_20px_rgba(236,47,125,0.25)]"
                data-hover
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
