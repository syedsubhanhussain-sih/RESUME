/**
 * Numbered cinematic chapter heading.
 * Title format: lines separated by \n, accent wrapped in *asterisks*.
 * Each character rises on scroll-scrub like a film title sequence.
 */
export default function Chapter({
  num,
  label,
  title,
  sub,
}: {
  num: string;
  label: string;
  title: string;
  sub?: string;
}) {
  const renderLine = (line: string, li: number) => (
    <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      {line.split(/(\*[^*]+\*)/g).map((part, pi) => {
        const accent = part.startsWith("*") && part.endsWith("*");
        const text = accent ? part.slice(1, -1) : part;
        return (
          <span key={pi} className={accent ? "text-ig" : undefined}>
            {text.split("").map((c, ci) => (
              <span key={ci} className="ch-char inline-block will-change-transform">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );

  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-5 flex items-center gap-4" data-reveal>
        <span className="font-mono text-sm text-magenta">{num}</span>
        <span className="h-px w-12 bg-magenta/50" />
        <span className="font-mono text-xs tracking-[0.4em] text-dim">{label}</span>
      </div>
      <h2 className="chapter-title font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-cream sm:text-7xl">
        {title.split("\n").map(renderLine)}
      </h2>
      {sub && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg" data-reveal>
          {sub}
        </p>
      )}
    </div>
  );
}
