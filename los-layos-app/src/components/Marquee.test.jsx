import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const { Marquee } = await import("./Marquee.jsx");
const { gsap, ScrollTrigger, prefersReducedMotion } = await import("../lib/gsap.js");

describe("Marquee", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotion.mockReturnValue(false);
  });

  it("renders each item once for readers and once more, hidden, for the loop", () => {
    const { container } = render(<Marquee items={["Norteño", "Cumbia"]} />);

    expect(screen.getAllByText("Norteño")).toHaveLength(2);
    const tracks = container.querySelectorAll("[data-marquee-track]");
    expect(tracks).toHaveLength(2);
    expect(tracks[0]).not.toHaveAttribute("aria-hidden");
    expect(tracks[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a default list of band descriptors", () => {
    render(<Marquee />);

    expect(screen.getAllByText("Norteño").length).toBeGreaterThan(0);
  });

  it("scrolls the strip left forever and reacts to scroll velocity", () => {
    render(<Marquee />);

    expect(gsap.to).toHaveBeenCalledWith(
      "[data-marquee-strip]",
      expect.objectContaining({ xPercent: -50, repeat: -1, ease: "none" }),
    );
    expect(ScrollTrigger.create).toHaveBeenCalledWith(
      expect.objectContaining({ onUpdate: expect.any(Function) }),
    );
  });

  it("stays static under reduced motion", () => {
    prefersReducedMotion.mockReturnValue(true);

    render(<Marquee />);

    expect(gsap.to).not.toHaveBeenCalled();
    expect(ScrollTrigger.create).not.toHaveBeenCalled();
  });
});
