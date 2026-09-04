import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createGsapMock } from "../test/mockGsap.js";

vi.mock("../lib/gsap.js", () => createGsapMock());

const { useCountUp } = await import("./useCountUp.js");
const { gsap, prefersReducedMotion } = await import("../lib/gsap.js");

function Stat({ to, suffix = "+" }) {
  const ref = useCountUp({ to, suffix });
  return (
    <p ref={ref} data-testid="stat">
      {to}
      {suffix}
    </p>
  );
}

describe("useCountUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotion.mockReturnValue(false);
  });

  it("renders the final value as initial text so it reads without JS", () => {
    render(<Stat to={500} />);

    expect(screen.getByTestId("stat")).toHaveTextContent("500+");
  });

  it("animates a counter object to the target with integer snapping", () => {
    render(<Stat to={500} />);
    const el = screen.getByTestId("stat");

    expect(gsap.to).toHaveBeenCalledTimes(1);
    const [counter, vars] = gsap.to.mock.calls[0];
    expect(counter).toEqual({ value: 0 });
    expect(vars).toMatchObject({ value: 500, snap: { value: 1 } });
    expect(vars.scrollTrigger).toMatchObject({ trigger: el, once: true });

    counter.value = 123;
    vars.onUpdate();
    expect(el).toHaveTextContent("123+");
  });

  it("leaves the final text untouched when the user prefers reduced motion", () => {
    prefersReducedMotion.mockReturnValue(true);

    render(<Stat to={10} />);

    expect(gsap.to).not.toHaveBeenCalled();
    expect(screen.getByTestId("stat")).toHaveTextContent("10+");
  });
});
