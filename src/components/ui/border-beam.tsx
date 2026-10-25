import * as React from "react";

/**
 * BorderBeam — integrated from the supplied shadcn component and adapted
 * to this codebase (Tailwind v3 + Vite, no shadcn/`@/` alias setup):
 * the `cn` import is replaced with a local join, and the `animate-border-beam`
 * utility + `@property --border-beam-angle` keyframes live in src/index.css
 * (the Tailwind v3 equivalent of the v4 @theme setup). Props/API unchanged.
 */

type BorderBeamTrigger = "hover" | "press";

interface BorderBeamProps extends React.ComponentProps<"div"> {
  /** Beam color — a solid color; it lights the head of the comet and fades along the tail. @default 'var(--primary)' */
  color?: string;
  /** How much of the border the comet spans, in percent of one lap. @default 10 */
  length?: number;
  /** Beam thickness in px. @default 1 */
  thickness?: number;
  /** Seconds for one full lap around the border. @default 5 */
  speed?: number;
  /** Seconds before the first lap starts. Negative values start mid-lap. @default 0 */
  delay?: number;
  /** Reveal only on interaction. Omit for always-on. */
  revealOn?: BorderBeamTrigger | BorderBeamTrigger[];
  /** Controlled visibility; OR-ed with `revealOn`. */
  reveal?: boolean;
  /** With revealOn="hover", keep the beam visible on touch devices. @default false */
  showOnTouch?: boolean;
  /** Scale the beam down while pressed. @default false */
  pressScale?: boolean;
}

const join = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

/* A conic sweep clipped to the border ring by an XOR mask, so the comet
   follows the wrapper's radius at any corner. */
const RING_MASK = "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)";

function BorderBeam({
  color = "var(--primary)",
  length = 10,
  thickness = 1,
  speed = 5,
  delay = 0,
  revealOn,
  reveal,
  showOnTouch = false,
  pressScale = false,
  className,
  style,
  children,
  ...props
}: BorderBeamProps) {
  const triggers = revealOn == null ? [] : Array.isArray(revealOn) ? revealOn : [revealOn];
  const managed = triggers.length > 0 || reveal !== undefined;
  const grouped = managed || pressScale;

  return (
    <div
      data-slot="border-beam"
      data-reveal-beam={managed ? triggers.join(" ") : undefined}
      data-revealed={reveal ? "" : undefined}
      data-show-on-touch={showOnTouch ? "" : undefined}
      className={join("relative rounded-xl", grouped && "group/beam", className)}
      style={
        {
          "--border-beam-duration": `${speed}s`,
          "--border-beam-delay": `${delay}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
      <span
        aria-hidden
        data-slot="border-beam-ring"
        className={join(
          "pointer-events-none absolute inset-0 rounded-[inherit] rtl:transform-[scaleX(-1)]",
          "beam-ring",
          managed && "opacity-0 [animation-play-state:paused]",
          managed && triggers.includes("hover") && "group-hover/beam:opacity-100 group-hover/beam:[animation-play-state:running]",
          managed && triggers.includes("press") && "group-active/beam:opacity-100 group-active/beam:[animation-play-state:running]",
          managed && reveal && "opacity-100 [animation-play-state:running]",
          pressScale && "group-active/beam:translate-y-px group-active/beam:scale-[0.97]",
          managed ? "transition-opacity duration-500 ease-out" : undefined,
        )}
        style={{
          background: `conic-gradient(from var(--border-beam-angle), transparent, ${color} ${length}%, transparent calc(${length}% * 1.2))`,
          padding: thickness,
          WebkitMask: RING_MASK,
          WebkitMaskComposite: "xor",
          mask: RING_MASK,
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}

export { BorderBeam };
export type { BorderBeamProps };
export default BorderBeam;
