import { Quote as QuoteIcon } from "lucide-react";

/**
 * Editorial pull-quote band — the operator's creed.
 * (His own words, not a fabricated testimonial.)
 */
export default function Quote() {
  return (
    <section className="relative z-10 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div
          className="card-sheen relative overflow-hidden rounded-3xl border border-magenta/25 bg-gradient-to-br from-magenta/[0.08] via-abyss to-void p-10 sm:p-14 glass-card"
          data-reveal
        >
          <QuoteIcon className="absolute -top-2 left-8 h-20 w-20 text-magenta/15" />
          <div className="rule-magenta mb-8" />
          <blockquote className="font-serif text-3xl font-medium italic leading-snug text-cream sm:text-5xl">
            "I break systems in the lab, so they can't be broken in{" "}
            <span className="text-magenta not-italic">production.</span>"
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-magenta/60" />
            <span className="font-mono text-xs tracking-[0.35em] text-mist">
              SYED'S OPERATING PRINCIPLE
            </span>
          </div>
          <div className="rule-magenta mt-8" />
        </div>
      </div>
    </section>
  );
}
