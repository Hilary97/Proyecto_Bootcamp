import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const lenisInstances = [];
vi.mock("lenis", () => ({
  default: class LenisMock {
    constructor(options) {
      this.options = options;
      this.on = vi.fn();
      this.off = vi.fn();
      this.raf = vi.fn();
      this.scrollTo = vi.fn();
      this.destroy = vi.fn();
      lenisInstances.push(this);
    }
  },
}));

const { useSmoothScroll } = await import("./useSmoothScroll.js");
const { gsap, ScrollTrigger, prefersReducedMotion } =
  await import("../lib/gsap.js");
const { getLenis } = await import("../lib/smoothScroll.js");

describe("useSmoothScroll", () => {
  beforeEach(() => {
    lenisInstances.length = 0;
    vi.clearAllMocks();
    prefersReducedMotion.mockReturnValue(false);
  });

  it("creates Lenis and syncs it with ScrollTrigger and the gsap ticker", () => {
    renderHook(() => useSmoothScroll());

    expect(lenisInstances).toHaveLength(1);
    const lenis = lenisInstances[0];
    expect(lenis.on).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(gsap.ticker.add).toHaveBeenCalledWith(expect.any(Function));
    expect(gsap.ticker.lagSmoothing).toHaveBeenCalledWith(0);
    expect(ScrollTrigger.refresh).toHaveBeenCalled();
    expect(getLenis()).toBe(lenis);

    const onScroll = lenis.on.mock.calls[0][1];
    onScroll();
    expect(ScrollTrigger.update).toHaveBeenCalled();

    const tick = gsap.ticker.add.mock.calls[0][0];
    tick(2);
    expect(lenis.raf).toHaveBeenCalledWith(2000);
  });

  it("destroys Lenis and removes the ticker on unmount", () => {
    const { unmount } = renderHook(() => useSmoothScroll());
    const lenis = lenisInstances[0];
    const tick = gsap.ticker.add.mock.calls[0][0];

    unmount();

    expect(lenis.destroy).toHaveBeenCalled();
    expect(gsap.ticker.remove).toHaveBeenCalledWith(tick);
    expect(getLenis()).toBeNull();
  });

  it("does nothing when the user prefers reduced motion", () => {
    prefersReducedMotion.mockReturnValue(true);

    renderHook(() => useSmoothScroll());

    expect(lenisInstances).toHaveLength(0);
    expect(getLenis()).toBeNull();
  });

  it("does nothing when disabled", () => {
    renderHook(() => useSmoothScroll({ enabled: false }));

    expect(lenisInstances).toHaveLength(0);
  });
});
