import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("placeholder가 렌더된다", () => {
    render(<DatePicker />);
    expect(screen.getByText("날짜 선택")).toBeInTheDocument();
  });

  it("커스텀 placeholder가 렌더된다", () => {
    render(<DatePicker placeholder="날짜를 골라주세요" />);
    expect(screen.getByText("날짜를 골라주세요")).toBeInTheDocument();
  });

  it("value가 있으면 포맷된 날짜가 표시된다", () => {
    render(<DatePicker value={new Date(2026, 0, 15)} />);
    expect(screen.getByText("2026.01.15")).toBeInTheDocument();
  });

  it("disabled이면 버튼이 비활성화된다", () => {
    render(<DatePicker disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("클릭하면 캘린더가 열린다", async () => {
    render(<DatePicker />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("onOpenChange가 호출된다", async () => {
    const onOpenChange = vi.fn();
    render(<DatePicker onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
