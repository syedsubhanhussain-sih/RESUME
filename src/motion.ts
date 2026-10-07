import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
export function getLenis() {
  return lenis;
}

/** Smooth scroll + ScrollTrigger wiring. Call once in App. */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis?.raf(time);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/**
 * One-shot reveal engine. Any element with [data-reveal] fades/slides in on
 * scroll enter; [data-reveal-child] groups stagger; [data-count] animates
 * numbers; [data-bar] animates width to data-bar value.
 */
export function useReveals(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const kids = group.querySelectorAll("[data-reveal-child]");
        if (!kids.length) return;
        gsap.fromTo(
          kids,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
              },
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
        const w = el.dataset.bar || "0%";
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: w,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [active]);
}

/** Scroll to a section id via Lenis (falls back to native). */
export function scrollToId(id: string, opts?: { duration?: number }) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = opts?.duration ?? 1.4;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Re-measure scroll triggers once assets (images, fonts) settle, so
 * trigger positions stay accurate after late layout shifts.
 */
export function useRefreshOnLoad() {
  useEffect(() => {
    let settled = false;
    const refresh = () => {
      if (settled) return;
      settled = true;
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    const fallback = setTimeout(refresh, 4000);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(fallback);
    };
  }, []);
}

/**
 * Parallax layering (the Figma-parallax feel): any element with
 * [data-parallax="0.2"] drifts at a fraction of scroll speed via scrub.
 */
export function useParallax(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });
    return () => ctx.revert();
  }, [active]);
}

/**
 * Cinematic scroll layer — the "video-like" feel from scroll-choreography
 * references: velocity skew, hero scrub exit, char-split scrubbed titles,
 * and a sticky horizontal-scroll flagship (desktop).
 */
export function useCinematic(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1 — scroll-velocity skew (desktop, fine pointer only)
      mm.add("(min-width: 768px) and (pointer: fine)", () => {
        const wrap = document.getElementById("skew-wrap");
        const lenis = getLenis();
        if (!wrap || !lenis || reduced) return;
        const proxy = { skew: 0 };
        const setSkew = gsap.quickSetter(wrap, "skewY", "deg");
        const clampSkew = gsap.utils.clamp(-5, 5);
        const onScroll = ({ velocity }: any) => {
          gsap.to(proxy, {
            skew: clampSkew((velocity || 0) * -0.32),
            duration: 0.45,
            ease: "power3",
            overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          });
        };
        lenis.on("scroll", onScroll);
        return () => {
          lenis.off("scroll", onScroll);
          gsap.set(wrap, { skewY: 0 });
        };
      });

      // 2 — hero cinematic exit lives in Hero.tsx (rAF + refs).

      // 3 — char-split chapter titles, scrubbed like a film title sequence
      gsap.utils.toArray<HTMLElement>(".chapter-title").forEach((title) => {
        const chars = title.querySelectorAll(".ch-char");
        if (!chars.length) return;
        gsap.fromTo(
          chars,
          { yPercent: 118 },
          {
            yPercent: 0,
            ease: "power3.out",
            stagger: 0.014,
            scrollTrigger: reduced
              ? { trigger: title, start: "top 88%", once: true }
              : { trigger: title, start: "top 90%", end: "top 42%", scrub: 1 },
          }
        );
      });

      // 4 — flagship: sticky horizontal scroll (desktop only).
      // Travel is COMPUTED from the known panel geometry (intro 30vw +
      // 2 cards × 56vw + outro 34vw + 3 × gap-10 + 14vw padding) — no DOM
      // measurement, so no overshoot void is possible by construction.
      mm.add("(min-width: 768px)", () => {
        const section = document.getElementById("flagship");
        const track = section?.querySelector<HTMLElement>(".hscroll-track");
        if (!section || !track || reduced) return;
        const travel = () => {
          const vw = window.innerWidth;
          const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          const panels = vw * (0.3 + 0.56 + 0.56 + 0.34);
          const gaps = 3 * 2.5 * root;
          const pad = vw * 0.14;
          return Math.max(0, panels + gaps + pad - vw + vw * 0.02);
        };
        const sizeSection = () => {
          section.style.height = `calc(100vh + ${travel()}px)`;
        };
        sizeSection();
        const tween = gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: sizeSection,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          section.style.height = "";
          gsap.set(track, { x: 0 });
        };
      });
    });

    // 5 — sticky stacking cards: earlier cards recede as later ones arrive.
    const stacks = gsap.utils.toArray<HTMLElement>("[data-stack]");
    stacks.forEach((card, i) => {
      const next = stacks[i + 1];
      if (!next || reduced) return;
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.78,
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top 88%",
          end: "top 38%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    // 6 — missions timeline: white water-flow line grows with scroll;
    // each card fades/slides in exactly as the line's head reaches it.
    {
      const list = document.querySelector<HTMLElement>("#missions .timeline-list");
      const flowwrap = document.querySelector<HTMLElement>("#missions .timeline-flowwrap");
      const items = list
        ? Array.from(list.querySelectorAll<HTMLElement>(".timeline-item"))
        : [];
      if (list && flowwrap && items.length) {
        const showAll = () => {
          flowwrap.style.height = "100%";
          items.forEach((it) => {
            it.style.opacity = "1";
            it.style.transform = "none";
            it.querySelector(".timeline-node")?.classList.add("node-lit");
          });
        };
        if (reduced) {
          showAll();
        } else {
          let thresholds: number[] = [];
          const measure = () => {
            const h = list.offsetHeight || 1;
            thresholds = items.map((it) =>
              Math.min(0.99, (it.offsetTop + 70) / h)
            );
          };
          const prog = { v: 0 };
          const render = () => {
            flowwrap.style.height = `${(prog.v * 100).toFixed(2)}%`;
            items.forEach((it, i) => {
              const t = thresholds[i] ?? 1;
              // tight window: card starts as the head nears, completes exactly at the node
              const local = Math.min(1, Math.max(0, (prog.v - (t - 0.1)) / 0.1));
              const e = 1 - Math.pow(1 - local, 3);
              it.style.opacity = e.toFixed(3);
              it.style.transform = `translateY(${((1 - e) * 38).toFixed(1)}px)`;
              it.querySelector(".timeline-node")?.classList.toggle("node-lit", local >= 1);
            });
          };
          measure();
          render();
          gsap.to(prog, {
            v: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 72%",
              end: "bottom 58%",
              scrub: 0.4,
              invalidateOnRefresh: true,
              onRefresh: () => {
                measure();
                render();
              },
            },
            onUpdate: render,
          });
        }
      }
    }

    return () => ctx.revert();
  }, [active]);
}
