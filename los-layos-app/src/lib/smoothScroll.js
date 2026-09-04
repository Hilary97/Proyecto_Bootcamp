let lenis = null;

/** Height of the fixed navbar; negative so targets land below it. */
export const NAV_OFFSET = -72;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/**
 * Scrolls to a selector or element. Uses Lenis when smooth scroll is active,
 * otherwise falls back to native smooth scrolling (reduced motion, tests).
 */
export function scrollToElement(target, { offset = NAV_OFFSET } = {}) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset });
    return;
  }
  el.scrollIntoView({ behavior: "smooth" });
}
