import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
];

describe("Select", () => {
  it("placeholder를 렌더한다", () => {
    render(<Select options={options} placeholder="선택해주세요" />);
    expect(screen.getByText("선택해주세요")).toBeInTheDocument();
  });

  it("label을 렌더한다", () => {
    render(<Select options={options} label="과일" />);
    expect(screen.getByText("과일")).toBeInTheDocument();
  });

  it("disabled 상태가 적용된다", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("helperText 를 트리거 설명으로 연결하고 error 면 aria-invalid 를 붙인다", () => {
    render(<Select options={options} label="과일" error helperText="과일을 고르세요." />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAccessibleDescription("과일을 고르세요.");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it('빈 문자열 value 옵션(「전체」)을 렌더하고 선택하면 "" 를 돌려준다', () => {
    const onValueChange = vi.fn();
    const withAll = [{ value: "", label: "전체" }, ...options];
    render(<Select options={withAll} value="apple" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "전체" }));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it('value="" 이고 빈 값 옵션이 있으면 그 옵션이 선택된 것으로 보인다', () => {
    const withAll = [{ value: "", label: "전체" }, ...options];
    render(<Select options={withAll} value="" placeholder="고르세요" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("전체");
  });

  it('빈 값 옵션이 없을 때 value="" 는 지금처럼 placeholder 를 보여 준다', () => {
    render(<Select options={options} value="" placeholder="고르세요" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("고르세요");
  });

  it("필드 상자는 입력 테두리 토큰·6px·초점 halo 를 쓴다 (Warm Precision)", () => {
    render(<Select options={options} label="과일" />);
    const cls = screen.getByRole("combobox").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/hover:border-\[var\(--color-border-input-hover\)\]/);
    expect(cls).toMatch(/color-border-input-focus/);
    expect(cls).toMatch(/color-focus-halo/);
    expect(cls).not.toMatch(/ring-offset/);
  });

  it("오류 helperText 앞에 장식용 경고 아이콘이 붙는다", () => {
    render(<Select options={options} error helperText="필수 항목입니다." />);
    const helper = screen.getByText("필수 항목입니다.");
    expect(helper.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
