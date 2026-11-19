import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("label을 렌더한다", () => {
    render(<Checkbox label="동의합니다" />);
    expect(screen.getByText("동의합니다")).toBeInTheDocument();
  });

  it("클릭 시 onCheckedChange가 호출된다", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="동의" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled 상태에서 클릭해도 변경되지 않는다", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="동의" disabled onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("helperText 를 설명으로 연결하고 error 면 aria-invalid 를 붙인다", () => {
    render(<Checkbox label="약관 동의" error helperText="동의가 필요합니다." />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAccessibleDescription("동의가 필요합니다.");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  it("checked=indeterminate 면 체크 대신 가로줄 아이콘을 보여 준다", () => {
    const { container } = render(<Checkbox label="전체" checked="indeterminate" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "indeterminate");
    const icons = container.querySelectorAll("svg");
    expect(icons[0]).toHaveClass("group-data-[state=indeterminate]:hidden");
    expect(icons[1]).toHaveClass("group-data-[state=indeterminate]:block");
    expect(screen.getByRole("checkbox").className).toContain("data-[state=indeterminate]:bg-");
  });
});
