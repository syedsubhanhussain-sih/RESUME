import { useEffect, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { chapters, profile } from "../data";
import { scrollToId, getLenis } from "../motion";

/** Fixed nav with scroll progress + chapter links. */
export default function Nav({ visible }: { visible: boolean }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    const lenis = getLenis();
    if (lenis) lenis.on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // snap to the section within a second — no long cinematic glide from the menu
    scrollToId(id, { duration: 0.8 });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="glass border-b border-line/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => go("top")}
            className="font-mono text-sm font-bold tracking-widest text-cream"
            data-hover
          >
            SSH<span className="text-magenta">://</span>
            <span className="ml-2 hidden text-dim sm:inline">portfolio</span>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {chapters.slice(0, 7).map((c) => (
              <button
                key={c.id}
                onClick={() => go(c.id)}
                className="u-link group font-mono text-[11px] tracking-[0.25em] text-dim transition-colors hover:text-magenta"
                data-hover
              >
                <span className="mr-1 text-magenta/60">{c.num}</span>
                {c.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              download="Syed_Subhan_Hussain_Resume.pdf"
              className="hidden items-center gap-2 rounded-full border border-magenta/50 bg-magenta/10 px-4 py-2 font-mono text-xs tracking-widest text-magenta transition-all hover:bg-magenta hover:text-void hover:shadow-[0_0_24px_rgba(236,47,125,0.45)] sm:flex"
              data-hover
            >
              <FileDown className="h-4 w-4" /> RESUME
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg border border-line p-2 text-mist lg:hidden"
              aria-label="Menu"
              data-hover
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-magenta to-ember shadow-[0_0_12px_rgba(236,47,125,0.7)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`glass border-b border-line/60 transition-all duration-500 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {chapters.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-xs tracking-[0.25em] text-mist hover:bg-magenta/10 hover:text-magenta"
            >
              <span className="text-magenta/60">{c.num}</span> {c.label}
            </button>
          ))}
          <a
            href={profile.resume}
            download="Syed_Subhan_Hussain_Resume.pdf"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-magenta/50 bg-magenta/10 px-4 py-3 font-mono text-xs tracking-widest text-magenta"
          >
            <FileDown className="h-4 w-4" /> DOWNLOAD RESUME
          </a>
        </nav>
      </div>
    </header>
  );
}
