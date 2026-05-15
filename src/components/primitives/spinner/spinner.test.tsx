import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("aria-label로 접근 가능하다", () => {
    const { getByRole } = render(<Spinner />);
    expect(getByRole("status")).toBeInTheDocument();
  });

  it("size 클래스가 적용된다", () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.firstChild).toHaveClass("h-size-icon-xl");
  });
});
