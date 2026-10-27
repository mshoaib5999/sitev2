import * as React from "react";

/**
 * SocialLinks — integrated from the supplied shadcn/framer-motion spec and
 * adapted to this codebase (Tailwind v3 + Vite, no shadcn alias): the
 * framer-motion pop is reproduced with React state + CSS transitions, and
 * the hover images are the platforms' brand glyphs (Simple Icons /
 * Font Awesome paths) as inline SVG in the site's gold branding — no
 * external CDN assets. Behaviour follows the spec: hovering a name dims
 * the others while a glyph tile floats up above the name with a slight
 * random tilt; a click gives a short scale pulse.
 */

export type SocialIconKey = "facebook" | "instagram" | "linkedin";

const ICONS: Record<SocialIconKey, { vb: string; d: string }> = {
  facebook: { vb: "0 0 24 24", d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
  instagram: { vb: "0 0 24 24", d: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" },
  linkedin: { vb: "0 0 448 512", d: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" }
};

/** Official brand looks: the pop tile IS the app icon (solid/gradient
 *  brand background, white glyph) — the supplied demo's style. */
const ICON_BG: Record<SocialIconKey, string> = {
  facebook: "linear-gradient(180deg, #18ACFE, #0163E0)",
  instagram:
    "radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
  linkedin: "#0A66C2",
};

export interface Social {
  name: string;
  href: string;
  icon: SocialIconKey;
}

export function SocialLinks({ socials }: { socials: Social[] }) {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState(0);
  const [pulsed, setPulsed] = React.useState<string | null>(null);

  const pulse = (name: string) => {
    setPulsed(name);
    window.setTimeout(() => setPulsed((p) => (p === name ? null : p)), 220);
  };

  return (
    <div className="flex items-center justify-center flex-wrap">
      {socials.map((s) => {
        const isHovered = hovered === s.name;
        const icon = ICONS[s.icon];
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="relative block px-5 py-2 no-underline transition-opacity duration-200"
            style={{ opacity: hovered && !isHovered ? 0.45 : 1 }}
            onMouseEnter={() => {
              setHovered(s.name);
              setRotation(Math.random() * 20 - 10);
            }}
            onMouseLeave={() => setHovered(null)}
            onClick={() => pulse(s.name)}
            aria-label={`${s.name} profile`}
          >
            <span
              className="block transition-colors duration-200"
              style={{ fontSize: "17px", fontWeight: 550, letterSpacing: "0.005em", color: isHovered ? "var(--color-text)" : "var(--color-muted)" }}
            >
              {s.name}
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 flex items-center justify-center pointer-events-none"
              style={{
                bottom: "calc(100% + 12px)",
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: ICON_BG[s.icon],
                boxShadow: "0 16px 34px -12px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.18)",
                opacity: isHovered ? 1 : 0,
                transform: `translateX(-50%) translateY(${isHovered ? "0" : "10px"}) rotate(${rotation}deg) scale(${pulsed === s.name ? 1.25 : isHovered ? 1 : 0.8})`,
                filter: isHovered ? "blur(0px)" : "blur(2px)",
                transition: "opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease",
                zIndex: 5,
              }}
            >
              <svg viewBox={icon.vb} width="34" height="34" fill="#FFFFFF" aria-hidden="true">
                <path d={icon.d} />
              </svg>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
