import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Reveals the referenced element, or its `selector` children with a stagger,
 * the first time it enters the viewport. Returns the ref to attach.
 */
export function useReveal({
  y = 48,
  stagger = 0.12,
  start = "top 80%",
  selector,
} = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      const targets = selector ? gsap.utils.toArray(selector, root) : [root];

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
