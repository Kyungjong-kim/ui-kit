import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("label을 렌더한다", () => {
    render(<Textarea label="내용" />);
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("error 상태에서 helperText를 렌더한다", () => {
    render(<Textarea error helperText="필수 입력 항목입니다." />);
    expect(screen.getByText("필수 입력 항목입니다.")).toBeInTheDocument();
  });

  it("disabled 상태에서 textarea가 비활성화된다", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("rows prop이 적용된다", () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });

  it("helperText 를 설명으로 연결하고 error 면 aria-invalid 를 붙인다", () => {
    render(<Textarea error helperText="200자 이내로 입력하세요." />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAccessibleDescription("200자 이내로 입력하세요.");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("필드 상자는 입력 테두리 토큰·6px·초점 halo 를 쓴다 (Warm Precision)", () => {
    render(<Textarea label="메모" />);
    const cls = screen.getByRole("textbox").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/hover:border-\[var\(--color-border-input-hover\)\]/);
    expect(cls).toMatch(/color-border-input-focus/);
    expect(cls).toMatch(/color-focus-halo/);
    expect(cls).not.toMatch(/ring-offset/);
  });

  it("오류 helperText 앞에 장식용 경고 아이콘이 붙는다", () => {
    render(<Textarea error helperText="필수 항목입니다." />);
    const helper = screen.getByText("필수 항목입니다.");
    expect(helper.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
