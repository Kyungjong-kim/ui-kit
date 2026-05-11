import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckMark } from "./check-mark";

describe("CheckMark", () => {
  it("라벨을 렌더한다", () => {
    render(<CheckMark label="동의합니다" />);
    expect(screen.getByText("동의합니다")).toBeInTheDocument();
  });

  it("체크박스 역할 요소가 있다", () => {
    render(<CheckMark label="동의합니다" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("disabled이면 aria-disabled 상태가 설정된다", () => {
    render(<CheckMark label="동의합니다" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("size=sm 클래스가 적용된다", () => {
    const { container } = render(<CheckMark label="동의합니다" size="sm" />);
    const span = container.querySelector("[data-slot='check-mark-checkbox']");
    expect(span).toHaveClass("size-size-icon-sm");
  });
});
