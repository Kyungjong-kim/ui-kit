import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateTimePicker } from "./date-time-picker";

describe("DateTimePicker", () => {
  it("placeholder가 렌더된다", () => {
    render(<DateTimePicker />);
    expect(screen.getByText("날짜·시간 선택")).toBeInTheDocument();
  });

  it("value가 있으면 날짜와 시간이 함께 포맷된다", () => {
    render(<DateTimePicker value={new Date(2026, 0, 15, 9, 30)} />);
    expect(screen.getByText("2026.01.15 09:30")).toBeInTheDocument();
  });

  it("disabled이면 트리거가 비활성화된다", () => {
    render(<DateTimePicker disabled />);
    expect(screen.getByRole("button", { name: /날짜·시간 선택/ })).toBeDisabled();
  });

  it("클릭하면 캘린더와 시/분 입력이 열린다", async () => {
    render(<DateTimePicker value={new Date(2026, 0, 15, 9, 30)} />);
    await userEvent.click(screen.getByText("2026.01.15 09:30"));
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByLabelText("시")).toBeInTheDocument();
    expect(screen.getByLabelText("분")).toBeInTheDocument();
  });

  it("시 입력을 변경하면 onChange가 갱신된 시간으로 호출된다", async () => {
    const onChange = vi.fn();
    render(<DateTimePicker value={new Date(2026, 0, 15, 9, 30)} onChange={onChange} />);
    await userEvent.click(screen.getByText("2026.01.15 09:30"));
    fireEvent.change(screen.getByLabelText("시"), { target: { value: "14" } });
    const calls = onChange.mock.calls;
    const called = calls[calls.length - 1]?.[0] as Date;
    expect(called.getHours()).toBe(14);
    expect(called.getMinutes()).toBe(30);
  });
});
