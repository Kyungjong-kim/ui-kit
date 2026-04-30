import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("animate-pulse 클래스를 가진다", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("rounded prop이 적용된다", () => {
    const { container } = render(<Skeleton rounded="full" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("className이 병합된다", () => {
    const { container } = render(<Skeleton className="w-32 h-4" />);
    expect(container.firstChild).toHaveClass("w-32", "h-4");
  });
});
