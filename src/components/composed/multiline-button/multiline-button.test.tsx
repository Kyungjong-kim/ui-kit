import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MultilineButton } from "./multiline-button";

describe("MultilineButton", () => {
  it("텍스트를 렌더한다", () => {
    render(<MultilineButton>긴 텍스트 버튼</MultilineButton>);
    expect(screen.getByText("긴 텍스트 버튼")).toBeInTheDocument();
  });

  it("button 요소를 렌더한다", () => {
    render(<MultilineButton>버튼</MultilineButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("disabled이면 비활성화된다", () => {
    render(<MultilineButton disabled>버튼</MultilineButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("max-h-[56px] 클래스가 적용된다", () => {
    render(<MultilineButton>버튼</MultilineButton>);
    expect(screen.getByRole("button").className).toMatch(/max-h-\[56px\]/);
  });
});
