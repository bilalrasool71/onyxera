/**
 * The figure that fills the right half of a service page hero.
 *
 * One per service, and each one draws what that service actually does rather
 * than a generic tech motif: SEO climbs a ranking, web application assembles an
 * interface, marketing runs a funnel into growth, automation moves a signal
 * along a wired path, cyber security sweeps a surface for threats.
 *
 * Server-rendered SVG with CSS animation — no client component, no library, no
 * JavaScript on the page. Every colour is a brand token so the figure repaints
 * with the theme, and the global prefers-reduced-motion rule parks each one in
 * a composed state instead of freezing it mid-move.
 *
 * `aria-hidden`: the hero heading already says what the service is, so a
 * screen reader announcing the diagram twice would only add noise.
 */

const FRAME = "h-auto w-full max-w-lg lg:max-w-none";

/* Shared chrome so the five figures sit on the same surface. */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="card relative overflow-hidden p-6 md:p-8">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SEO — a result climbing to the top of the page                      */
/* ------------------------------------------------------------------ */

function SeoVisual() {
  return (
    <svg viewBox="0 0 460 340" className={FRAME} role="presentation">
      {/* search field */}
      <rect x="20" y="18" width="420" height="46" rx="23" fill="var(--glass-strong)" stroke="var(--line-strong)" />
      <circle cx="50" cy="41" r="9" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <line x1="57" y1="48" x2="64" y2="55" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="80" y="35" width="150" height="6" rx="3" fill="var(--fg-faint)" opacity="0.55" />
      <rect x="80" y="47" width="88" height="5" rx="2.5" fill="var(--fg-faint)" opacity="0.3" />

      {/* the three results. The middle one climbs; the other two step down to
          make room, so the stack stays honest rather than overlapping. */}
      <g style={{ animation: "svg-rank-fall 7s var(--ease-in-out-soft) infinite" }}>
        <rect x="20" y="92" width="420" height="46" rx="12" fill="var(--surface)" stroke="var(--line)" />
        <rect x="38" y="106" width="120" height="6" rx="3" fill="var(--fg-faint)" opacity="0.5" />
        <rect x="38" y="119" width="220" height="5" rx="2.5" fill="var(--fg-faint)" opacity="0.28" />
      </g>
      <g style={{ animation: "svg-rank-fall 7s var(--ease-in-out-soft) infinite" }}>
        <rect x="20" y="148" width="420" height="46" rx="12" fill="var(--surface)" stroke="var(--line)" />
        <rect x="38" y="162" width="96" height="6" rx="3" fill="var(--fg-faint)" opacity="0.5" />
        <rect x="38" y="175" width="190" height="5" rx="2.5" fill="var(--fg-faint)" opacity="0.28" />
      </g>

      {/* the client's page */}
      <g style={{ animation: "svg-rank-rise 7s var(--ease-in-out-soft) infinite" }}>
        <rect x="20" y="204" width="420" height="46" rx="12" fill="var(--brand-surface)" stroke="var(--brand-line)" />
        <rect x="38" y="218" width="140" height="6" rx="3" fill="#fff" opacity="0.95" />
        <rect x="38" y="231" width="230" height="5" rx="2.5" fill="#fff" opacity="0.6" />
        <circle cx="410" cy="227" r="14" fill="#fff" />
        <text
          x="410"
          y="232"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--color-navy-900)"
          fontFamily="var(--font-display)"
        >
          1
        </text>
      </g>

      {/* answer-engine signal: the brief's AEO / AI search line, drawn */}
      <line
        x1="20" y1="288" x2="440" y2="288"
        stroke="var(--accent-quiet)" strokeWidth="2" strokeLinecap="round"
        strokeDasharray="6 8"
        style={{ animation: "svg-dash-flow 1.6s linear infinite" }}
      />
      {[70, 170, 270, 370].map((x, i) => (
        <circle
          key={x}
          cx={x} cy="288" r="5" fill="var(--accent)"
          style={{ animation: `svg-glow 2.4s ease-in-out ${i * 0.3}s infinite` }}
        />
      ))}
      <text x="20" y="320" fontSize="12" fill="var(--fg-faint)" fontFamily="var(--font-label)" letterSpacing="1.6">
        SEARCH + AI ANSWERS
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Web application — an interface assembling itself                    */
/* ------------------------------------------------------------------ */

function WebAppVisual() {
  const blocks = [
    { x: 36, y: 108, w: 150, h: 74, d: 0 },
    { x: 198, y: 108, w: 226, h: 74, d: 0.35 },
    { x: 36, y: 194, w: 226, h: 96, d: 0.7 },
    { x: 274, y: 194, w: 150, h: 96, d: 1.05 },
  ];
  return (
    <svg viewBox="0 0 460 340" className={FRAME} role="presentation">
      <rect x="20" y="20" width="420" height="300" rx="16" fill="var(--surface)" stroke="var(--line-strong)" />
      {/* window chrome */}
      <line x1="20" y1="66" x2="440" y2="66" stroke="var(--line)" strokeWidth="1.5" />
      {[42, 62, 82].map((cx, i) => (
        <circle key={cx} cx={cx} cy="43" r="5" fill="var(--fg-faint)" opacity={0.5 - i * 0.12} />
      ))}
      <rect x="110" y="36" width="200" height="14" rx="7" fill="var(--glass-strong)" />

      {blocks.map((b) => (
        <g key={`${b.x}-${b.y}`} style={{ animation: `svg-pop 6s var(--ease-out-soft) ${b.d}s infinite` }}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="10" fill="var(--glass-strong)" stroke="var(--accent-icon)" strokeOpacity="0.4" />
          <rect x={b.x + 16} y={b.y + 16} width={b.w * 0.42} height="6" rx="3" fill="var(--accent)" opacity="0.85" />
          <rect x={b.x + 16} y={b.y + 30} width={b.w * 0.66} height="5" rx="2.5" fill="var(--fg-faint)" opacity="0.35" />
          <rect x={b.x + 16} y={b.y + 42} width={b.w * 0.55} height="5" rx="2.5" fill="var(--fg-faint)" opacity="0.22" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Digital marketing — spend in the top, qualified leads out the bottom */
/* ------------------------------------------------------------------ */

function MarketingVisual() {
  return (
    <svg viewBox="0 0 460 340" className={FRAME} role="presentation">
      {/* traffic arriving */}
      {[90, 150, 210, 270, 330].map((x, i) => (
        <circle
          key={x}
          cx={x} cy="34" r="6" fill="var(--accent)"
          style={{ animation: `svg-drop 3.2s ease-in ${i * 0.24}s infinite` }}
        />
      ))}

      {/* the funnel */}
      <path
        d="M60 74 H400 L268 190 V246 H192 V190 Z"
        fill="var(--glass-strong)"
        stroke="var(--accent-icon)"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <line x1="120" y1="112" x2="340" y2="112" stroke="var(--line-strong)" strokeWidth="1.5" />
      <line x1="160" y1="150" x2="300" y2="150" stroke="var(--line-strong)" strokeWidth="1.5" />

      {/* what comes out: a growing bar chart. `transform-box` so scaleY runs
          from the bar's own baseline, not the SVG origin. */}
      {[
        { x: 196, h: 34, d: 0 },
        { x: 246, h: 54, d: 0.25 },
        { x: 296, h: 74, d: 0.5 },
        { x: 346, h: 96, d: 0.75 },
      ].map((b) => (
        <rect
          key={b.x}
          x={b.x} y={306 - b.h} width="34" height={b.h} rx="6"
          fill="var(--accent)"
          style={{
            transformBox: "fill-box",
            transformOrigin: "bottom",
            animation: `svg-bar-grow 4.4s var(--ease-out-soft) ${b.d}s infinite`,
          }}
        />
      ))}
      <line x1="60" y1="306" x2="400" y2="306" stroke="var(--line-strong)" strokeWidth="2" strokeLinecap="round" />
      <text x="60" y="330" fontSize="12" fill="var(--fg-faint)" fontFamily="var(--font-label)" letterSpacing="1.6">
        CLICKS TO CUSTOMERS
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Automation — a signal moving through a wired workflow               */
/* ------------------------------------------------------------------ */

function AutomationVisual() {
  const nodes = [
    { x: 66, y: 76, label: "IN" },
    { x: 230, y: 76 },
    { x: 394, y: 170 },
    { x: 230, y: 264 },
    { x: 66, y: 264, label: "OUT" },
  ];
  return (
    <svg viewBox="0 0 460 340" className={FRAME} role="presentation">
      {/* the path, drawn once as a flowing dash so the whole route reads as live */}
      <path
        d="M66 76 H230 M230 76 H340 Q394 76 394 130 V170 M394 170 V210 Q394 264 340 264 H230 M230 264 H66"
        fill="none"
        stroke="var(--accent-quiet)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 9"
        style={{ animation: "svg-dash-flow 1.3s linear infinite" }}
      />

      {nodes.map((n, i) => (
        <g key={`${n.x}-${n.y}`}>
          <circle
            cx={n.x} cy={n.y} r="30"
            fill="var(--surface)" stroke="var(--accent-icon)" strokeOpacity="0.5" strokeWidth="2"
          />
          <circle
            cx={n.x} cy={n.y} r="11" fill="var(--accent)"
            style={{ animation: `svg-glow 2.6s ease-in-out ${i * 0.35}s infinite` }}
          />
          {n.label && (
            <text
              x={n.x} y={n.y + 50} textAnchor="middle" fontSize="11"
              fill="var(--fg-faint)" fontFamily="var(--font-label)" letterSpacing="1.4"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}

      {/* the gear that keeps turning with nobody watching it */}
      <g style={{ transformOrigin: "230px 170px", animation: "svg-spin 14s linear infinite" }}>
        <circle cx="230" cy="170" r="34" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
        {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
          <rect
            key={a}
            x="226" y="128" width="8" height="14" rx="2"
            fill="var(--accent-quiet)"
            transform={`rotate(${a} 230 170)`}
          />
        ))}
      </g>
      <circle cx="230" cy="170" r="13" fill="var(--brand-surface)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Cyber security — a surface being swept, threats caught              */
/* ------------------------------------------------------------------ */

function SecurityVisual() {
  return (
    <svg viewBox="0 0 460 340" className={FRAME} role="presentation">
      <defs>
        <clipPath id="shield-clip">
          <path d="M230 26 L378 82 V178 C378 250 316 296 230 318 C144 296 82 250 82 178 V82 Z" />
        </clipPath>
      </defs>

      <path
        d="M230 26 L378 82 V178 C378 250 316 296 230 318 C144 296 82 250 82 178 V82 Z"
        fill="var(--glass-strong)"
        stroke="var(--accent-icon)"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />

      {/* the sweep, clipped to the shield so it never spills past the edge */}
      <g clipPath="url(#shield-clip)">
        <rect
          x="82" y="26" width="296" height="4" fill="var(--accent)"
          style={{ animation: "svg-sweep 3.6s linear infinite" }}
        />
        <rect
          x="82" y="30" width="296" height="52" fill="var(--accent)" opacity="0.12"
          style={{ animation: "svg-sweep 3.6s linear infinite" }}
        />
      </g>

      {/* padlock */}
      <path
        d="M212 168 V152 a18 18 0 0 1 36 0 V168"
        fill="none" stroke="var(--accent-strong)" strokeWidth="7" strokeLinecap="round"
      />
      <rect x="196" y="168" width="68" height="54" rx="10" fill="var(--brand-surface)" />
      <circle cx="230" cy="192" r="6" fill="#fff" />
      <rect x="227" y="192" width="6" height="14" rx="3" fill="#fff" />

      {/* threats found and stopped */}
      {[
        { x: 128, y: 118, d: 0 },
        { x: 330, y: 138, d: 1.2 },
        { x: 150, y: 244, d: 2.4 },
      ].map((t) => (
        <g key={`${t.x}-${t.y}`} style={{ animation: `svg-pop 4.8s var(--ease-out-soft) ${t.d}s infinite` }}>
          <circle cx={t.x} cy={t.y} r="15" fill="var(--danger)" opacity="0.16" />
          <circle cx={t.x} cy={t.y} r="15" fill="none" stroke="var(--danger)" strokeWidth="1.8" />
          <line x1={t.x - 6} y1={t.y - 6} x2={t.x + 6} y2={t.y + 6} stroke="var(--danger)" strokeWidth="2.4" strokeLinecap="round" />
          <line x1={t.x + 6} y1={t.y - 6} x2={t.x - 6} y2={t.y + 6} stroke="var(--danger)" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const BY_SLUG: Record<string, () => React.JSX.Element> = {
  "seo-and-ai-seo": SeoVisual,
  "development-solutions": WebAppVisual,
  "digital-marketing": MarketingVisual,
  automation: AutomationVisual,
  "cyber-security": SecurityVisual,
};

/* Rendered illustrations stood in these five folds for a while and have been
   taken back out. They are dark-navy artwork, so on the light theme they read
   as a picture pasted onto the page rather than part of it, and the style is
   the one every agency site is using. The drawings below are themed, so they
   change with the palette, and they are the client's own.

   The artwork is still in `public/images/` — `development-solutions-hero`,
   `seo-and-ai-seo-hero`, `digital-marketing-hero`, `cyber-security-hero`,
   `automation-hero-visual` — if the decision goes the other way again. */

export function ServiceHeroVisual({ slug }: { slug: string }) {
  const Visual = BY_SLUG[slug];
  /* A service with no figure renders nothing and the hero falls back to its
     single-column layout, rather than showing an empty panel. */
  if (!Visual) return null;

  return (
    <div aria-hidden="true">
      <Panel>
        <Visual />
      </Panel>
    </div>
  );
}
