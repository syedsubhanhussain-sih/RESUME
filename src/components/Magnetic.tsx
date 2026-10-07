import { useRef, type ReactNode, type MouseEvent } from "react";

/** Button that gravitates toward the cursor. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
  ...rest
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "translate(0px,0px)";
    setTimeout(() => (el.style.transition = ""), 500);
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      data-hover
      {...rest}
    >
      {children}
    </button>
  );
}
