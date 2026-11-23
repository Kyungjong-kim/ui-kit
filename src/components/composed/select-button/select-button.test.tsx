import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectButton } from "./select-button";

describe("SelectButton", () => {
  it("텍스트를 렌더한다", () => {
    render(<SelectButton>필터</SelectButton>);
    expect(screen.getByText("필터")).toBeInTheDocument();
  });

  it("초기 aria-pressed는 false이다", () => {
    render(<SelectButton>필터</SelectButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("클릭하면 선택 상태가 토글된다", async () => {
    render(<SelectButton>필터</SelectButton>);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("controlled 모드: selected prop이 반영된다", () => {
    render(<SelectButton selected>필터</SelectButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("onChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<SelectButton onChange={onChange}>필터</SelectButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("disabled이면 비활성화된다", () => {
    render(<SelectButton disabled>필터</SelectButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("선택 상태는 연노랑 배경, 테두리는 입력 테두리 토큰·6px (Warm Precision)", () => {
    render(<SelectButton selected>최근 7일</SelectButton>);
    const cls = screen.getByRole("button").className;
    expect(cls).toMatch(/color-bg-brand-subtle/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/rounded-xs/);
  });
});
