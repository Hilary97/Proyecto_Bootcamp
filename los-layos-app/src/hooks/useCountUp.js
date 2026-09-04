import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Counts the element's text from 0 up to `to` when it scrolls into view.
 * Render the final value as the initial text so it reads without JS.
 */
export function useCountUp({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { value: 0 };
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [to, suffix, duration] },
  );

  return ref;
}
