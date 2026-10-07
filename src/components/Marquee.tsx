import { Shield } from "lucide-react";
import { tickerItems } from "../data";

/** Infinite marquee ticker between hero and chapters. */
export default function Marquee({ slow = false }: { slow?: boolean }) {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="relative z-10 overflow-hidden border-y border-line/60 bg-abyss/70 py-4 backdrop-blur">
      <div className={`mask-fade-x flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 font-mono text-sm tracking-[0.3em] text-mist">
            {item}
            <Shield className="h-4 w-4 text-magenta/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
