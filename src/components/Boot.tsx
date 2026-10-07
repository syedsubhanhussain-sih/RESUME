import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ShieldCheck } from "lucide-react";

const LINES = [
  "> ssh operator@syed-portfolio",
  "> verifying identity .................... OK",
  "> loading journey modules ............... OK",
  "> decrypting chapters [08] .............. OK",
  "> threat level: AMBITION ................. HIGH",
];

/** Cinematic boot gate — fast, skippable, then hands over to the hero. */
export default function Boot({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState(0);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: onDone,
    });
  };

  useEffect(() => {
    if (lines < LINES.length) {
      const t = setTimeout(() => setLines((l) => l + 1), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setReady(true), 350);
    const auto = setTimeout(finish, 3400);
    return () => { clearTimeout(t); clearTimeout(auto); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void px-6"
      onClick={finish}
    >
      <div className="w-full max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-magenta/40 bg-magenta/10">
            <ShieldCheck className="h-5 w-5 text-magenta" />
            <span className="absolute inset-0 animate-pulse-ring rounded-lg border border-magenta/50" />
          </span>
          <div className="font-mono text-xs tracking-[0.3em] text-dim">
            SECURE SESSION
          </div>
        </div>

        <div className="min-h-[168px] font-mono text-sm leading-7 text-mist sm:text-base">
          {LINES.slice(0, lines).map((l, i) => (
            <div key={i} className={i === 0 ? "text-cream" : ""}>
              {l}
            </div>
          ))}
          {lines < LINES.length && <span className="animate-blink text-magenta">▊</span>}
        </div>

        <div className="mt-6 h-px w-full bg-line">
          <div
            className="h-px bg-magenta shadow-[0_0_12px_rgba(236,47,125,0.8)] transition-all duration-300"
            style={{ width: `${(lines / LINES.length) * 100}%` }}
          />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); finish(); }}
          className={`mt-8 w-full rounded-lg border py-4 font-mono text-sm tracking-[0.35em] transition-all duration-500 ${
            ready
              ? "border-magenta/60 bg-magenta/10 text-magenta hover:bg-magenta hover:text-void hover:shadow-[0_0_40px_rgba(236,47,125,0.4)]"
              : "border-line text-dim"
          }`}
          data-hover
        >
          {ready ? "ACCESS GRANTED — ENTER" : "AUTHENTICATING…"}
        </button>
        <p className="mt-4 text-center font-mono text-[11px] tracking-widest text-dim">
          CLICK ANYWHERE TO SKIP
        </p>
      </div>
    </div>
  );
}
