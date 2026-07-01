import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateRangePicker } from "./date-range-picker";

describe("DateRangePicker", () => {
  it("placeholder가 렌더된다", () => {
    render(<DateRangePicker />);
    expect(screen.getByText("기간 선택")).toBeInTheDocument();
  });

  it("from과 to가 있으면 범위가 포맷되어 표시된다", () => {
    render(<DateRangePicker value={{ from: new Date(2026, 0, 1), to: new Date(2026, 0, 10) }} />);
    expect(screen.getByText("2026.01.01 ~ 2026.01.10")).toBeInTheDocument();
  });

  it("from만 있으면 시작일과 물결표만 표시된다", () => {
    render(<DateRangePicker value={{ from: new Date(2026, 0, 1) }} />);
    expect(screen.getByText("2026.01.01 ~")).toBeInTheDocument();
  });

  it("disabled이면 트리거가 비활성화된다", () => {
    render(<DateRangePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("클릭하면 캘린더가 열린다", async () => {
    render(<DateRangePicker />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("onOpenChange가 호출된다", async () => {
    const onOpenChange = vi.fn();
    render(<DateRangePicker onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
