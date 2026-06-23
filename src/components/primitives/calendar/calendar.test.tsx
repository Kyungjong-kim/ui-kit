import { render } from "@testing-library/react";
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
});
