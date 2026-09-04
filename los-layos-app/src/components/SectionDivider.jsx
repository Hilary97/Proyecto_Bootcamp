/** Thin gold rule that marks the start of a landing section. */
export function SectionDivider() {
  return (
    <div
      className="mx-auto mb-16 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      aria-hidden="true"
    />
  );
}
