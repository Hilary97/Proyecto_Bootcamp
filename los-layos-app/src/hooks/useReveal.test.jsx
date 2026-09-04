import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const { useReveal } = await import("./useReveal.js");
const { gsap, prefersReducedMotion } = await import("../lib/gsap.js");

function Section({ options }) {
  const ref = useReveal(options);
  return (
    <section ref={ref} data-testid="root">
      <p data-reveal>one</p>
      <p data-reveal>two</p>
    </section>
  );
}

describe("useReveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotion.mockReturnValue(false);
  });

  it("reveals the root element once when it scrolls into view", () => {
    render(<Section />);
    const root = screen.getByTestId("root");

    expect(gsap.fromTo).toHaveBeenCalledTimes(1);
    const [targets, from, to] = gsap.fromTo.mock.calls[0];
    expect(targets).toEqual([root]);
    expect(from).toMatchObject({ autoAlpha: 0 });
    expect(to).toMatchObject({ autoAlpha: 1, y: 0 });
    expect(to.scrollTrigger).toMatchObject({ trigger: root, once: true });
  });

  it("targets the matching children when a selector is given", () => {
    render(<Section options={{ selector: "[data-reveal]" }} />);

    const [targets, , to] = gsap.fromTo.mock.calls[0];
    expect(targets).toHaveLength(2);
    expect(targets[0]).toHaveTextContent("one");
    expect(to.stagger).toBeGreaterThan(0);
  });

  it("skips the animation when the user prefers reduced motion", () => {
    prefersReducedMotion.mockReturnValue(true);

    render(<Section />);

    expect(gsap.fromTo).not.toHaveBeenCalled();
  });
});
