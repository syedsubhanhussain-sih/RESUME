import { MapPin, GraduationCap, Trophy } from "lucide-react";
import Chapter from "./Chapter";
import Tilt from "./Tilt";
import { education } from "../data";

/** 01 — ORIGIN: who he is, where he's from, the foundation. */
export default function Origin() {
  return (
    <section id="origin" className="relative z-10 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Chapter
          num="01"
          label="ORIGIN"
          title="Every defender has&#10;an *origin story.*"
          sub="From Bidar, Karnataka — a final-year engineering student who got obsessed with a single question: how do systems break, and how do we make them unbreakable?"
        />

        <div className="grid gap-8 lg:grid-cols-5" data-reveal-group>
          {/* identity card */}
          <div data-reveal-child className="lg:col-span-2">
            <Tilt className="h-full">
            <div className="card-sheen group relative h-full overflow-hidden rounded-2xl border border-line/70 bg-panel/60 p-8 glass-card">
              <div className="bg-blueprint absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between font-mono text-xs tracking-[0.3em] text-dim">
                  <span>IDENTITY FILE</span>
                  <span className="flex items-center gap-2 text-magenta">
                    <span className="inline-block h-2 w-2 animate-blink rounded-full bg-magenta" />
                    VERIFIED
                  </span>
                </div>
                <div className="relative mx-auto w-fit">
                  <img
                    src="/profile-photo.jpg"
                    alt="Syed Subhan Hussain"
                    className="h-56 w-56 rounded-2xl border border-magenta/30 object-cover object-top shadow-[0_0_40px_rgba(236,47,125,0.15)]"
                    loading="lazy"
                  />
                  <div className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-magenta/70" />
                  <div className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-magenta/70" />
                  <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-magenta/70" />
                  <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-magenta/70" />
                  {/* scanline sweep */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="h-8 w-full bg-gradient-to-b from-transparent via-magenta/20 to-transparent animate-[scan_3.5s_ease-in-out_infinite]" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="font-display text-xl font-bold text-cream">Syed Subhan Hussain</div>
                  <div className="mt-1 font-mono text-xs tracking-[0.2em] text-magenta/80">CYBER SECURITY ANALYST</div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded-lg border border-line bg-void/60 p-3">
                    <div className="text-dim">BASE</div>
                    <div className="mt-1 flex items-center gap-1.5 text-cream"><MapPin className="h-3.5 w-3.5 text-magenta" />Bidar, IN</div>
                  </div>
                  <div className="rounded-lg border border-line bg-void/60 p-3">
                    <div className="text-dim">STATUS</div>
                    <div className="mt-1 flex items-center gap-1.5 text-cream"><Trophy className="h-3.5 w-3.5 text-magenta" />Class Topper</div>
                  </div>
                  <div className="rounded-lg border border-line bg-void/60 p-3">
                    <div className="text-dim">FOCUS</div>
                    <div className="mt-1 text-cream">Security Ops</div>
                  </div>
                  <div className="rounded-lg border border-line bg-void/60 p-3">
                    <div className="text-dim">CLASS</div>
                    <div className="mt-1 text-cream">2027</div>
                  </div>
                </div>
              </div>
            </div>
            </Tilt>
          </div>

          {/* bio + education */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Tilt data-reveal-child>
            <div className="h-full rounded-2xl border border-line/70 bg-panel/60 p-8 backdrop-blur glass-card">
              <p className="text-lg leading-relaxed text-cream/90">
                I'm a <span className="text-magenta">final-year B.E. Computer Science</span> student
                specializing in <span className="text-magenta">Cyber Security, IoT &amp; Blockchain</span> —
                and I've spent the last two years collecting real reps:{" "}
                <span className="font-semibold text-cream">four cybersecurity internships</span>,{" "}
                <span className="font-semibold text-cream">ten certifications</span>, and a flagship
                security platform I lead as a builder, not a bystander.
              </p>
              <p className="mt-4 leading-relaxed text-mist">
                My playground is the Security Operations Center mindset — triaging alerts, reading
                packet captures like stories, and breaking things in the lab so they can't be broken
                in production. My direction is bigger than a job title: building security products
                the world actually uses.
              </p>
            </div>
            </Tilt>

            <Tilt data-reveal-child>
            <div className="h-full rounded-2xl border border-line/70 bg-panel/60 p-8 backdrop-blur glass-card">
              <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-dim">
                <GraduationCap className="h-4 w-4 text-magenta" /> EDUCATION.LOG
              </div>
              <div className="flex flex-col gap-5">
                {education.map((e) => (
                  <div key={e.degree} className="group flex gap-4" data-hover>
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full border-2 border-magenta bg-void transition-colors group-hover:bg-magenta" />
                      <div className="w-px flex-1 bg-line" />
                    </div>
                    <div className="pb-2">
                      <div className="font-display font-semibold text-cream">{e.degree}</div>
                      <div className="mt-0.5 text-sm text-mist">{e.school}</div>
                      <div className="mt-1 font-mono text-xs text-dim">
                        {e.period} · <span className="text-magenta/80">{e.detail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
