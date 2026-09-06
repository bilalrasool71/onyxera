/**
 * Five filled stars, gold.
 *
 * The brief asks for these by name ("star golden wale lazmi hon") and the
 * supplied reference card leads with them, so gold is a deliberate exception to
 * a palette that is otherwise navy, blue and white. It is kept to this one
 * component and driven by `--star` so the exception stays traceable rather than
 * leaking into the rest of the system as a loose hex.
 *
 * Decorative: the rating is not a claim the site makes anywhere in text, so the
 * row is hidden from assistive tech rather than announced as a score.
 */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {/* `style`, not a `fill="var(--star)"` presentation attribute: SVG
          attributes are parsed as SVG values, not CSS, so var() in one resolves
          to nothing and the stars render black. */}
      <svg
        viewBox="0 0 116 20"
        style={{ fill: "var(--star)" }}
        className="h-[1.05rem] w-auto"
        role="presentation"
      >
        {[0, 24, 48, 72, 96].map((x) => (
          <path
            key={x}
            transform={`translate(${x} 0)`}
            d="M10 1.2l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 14.7l-5.2 2.8 1-5.9L1.5 7.4l5.9-.8L10 1.2Z"
          />
        ))}
      </svg>
    </span>
  );
}
