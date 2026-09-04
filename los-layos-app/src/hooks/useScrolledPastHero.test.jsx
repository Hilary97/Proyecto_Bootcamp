import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const { useScrolledPastHero } = await import("./useScrolledPastHero.js");
const { ScrollTrigger } = await import("../lib/gsap.js");

describe("useScrolledPastHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is false until the ScrollTrigger becomes active", () => {
    const { result } = renderHook(() => useScrolledPastHero());

    expect(result.current).toBe(false);
    expect(ScrollTrigger.create).toHaveBeenCalledTimes(1);
    const config = ScrollTrigger.create.mock.calls[0][0];

    act(() => config.onToggle({ isActive: true }));
    expect(result.current).toBe(true);

    act(() => config.onToggle({ isActive: false }));
    expect(result.current).toBe(false);
  });

  it("kills the trigger on unmount", () => {
    const { unmount } = renderHook(() => useScrolledPastHero());
    const trigger = ScrollTrigger.create.mock.results[0].value;

    unmount();

    expect(trigger.kill).toHaveBeenCalled();
  });
});
