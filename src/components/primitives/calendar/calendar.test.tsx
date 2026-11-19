import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders calendar root", () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.querySelector("[data-slot='calendar']")).toBeTruthy();
  });

  it("renders with selected date", () => {
    const selected = new Date(2026, 4, 8);
    // defaultMonth 로 선택월을 표시 — 미지정 시 현재월만 렌더돼 선택일이 보이지 않으면 실패(날짜 의존).
    const { container } = render(
      <Calendar mode="single" selected={selected} defaultMonth={selected} />,
    );
    const selectedBtn = container.querySelector("[data-selected-single='true']");
    expect(selectedBtn).toBeTruthy();
  });

  it("선택된 날짜는 밝은 노랑 배경이라 어두운 글자를 쓴다", () => {
    const selected = new Date(2026, 4, 8);
    const { container } = render(
      <Calendar mode="single" selected={selected} defaultMonth={selected} />,
    );
    const btn = container.querySelector("button[data-selected-single='true']") as HTMLElement;
    expect(btn).not.toBeNull();
    expect(btn.style.color).toBe("var(--color-interactive-primary-text)");
  });

  it("날짜 버튼에 초점 표시 유틸이 react-day-picker className 에 덮이지 않고 남는다", () => {
    const { container } = render(<Calendar mode="single" />);
    const dayButton = container.querySelector("button[data-day]");
    expect(dayButton).not.toBeNull();
    expect(dayButton).toHaveClass("focus-ring");
    expect((dayButton as HTMLElement).style.outline).toBe("");
  });

  it("부모가 다시 렌더해도 날짜 버튼 DOM 을 재마운트하지 않는다", () => {
    const month = new Date(2026, 0, 1);
    const { container, rerender } = render(<Calendar mode="single" month={month} className="a" />);
    const before = container.querySelector("button[data-day]");
    const captionBefore = container.querySelector('[data-slot="calendar"]');
    rerender(<Calendar mode="single" month={month} className="b" />);
    expect(container.querySelector("button[data-day]")).toBe(before);
    expect(container.querySelector('[data-slot="calendar"]')).toBe(captionBefore);
  });

  it("이전·다음 달 버튼에 접근 가능한 이름이 있다", () => {
    render(<Calendar mode="single" month={new Date(2026, 0, 1)} />);
    expect(screen.getByRole("button", { name: "이전 달" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음 달" })).toBeInTheDocument();
  });

  it("captionLayout=dropdown 이면 연·월 드롭다운을 보여 준다", () => {
    render(
      <Calendar
        mode="single"
        captionLayout="dropdown"
        month={new Date(2026, 0, 1)}
        startMonth={new Date(2025, 0)}
        endMonth={new Date(2027, 11)}
      />,
    );
    expect(screen.getAllByRole("combobox").length).toBeGreaterThanOrEqual(2);
  });
});
