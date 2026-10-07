import { useState, type ReactNode } from "react";

/**
 * Tap/click-to-flip card. Pure CSS 3D — both faces share one grid cell so
 * the card auto-sizes to the taller face. Touch-safe by construction.
 */
export default function FlipCard({
  front,
  back,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip ${className}`}
      onClick={() => setFlipped((f) => !f)}
      data-hover
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className={`flip-inner${flipped ? " flipped" : ""}`}>
        <div className="flip-face">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
