import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToElement, setLenis, NAV_OFFSET } from "./smoothScroll.js";

describe("scrollToElement", () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<section id="target"></section>';
    el = document.getElementById("target");
    el.scrollIntoView = vi.fn();
    setLenis(null);
  });

  it("uses lenis.scrollTo with the navbar offset when lenis is active", () => {
    const lenis = { scrollTo: vi.fn() };
    setLenis(lenis);

    scrollToElement("#target");

    expect(lenis.scrollTo).toHaveBeenCalledWith(el, { offset: NAV_OFFSET });
    expect(el.scrollIntoView).not.toHaveBeenCalled();
  });

  it("falls back to native smooth scrollIntoView when lenis is not active", () => {
    scrollToElement("#target");

    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("accepts an element directly", () => {
    scrollToElement(el);

    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does nothing when the target does not exist", () => {
    const lenis = { scrollTo: vi.fn() };
    setLenis(lenis);

    expect(() => scrollToElement("#missing")).not.toThrow();
    expect(lenis.scrollTo).not.toHaveBeenCalled();
  });
});
