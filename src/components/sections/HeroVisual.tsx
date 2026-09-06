/**
 * Hero visual — the five disciplines wired to one core.
 *
 * Replaces the stock cube JPEG. Drawn as vector so it stays sharp at any size,
 * weighs a few kB instead of 110, and carries motion the flat file could not.
 *
 * The restraint is deliberate: one slow signal travelling each spoke, one
 * breathing core, two drifting rings. Nothing bounces and nothing changes hue.
 * That is the difference between an enterprise diagram and a landing-page
 * gimmick.
 *
 * NO FRAME. There is no panel, border or fill behind this — the diagram sits
 * directly on the page. That is why every colour here is a `--hv-*` token
 * rather than a literal: on the navy ground the marks are pale, on the light
 * ground they invert to deep blue, and the same drawing serves both. Hard-coded
 * light-on-dark values would have gone invisible the moment the theme flipped.
 *
 * GEOMETRY — centre (280, 335), nodes on a circle of radius 215 starting at
 * twelve o'clock and stepping 72°. Each spoke is inset 74 at the core and 42 at
 * the node, so every one is exactly 99 long. That single length is published as
 * `--hv-len` and drives the dash animation for all five at once; change the
 * radius or either inset and this constant has to change with it.
 *
 * The viewBox is PORTRAIT (560x680) because the column it fills is as tall as
 * the copy beside it. A landscape box letterboxed to ~150px of dead band top
 * and bottom and left the diagram looking undersized. The radius is then held
 * back from the maximum the labels allow, so the outer nodes keep ~40px of air
 * either side instead of running into the column edge.
 *
 * Motion lives in globals.css (`hv-*` keyframes and classes) so the
 * reduced-motion block there switches all of it off in one place.
 */

const CX = 280;
const CY = 335;

/** Spoke length (215 − 74 core inset − 42 node inset). Drives the dasharray. */
const LEN = 99;

type Node = {
  key: string;
  label: string;
  x: number;
  y: number;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  /** Stagger, so the five signals do not fire as one pulse. */
  delay: string;
  glyph: React.ReactNode;
};

/* 24x24 glyphs, stroke-drawn at a common weight so the five read as one set. */
const monitor = (
  <>
    <rect x="3" y="4" width="18" height="12.5" rx="2" />
    <path d="M12 16.5V20M8.5 20h7" />
  </>
);
const magnifier = (
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.4 15.4 20.5 20.5" />
  </>
);
const megaphone = (
  <>
    <path d="M4 9.5v5l10 4.5V5L4 9.5Z" />
    <path d="M14 8.5h3a3 3 0 0 1 0 7h-3M6.5 15.5V19" />
  </>
);
const gear = (
  <>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
  </>
);
const shield = (
  <>
    <path d="M12 3.2 19.5 6v6c0 4.6-7.5 8.8-7.5 8.8S4.5 16.6 4.5 12V6L12 3.2Z" />
    <path d="M9.4 12.1l1.9 1.9 3.4-3.6" />
  </>
);

const nodes: Node[] = [
  {
    key: "web",
    label: "Web & Software",
    x: 280, y: 120,
    sx: 280, sy: 261, ex: 280, ey: 162,
    delay: "0s",
    glyph: monitor,
  },
  {
    key: "automation",
    label: "Automation",
    x: 484.5, y: 268.6,
    sx: 350.4, sy: 312.1, ex: 444.5, ey: 281.5,
    delay: "0.9s",
    glyph: gear,
  },
  {
    key: "security",
    label: "Cyber Security",
    x: 406.4, y: 508.9,
    sx: 323.5, sy: 394.9, ex: 381.7, ey: 475,
    delay: "1.8s",
    glyph: shield,
  },
  {
    key: "marketing",
    label: "Digital Marketing",
    x: 153.6, y: 508.9,
    sx: 236.5, sy: 394.9, ex: 178.3, ey: 475,
    delay: "2.7s",
    glyph: megaphone,
  },
  {
    key: "seo",
    label: "SEO Growth",
    x: 75.5, y: 268.6,
    sx: 209.6, sy: 312.1, ex: 115.5, ey: 281.5,
    delay: "3.6s",
    glyph: magnifier,
  },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 680"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ ["--hv-len" as string]: LEN }}
      role="img"
      aria-label="Five capabilities wired to one core: web and software, automation, cyber security, digital marketing and SEO growth."
    >
      <defs>
        {/* Radial wash so the centre has weight without a frame around it. */}
        <radialGradient id="hv-wash" cx="50%" cy="49%" r="52%">
          <stop offset="0%" stopColor="var(--hv-wash)" stopOpacity="0.20" />
          <stop offset="55%" stopColor="var(--hv-wash)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--hv-wash)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="560" height="680" fill="url(#hv-wash)" />

      {/* Two counter-rotating rings, both barely there. */}
      <g fill="none" stroke="var(--hv-line)" strokeLinecap="round">
        <circle
          className="hv-ring"
          cx={CX} cy={CY} r="215"
          strokeOpacity="0.45" strokeWidth="1.25"
          strokeDasharray="2 16"
        />
        <circle
          className="hv-ring hv-ring-rev"
          cx={CX} cy={CY} r="150"
          strokeOpacity="0.32" strokeWidth="1.25"
          strokeDasharray="54 32"
        />
      </g>

      {/* Spokes: a constant hairline, plus one lit dash running along it. */}
      <g fill="none" strokeLinecap="round">
        {nodes.map((n) => (
          <g key={`spoke-${n.key}`}>
            <line
              x1={n.sx} y1={n.sy} x2={n.ex} y2={n.ey}
              stroke="var(--hv-line)" strokeWidth="1.5"
            />
            <line
              className="hv-flow"
              style={{ animationDelay: n.delay }}
              x1={n.sx} y1={n.sy} x2={n.ex} y2={n.ey}
              stroke="var(--hv-pulse)" strokeWidth="3"
              strokeDasharray={`13 ${LEN - 13}`}
            />
          </g>
        ))}
      </g>

      {/* Core */}
      <g>
        <circle className="hv-core-halo" cx={CX} cy={CY} r="94" fill="var(--hv-wash)" />
        <circle cx={CX} cy={CY} r="70" fill="var(--hv-fill)" stroke="var(--hv-edge)" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r="59" fill="none" stroke="var(--hv-line)" strokeWidth="1" />
        {/* The arrow from the OnyxEra mark, redrawn at this scale. */}
        <g
          transform={`translate(${CX - 28} ${CY - 28})`}
          fill="none" stroke="var(--hv-glyph)" strokeWidth="3.3"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M10 47a21 21 0 1 1 17 7" strokeOpacity="0.72" />
          <path d="M20 36 47 9" />
          <path d="M34 9h13v13" />
        </g>
      </g>

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.key} className="hv-node" style={{ animationDelay: n.delay }}>
          <circle
            cx={n.x} cy={n.y} r="33"
            fill="var(--hv-fill)" stroke="var(--hv-edge)" strokeWidth="1.5"
          />
          <g
            transform={`translate(${n.x - 16} ${n.y - 16}) scale(1.333)`}
            fill="none" stroke="var(--hv-glyph)" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
          >
            {n.glyph}
          </g>
          <text
            x={n.x} y={n.y + 57}
            textAnchor="middle"
            fill="var(--hv-text)"
            fontSize="17"
            fontWeight="500"
            letterSpacing="0.01em"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
