import { useEffect, useState } from "react";
import { ScrollTrigger } from "../lib/gsap.js";

/** True once the viewport has scrolled past `ratio` of its own height. */
export function useScrolledPastHero(ratio = 0.8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight * ratio,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => trigger.kill();
  }, [ratio]);

  return scrolled;
}
