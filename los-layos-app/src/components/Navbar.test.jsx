import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../hooks/useScrolledPastHero.js", () => ({
  useScrolledPastHero: vi.fn(() => false),
}));

const { Navbar } = await import("./Navbar.jsx");
const { useScrolledPastHero } = await import("../hooks/useScrolledPastHero.js");

describe("Navbar", () => {
  beforeEach(() => {
    useScrolledPastHero.mockReturnValue(false);
  });

  it("links to every landing section", () => {
    render(<Navbar />);

    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining(["#musica", "#nosotros", "#agenda", "#contratar"]),
    );
  });

  it("stays hidden over the hero and appears once scrolled past it", () => {
    const { rerender } = render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("data-visible", "false");

    useScrolledPastHero.mockReturnValue(true);
    rerender(<Navbar />);

    expect(nav).toHaveAttribute("data-visible", "true");
  });
});
