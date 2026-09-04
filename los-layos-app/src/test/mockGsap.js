import { vi } from "vitest";
import { useLayoutEffect } from "react";

/**
 * Factory for `vi.mock("../lib/gsap.js", () => createGsapMock())`.
 * Every animation call is a spy; useGSAP runs the callback once on mount
 * and invokes its returned cleanup on unmount.
 */
export function createGsapMock() {
  const timeline = () => {
    const tl = {
      fromTo: vi.fn(() => tl),
      from: vi.fn(() => tl),
      to: vi.fn(() => tl),
      play: vi.fn(() => tl),
      kill: vi.fn(),
    };
    return tl;
  };

  const matchMedia = () => ({
    add: vi.fn((conditions, fn) => {
      const keys = Object.keys(conditions);
      const active = Object.fromEntries(keys.map((k) => [k, true]));
      return fn({ conditions: active });
    }),
    revert: vi.fn(),
  });

  const gsap = {
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(timeline),
    matchMedia: vi.fn(matchMedia),
    quickTo: vi.fn(() => vi.fn()),
    delayedCall: vi.fn(() => ({ restart: vi.fn(), kill: vi.fn() })),
    utils: {
      clamp: (min, max, v) => Math.min(max, Math.max(min, v)),
      toArray: (selector, scope) =>
        Array.from((scope ?? document).querySelectorAll(selector)),
    },
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  };

  const ScrollTrigger = {
    create: vi.fn(() => ({ kill: vi.fn() })),
    refresh: vi.fn(),
    update: vi.fn(),
  };

  const SplitText = {
    create: vi.fn(() => ({ chars: [], revert: vi.fn() })),
  };

  const useGSAP = (fn, config) => {
    const deps = Array.isArray(config) ? config : (config?.dependencies ?? []);
    useLayoutEffect(() => {
      const cleanup = fn();
      return typeof cleanup === "function" ? cleanup : undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
  };

  return {
    gsap,
    ScrollTrigger,
    SplitText,
    useGSAP,
    prefersReducedMotion: vi.fn(() => false),
  };
}
