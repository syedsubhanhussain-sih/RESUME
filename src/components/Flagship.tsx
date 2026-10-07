import { ExternalLink, Github, PlayCircle, Rocket, ArrowRight } from "lucide-react";
import Chapter from "./Chapter";
import { projects, profile } from "../data";

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <article
      className="g-border group relative flex w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-panel via-abyss to-void backdrop-blur transition-colors hover:border-magenta/40 md:h-[68vh] md:w-[56vw] md:shrink-0 glass-card"
      data-hover
    >
      {/* cover image — editorial thumbnail */}
      <div className="relative h-52 overflow-hidden sm:h-64 md:h-[42%]">
        <img
          src={p.cover}
          alt={p.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        <div className="absolute left-6 top-5 flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-magenta">
          <Rocket className="h-4 w-4" />
          PROJECT {String(i + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-8 sm:p-10">
        <div className="bg-blueprint absolute inset-0 opacity-40" />
        <div className="relative flex h-full flex-col">
          <h3 className="font-serif text-4xl font-semibold tracking-tight text-cream md:text-5xl">
            {p.name}
          </h3>
          <p className="mt-2 font-mono text-sm text-mist">{p.subtitle}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">{p.description}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {p.bullets.map((b) => (
              <span
                key={b}
                className="rounded-full border border-magenta/30 bg-magenta/5 px-4 py-1.5 font-mono text-xs tracking-wider text-magenta/90"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-line bg-void/60 px-5 py-2.5 font-mono text-xs tracking-widest text-cream transition-all hover:-translate-y-0.5 hover:border-magenta/60 hover:text-magenta hover:shadow-[0_0_24px_rgba(236,47,125,0.25)]"
                data-hover
              >
                {l.label === "GitHub" ? (
                  <Github className="h-4 w-4" />
                ) : l.label === "Watch Demo" ? (
                  <PlayCircle className="h-4 w-4" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                {l.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * 04 — FLAGSHIP. Desktop: sticky horizontal scroll journey through the
 * projects. Mobile: classic vertical stack.
 */
export default function Flagship() {
  return (
    <section id="flagship" className="flagship relative z-10 overflow-hidden">
      <div className="hscroll-sticky px-5 py-28 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:px-0 md:py-0">
        {/* header */}
        <div className="mx-auto w-full max-w-7xl md:max-w-none md:px-[7vw]">
          <Chapter
            num="04"
            label="FLAGSHIP"
            title="The build that&#10;started *everything.*"
            sub="DEFENXIA — a mobile security platform. Born in a hackathon, hardened into a major project. Keep scrolling — the story moves sideways."
          />
        </div>

        {/* track */}
        <div className="hscroll-track mx-auto flex w-full max-w-7xl flex-col gap-8 md:mx-0 md:mt-4 md:w-max md:max-w-none md:flex-row md:items-stretch md:gap-10 md:px-[7vw]">
          {/* intro panel (desktop) */}
          <div className="hidden shrink-0 flex-col justify-center md:flex md:w-[30vw]">
            <div className="font-display text-[7vw] font-bold leading-[0.9] text-stroke opacity-60">
              FLAG
              <br />
              SHIP
            </div>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-magenta">
              SCROLL <ArrowRight className="h-4 w-4 animate-pulse" />
            </div>
          </div>

          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}

          {/* outro panel */}
          <div
            data-outro
            className="card-sheen flex w-full flex-col justify-center rounded-3xl border border-magenta/25 bg-gradient-to-br from-magenta/10 via-abyss to-void p-8 sm:p-10 md:h-[62vh] md:w-[34vw] md:shrink-0 glass-card"
          >
            <div className="font-mono text-xs tracking-[0.35em] text-magenta">THE LAB NEVER SLEEPS</div>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
              More builds,
              <br />
              more experiments.
            </h3>
            <p className="mt-4 leading-relaxed text-mist">
              Every repo is a battlefield report. Browse the full arsenal on GitHub.
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ig mt-8 flex w-fit items-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs font-bold tracking-widest text-white shadow-[0_0_30px_rgba(236,47,125,0.4)] transition-shadow hover:shadow-[0_0_46px_rgba(236,47,125,0.65)]"
              data-hover
            >
              <Github className="h-4 w-4" /> EXPLORE GITHUB
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
