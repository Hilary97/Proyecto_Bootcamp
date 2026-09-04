import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap.js";
import { setLenis, NAV_OFFSET } from "../lib/smoothScroll.js";

/**
 * Mounts Lenis smooth scroll and drives it from the GSAP ticker so
 * ScrollTrigger positions stay in sync. Skipped under reduced motion.
 */
export function useSmoothScroll({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: { offset: NAV_OFFSET },
    });

    const onScroll = () => ScrollTrigger.update();
    const tick = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
