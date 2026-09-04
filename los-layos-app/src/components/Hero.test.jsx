import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const { Hero } = await import("./Hero.jsx");
const { gsap, SplitText, prefersReducedMotion } = await import("../lib/gsap.js");

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotion.mockReturnValue(false);
  });

  it("renders the band name, tagline and hero image", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /ADICCIÓN\s*NORTEÑA/,
    );
    expect(screen.getByText("Los Layos")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /Adicción Norteña Los Layos/i });
    expect(img).toHaveAttribute("src", "/images/an-los-layos.png");
  });

  it("links the primary CTA to the hire form and the secondary to Facebook", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /Contrátanos/i })).toHaveAttribute(
      "href",
      "#contratar",
    );
    expect(screen.getByRole("link", { name: /Facebook/i })).toHaveAttribute(
      "href",
      expect.stringContaining("facebook.com"),
    );
  });

  it("drops the old wiggle and red button styles", () => {
    const { container } = render(<Hero />);

    expect(container.querySelector(".animate-wiggle")).toBeNull();
    expect(container.querySelector('[class*="red-"]')).toBeNull();
  });

  it("builds a load timeline, a scroll parallax and splits the title", () => {
    render(<Hero />);

    expect(SplitText.create).toHaveBeenCalledWith(
      "[data-hero-title]",
      expect.objectContaining({ type: "chars" }),
    );
    expect(gsap.timeline).toHaveBeenCalled();
    const parallax = gsap.to.mock.calls.find(
      ([target]) => target === "[data-hero-img]",
    );
    expect(parallax).toBeDefined();
    expect(parallax[1].scrollTrigger).toMatchObject({ scrub: true });
  });

  it("keeps the hero static under reduced motion", () => {
    prefersReducedMotion.mockReturnValue(true);

    render(<Hero />);

    expect(SplitText.create).not.toHaveBeenCalled();
    expect(gsap.timeline).not.toHaveBeenCalled();
    expect(gsap.to).not.toHaveBeenCalled();
  });
});
