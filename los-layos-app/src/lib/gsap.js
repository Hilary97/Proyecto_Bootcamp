import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Single registration point. Every hook and component imports from here,
// so tests mock one module instead of gsap itself.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 0.8 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  Boolean(window.matchMedia?.(REDUCED_MOTION_QUERY).matches);

export { gsap, ScrollTrigger, SplitText, useGSAP };
