import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MonthPicker } from "./month-picker";

describe("MonthPicker", () => {
  it("placeholder가 렌더된다", () => {
    render(<MonthPicker />);
    expect(screen.getByText("년/월 선택")).toBeInTheDocument();
  });

  it("value가 있으면 연.월이 표시된다", () => {
    render(<MonthPicker value={{ year: 2026, month: 0 }} />);
    expect(screen.getByText("2026.01")).toBeInTheDocument();
  });

  it("열면 12개월 그리드가 렌더된다", async () => {
    render(<MonthPicker value={{ year: 2026, month: 0 }} />);
    await userEvent.click(screen.getByText("2026.01"));
    expect(screen.getByText("2026년")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12월" })).toBeInTheDocument();
  });

  it("월을 클릭하면 onChange가 연/월과 함께 호출된다", async () => {
    const onChange = vi.fn();
    render(<MonthPicker value={{ year: 2026, month: 0 }} onChange={onChange} />);
    await userEvent.click(screen.getByText("2026.01"));
    await userEvent.click(screen.getByRole("button", { name: "5월" }));
    expect(onChange).toHaveBeenCalledWith({ year: 2026, month: 4 });
  });

  it("다음 연도 버튼으로 연도를 이동한다", async () => {
    render(<MonthPicker value={{ year: 2026, month: 0 }} />);
    await userEvent.click(screen.getByText("2026.01"));
    await userEvent.click(screen.getByRole("button", { name: "다음 연도" }));
    expect(screen.getByText("2027년")).toBeInTheDocument();
  });
});
