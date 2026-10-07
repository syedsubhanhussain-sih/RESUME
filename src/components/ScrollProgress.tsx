import { useEffect, useRef } from "react";
import { getLenis } from "../motion";

/** Thin gradient scroll-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const lenis = getLenis();
    if (lenis) lenis.on("scroll", kick);
    window.addEventListener("scroll", kick, { passive: true });
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-magenta via-ember to-amber shadow-[0_0_12px_rgba(236,47,125,0.6)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
