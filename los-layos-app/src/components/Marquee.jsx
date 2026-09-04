import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "../lib/gsap.js";

const DEFAULT_ITEMS = [
  "Norteño",
  "Corridos",
  "Cumbia",
  "Bodas",
  "XV años",
  "Eventos",
];

const FILLED = "text-gold-400";
const OUTLINED = "text-transparent [-webkit-text-stroke:1.5px_#4FD1A0]";

function Track({ items, hidden = false }) {
  return (
    <ul
      data-marquee-track
      aria-hidden={hidden ? "true" : undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-center whitespace-nowrap font-display leading-none"
        >
          <span
            className={`px-6 text-5xl tracking-[0.06em] md:px-8 md:text-7xl ${
              index % 2 === 0 ? FILLED : OUTLINED
            }`}
          >
            {item}
          </span>
          <span className="text-2xl text-jade-400 md:text-3xl" aria-hidden="true">
            ♪
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Endless strip that drifts left and speeds up with scroll velocity.
 * Two identical tracks make the -50% loop seamless.
 */
export function Marquee({ items = DEFAULT_ITEMS }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const drift = gsap.to("[data-marquee-strip]", {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });

      const settle = gsap.delayedCall(0.4, () => {
        gsap.to(drift, { timeScale: 1, duration: 1.2, ease: "power2.out" });
      });

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 400,
          );
          drift.timeScale(boost);
          settle.restart(true);
        },
      });

      return () => {
        trigger.kill();
        settle.kill();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="relative overflow-hidden border-y border-gold-500/25 bg-gradient-to-r from-jade-900/70 via-ink-950 to-jade-900/70 py-6 md:py-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent"
        aria-hidden="true"
      />
      <div data-marquee-strip className="flex w-max items-center">
        <Track items={items} />
        <Track items={items} hidden />
      </div>
    </div>
  );
}
