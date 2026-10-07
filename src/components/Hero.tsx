import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, FileDown, Send } from "lucide-react";
import { profile, stats } from "../data";
import { scrollToId } from "../motion";
import Magnetic from "./Magnetic";

/** Typing effect for the role line. */
function useTyper(words: string[], active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    let wi = 0, ci = 0, del = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[wi];
      ci += del ? -1 : 1;
      setText(word.slice(0, ci));
      let ms = del ? 34 : 62;
      if (!del && ci === word.length) { ms = 1600; del = true; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; ms = 350; }
      t = setTimeout(tick, ms);
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [active, words]);
  return text;
}

/**
 * Chapter 00 — editorial hero. Giant PORTFOLIO serif backdrop with the
 * portrait overlapping it, magazine-style.
 */
export default function Hero({ active }: { active: boolean }) {
  const typed = useTyper(profile.roles, active);
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* Cinematic exit: fade/scale/drift the hero as it scrolls away.
     Driven by rAF reading the live rect — no ScrollTrigger involved. */
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (section && inner) {
        const rect = section.getBoundingClientRect();
        const total = Math.max(1, rect.height - window.innerHeight * 0.2);
        const p = Math.min(1, Math.max(0, -rect.top / total));
        inner.style.opacity = (1 - p * 0.92).toFixed(3);
        inner.style.transform = `translateY(${(-p * 16).toFixed(2)}%) scale(${(1 - p * 0.04).toFixed(4)})`;
        if (titleRef.current) {
          titleRef.current.style.transform = `translateX(${(-p * 7).toFixed(2)}%)`;
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-rise",
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1, delay: 0.15 }
      );
      gsap.fromTo(
        ".hero-photo",
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.6, ease: "power4.inOut", delay: 0.35 }
      );
      gsap.fromTo(
        ".hero-fade",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.9 }
      );
    });
    return () => ctx.revert();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-24 sm:px-8"
    >
      {/* giant backdrop word */}
      <div
        aria-hidden
        data-parallax="-0.18"
        className="pointer-events-none absolute inset-x-0 top-[16%] select-none text-center font-serif text-[19vw] font-bold leading-none tracking-tight text-magenta/[0.16]"
      >
        PORTFOLIO
      </div>
      <div
        aria-hidden
        data-parallax="0.12"
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-magenta/[0.07] blur-[120px]"
      />

      <div ref={innerRef} className="hero-inner relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        {/* left: editorial intro */}
        <div>
          <div className="hero-rise font-serif text-2xl italic text-magenta sm:text-3xl">
            Hello, I'm
          </div>
          <h1 ref={titleRef} className="hero-title mt-2 font-serif font-bold leading-[0.95] tracking-tight" style={{ perspective: "800px" }}>
            <span className="hero-rise block text-[clamp(3rem,8vw,6.5rem)] text-cream">
              SYED SUBHAN
            </span>
            <span className="hero-rise text-ig block text-[clamp(3rem,8vw,6.5rem)]">
              HUSSAIN
            </span>
          </h1>

          <div className="hero-fade mt-6 font-mono text-xs tracking-[0.35em] text-magenta sm:text-sm">
            CYBER SECURITY ANALYST
          </div>
          <div className="hero-fade mt-3 flex h-7 items-center font-mono text-base text-mist sm:text-lg">
            <span className="mr-2 text-magenta/70">&gt;_</span>
            <span>{typed}</span>
            <span className="animate-blink text-magenta">▊</span>
          </div>

          <p className="hero-fade mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {profile.tagline}
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
            <Magnetic
              onClick={() => scrollToId("origin")}
              className="bg-ig rounded-full px-8 py-4 font-mono text-sm font-bold tracking-widest text-white shadow-[0_0_36px_rgba(236,47,125,0.35)] transition-shadow hover:shadow-[0_0_54px_rgba(236,47,125,0.6)]"
            >
              <span className="flex items-center gap-2">
                START THE JOURNEY <ArrowDown className="h-4 w-4" />
              </span>
            </Magnetic>
            <Magnetic
              onClick={() => scrollToId("contact")}
              className="rounded-full border border-line bg-panel/60 px-8 py-4 font-mono text-sm tracking-widest text-cream backdrop-blur transition-colors hover:border-magenta/60 hover:text-magenta"
            >
              <span className="flex items-center gap-2">
                GET IN TOUCH <Send className="h-4 w-4" />
              </span>
            </Magnetic>
            <a
              href={profile.resume}
              download="Syed_Subhan_Hussain_Resume.pdf"
              className="group flex items-center gap-2 px-2 py-4 font-mono text-sm tracking-widest text-dim transition-colors hover:text-magenta"
              data-hover
            >
              <FileDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              RESUME.PDF
            </a>
          </div>

          <div className="hero-fade mt-8 inline-flex items-center gap-2 rounded-full border border-magenta/40 bg-magenta/[0.07] px-4 py-2 font-mono text-[11px] tracking-[0.3em] text-magenta">
            <span className="inline-block h-2 w-2 animate-blink rounded-full bg-magenta" />
            OPEN TO OPPORTUNITIES
          </div>
        </div>

        {/* right: portrait overlapping the giant type */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="hero-photo relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-magenta/25 shadow-[0_30px_120px_rgba(236,47,125,0.12)]">
            <img
              src="/profile-photo.jpg"
              alt="Syed Subhan Hussain"
              className="aspect-[3/4] w-full object-cover object-top grayscale brightness-[0.82] contrast-[1.08]"
            />
            {/* dark solidifying overlays — portrait stays deep, never washed out */}
            <div className="absolute inset-0 bg-void/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
          </div>
          {/* corner ticks */}
          <div className="absolute -left-3 top-10 h-10 w-10 border-l-2 border-t-2 border-magenta/70" />
          <div className="absolute -right-3 top-10 h-10 w-10 border-r-2 border-t-2 border-magenta/70" />
          <div className="hero-fade absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-abyss/90 px-6 py-2.5 font-mono text-[11px] tracking-[0.3em] text-mist backdrop-blur">
            BIDAR · INDIA — <span className="text-magenta">EST. 2027</span>
          </div>
        </div>
      </div>

      {/* stats strip — editorial rule */}
      <div className="hero-fade relative z-10 mx-auto mt-20 w-full max-w-7xl">
        <div className="rule-magenta mb-8" />
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="tnum font-serif text-5xl font-bold text-ig sm:text-6xl">
                <span data-count={s.value}>0</span>
                <span className="text-3xl align-top">{s.suffix || "+"}</span>
              </div>
              <div className="mt-2 font-mono text-[11px] tracking-[0.25em] text-dim">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-fade absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <button
          onClick={() => scrollToId("origin")}
          className="flex flex-col items-center gap-2 text-dim transition-colors hover:text-magenta"
          aria-label="Scroll down"
          data-hover
        >
          <span className="font-mono text-[10px] tracking-[0.4em]">SCROLL</span>
          <span className="block h-10 w-px overflow-hidden bg-line">
            <span className="block h-4 w-px animate-bounce bg-magenta" />
          </span>
        </button>
      </div>
    </section>
  );
}
