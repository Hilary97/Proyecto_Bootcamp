import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { Particulas } from "./Particulas.jsx";

describe("Particulas", () => {
  let rafSpy;
  let cafSpy;

  beforeEach(() => {
    rafSpy = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    cafSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    rafSpy.mockRestore();
    cafSpy.mockRestore();
  });

  it("starts the frame loop on mount and cancels it on unmount", () => {
    const { unmount } = render(<Particulas />);

    expect(rafSpy).toHaveBeenCalled();

    unmount();

    expect(cafSpy).toHaveBeenCalledWith(42);
  });
});
