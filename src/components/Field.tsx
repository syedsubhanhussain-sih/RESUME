import { useEffect, useRef } from "react";

/**
 * Living photograph — the rings image as a "live image" background.
 * Three depth layers move at different speeds (atmosphere / photo /
 * star-dust), with a slow perpetual Ken-Burns drift and mouse camera
 * parallax. Slow, cinematic, never jarring.
 */
export default function Field() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const far = farRef.current!;
    const mid = midRef.current!;
    const canvas = nearRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    let mx = 0.5, my = 0.5, smx = 0.5, smy = 0.5;
    let raf = 0;
    const t0 = performance.now();

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; tw: number; depth: number };
    let motes: Mote[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const n = Math.min(80, Math.floor((w * h) / 22000));
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.1,
        tw: Math.random() * Math.PI * 2,
        depth: 0.3 + Math.random() * 0.7,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / Math.max(1, window.innerWidth);
      my = e.clientY / Math.max(1, window.innerHeight);
    };

    const step = (now: number) => {
      const t = (now - t0) / 1000; // seconds
      smx += (mx - smx) * 0.035;
      smy += (my - smy) * 0.035;
      const px = smx - 0.5, py = smy - 0.5;

      // slow-motion drift (breathing, ~50s cycle)
      const dx = Math.sin(t / 26) * 16 + Math.sin(t / 47) * 8;
      const dy = Math.cos(t / 31) * 12 + Math.cos(t / 53) * 6;
      const zoom = 1.1 + Math.sin(t / 44) * 0.035;

      // far: atmosphere barely moves (depth anchor)
      far.style.transform = `translate(${(-px * 10 + dx * 0.25).toFixed(1)}px, ${(-py * 10 + dy * 0.25).toFixed(1)}px) scale(${(zoom + 0.12).toFixed(4)})`;
      // mid: the photograph itself
      mid.style.transform = `translate(${(-px * 22 + dx * 0.6).toFixed(1)}px, ${(-py * 22 + dy * 0.6).toFixed(1)}px) scale(${zoom.toFixed(4)})`;

      paintStars(t, 0, 0, 0, 0);
      raf = requestAnimationFrame(step);
    };

    // near: star-dust layer (also used for the single static frame on touch)
    const paintStars = (t: number, px: number, py: number, dx: number, dy: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy;
        if (m.x < -4) m.x = w + 4; if (m.x > w + 4) m.x = -4;
        if (m.y < -4) m.y = h + 4; if (m.y > h + 4) m.y = -4;
        const a = (0.18 + m.depth * 0.5) * (0.6 + 0.4 * Math.sin(t * 1.4 + m.tw));
        ctx.fillStyle = `rgba(235,240,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          m.x - px * 70 * m.depth + dx * 0.9 * m.depth,
          m.y - py * 70 * m.depth + dy * 0.9 * m.depth,
          m.r * m.depth,
          0, Math.PI * 2
        );
        ctx.fill();
      }
    };

    resize();
    if (!reduced && !coarse) {
      raf = requestAnimationFrame(step);
      window.addEventListener("mousemove", onMove, { passive: true });
    } else {
      // static, flicker-free backdrop on touch devices / reduced motion:
      // one composed frame, no per-frame repaints behind the glass.
      mid.style.transform = "scale(1.08)";
      far.style.transform = "scale(1.2)";
      paintStars(1.7, 0, 0, 0, 0);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* far: blurred atmosphere filling the edges */}
      <div ref={farRef} className="absolute -inset-10 will-change-transform">
        <img
          src="/rings-bg.jpg"
          alt=""
          className="h-full w-full object-cover blur-[36px] brightness-[0.55] saturate-[0.8]"
        />
      </div>
      {/* mid: the photograph */}
      <div ref={midRef} className="absolute -inset-10 will-change-transform">
        <img src="/rings-bg.jpg" alt="" className="h-full w-full object-cover" />
      </div>
      {/* near: drifting star-dust */}
      <canvas ref={nearRef} className="absolute inset-0 h-full w-full" />
      {/* readability veil + whisper of theme tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/20 to-void/75" />
      <div className="absolute inset-0 bg-gradient-to-tr from-grape/15 via-transparent to-magenta/[0.07]" />
    </div>
  );
}
