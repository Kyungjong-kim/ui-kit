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

  it("helperText 를 입력의 접근 가능한 설명으로 연결한다", () => {
    render(<Input label="이메일" helperText="회사 메일을 입력하세요." />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("회사 메일을 입력하세요.");
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("error 상태면 aria-invalid 를 붙이고 사용자 aria-describedby 와 합친다", () => {
    render(
      <>
        <span id="extra">추가 설명</span>
        <Input error helperText="필수 입력 항목입니다." aria-describedby="extra" />
      </>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("추가 설명 필수 입력 항목입니다.");
  });
});
