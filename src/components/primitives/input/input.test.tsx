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

  it("필드 상자는 입력 테두리 토큰·6px·초점 halo 를 쓴다 (Warm Precision)", () => {
    render(<Input label="이메일" />);
    const cls = screen.getByRole("textbox").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/hover:border-\[var\(--color-border-input-hover\)\]/);
    expect(cls).toMatch(/color-border-input-focus/);
    expect(cls).toMatch(/color-focus-halo/);
    expect(cls).not.toMatch(/ring-offset/);
  });

  it("오류 helperText 앞에 장식용 경고 아이콘이 붙는다", () => {
    render(<Input error helperText="필수 항목입니다." />);
    const helper = screen.getByText("필수 항목입니다.");
    expect(helper.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
