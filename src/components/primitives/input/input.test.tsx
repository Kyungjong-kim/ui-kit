import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("label이 있으면 렌더한다", () => {
    render(<Input label="이메일" />);
    expect(screen.getByText("이메일")).toBeInTheDocument();
  });

  it("error 상태에서 helperText를 렌더한다", () => {
    render(<Input error helperText="필수 입력 항목입니다." />);
    expect(screen.getByText("필수 입력 항목입니다.")).toBeInTheDocument();
  });

  it("disabled 상태에서 input이 비활성화된다", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
