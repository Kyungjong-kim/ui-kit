import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("이미지 없을 때 fallback을 렌더한다", () => {
    render(<Avatar fallback="KJ" />);
    expect(screen.getByText("KJ")).toBeInTheDocument();
  });

  it("size 클래스가 적용된다", () => {
    const { container } = render(<Avatar fallback="KJ" size="lg" />);
    expect(container.firstChild).toHaveClass("h-12");
  });
});
