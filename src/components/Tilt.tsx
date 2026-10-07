import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";

/**
 * 3D tilt wrapper — cursor-driven rotateX/rotateY with buttery rAF lerp,
 * a cursor-tracking glare highlight, and optional [data-depth] parallax
 * layers inside for true 3D pop. Desktop fine-pointer only.
 */
export default function Tilt({
  children,
  className = "",
  max = 12,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  max?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const inner = innerRef.current!;
    const glare = glareRef.current!;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(inner.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    let running = false;
    let hovering = false;
    // targets
    let trx = 0, try_ = 0, tgx = 50, tgy = 50;
    // current (lerped)
    let crx = 0, cry = 0, cgx = 50, cgy = 50;

    const step = () => {
      crx += (trx - crx) * 0.12;
      cry += (try_ - cry) * 0.12;
      cgx += (tgx - cgx) * 0.15;
      cgy += (tgy - cgy) * 0.15;
      inner.style.transform = `rotateX(${crx.toFixed(3)}deg) rotateY(${cry.toFixed(3)}deg)`;
      glare.style.setProperty("--gx", `${cgx.toFixed(1)}%`);
      glare.style.setProperty("--gy", `${cgy.toFixed(1)}%`);
      glare.style.opacity = hovering ? "1" : "0";
      const settled =
        Math.abs(trx - crx) < 0.02 &&
        Math.abs(try_ - cry) < 0.02 &&
        Math.abs(tgx - cgx) < 0.1 &&
        !hovering;
      if (settled) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      try_ = px * max * 2; // rotateY ±max
      trx = -py * max * 1.6; // rotateX ±max*0.8
      tgx = (px + 0.5) * 100;
      tgy = (py + 0.5) * 100;
      for (const l of layers) {
        const d = parseFloat(l.dataset.depth || "0.5");
        l.style.transform = `translate3d(${(px * d * 26).toFixed(1)}px, ${(py * d * 26).toFixed(1)}px, 0)`;
      }
      kick();
    };
    const onEnter = () => {
      hovering = true;
      kick();
    };
    const onLeave = () => {
      hovering = false;
      trx = 0; try_ = 0; tgx = 50; tgy = 50;
      for (const l of layers) l.style.transform = "";
      kick();
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "1000px" }} {...rest}>
      <div ref={innerRef} className="tilt-inner relative h-full">
        {children}
        <div ref={glareRef} aria-hidden className="tilt-glare" />
      </div>
    </div>
  );
}
