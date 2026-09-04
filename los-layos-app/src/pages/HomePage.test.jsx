import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());
vi.mock("../hooks/useSmoothScroll.js", () => ({ useSmoothScroll: vi.fn() }));
vi.mock("../hooks/useScrolledPastHero.js", () => ({
  useScrolledPastHero: () => false,
}));
vi.mock("../features/agenda/useAgenda.js", () => ({
  useAgenda: () => ({ busyDates: new Set(), loading: false, error: null }),
}));
vi.mock("../features/agenda/MonthCalendar.jsx", () => ({
  MonthCalendar: ({ onDayClick }) => (
    <button type="button" onClick={() => onDayClick("2026-10-10")}>
      pick-day
    </button>
  ),
}));
vi.mock("../lib/smoothScroll.js", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, scrollToElement: vi.fn() };
});

const { HomePage } = await import("./HomePage.jsx");
const { useSmoothScroll } = await import("../hooks/useSmoothScroll.js");
const { scrollToElement } = await import("../lib/smoothScroll.js");

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("enables smooth scroll and exposes every navbar anchor target", () => {
    const { container } = render(<HomePage />);

    expect(useSmoothScroll).toHaveBeenCalled();
    for (const id of ["hero", "musica", "nosotros", "agenda", "contratar"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("scrolls to the hire form through scrollToElement when a day is picked", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByText("pick-day"));

    expect(scrollToElement).toHaveBeenCalledWith("#contratar");
    expect(screen.getByDisplayValue("2026-10-10")).toBeInTheDocument();
  });
});
