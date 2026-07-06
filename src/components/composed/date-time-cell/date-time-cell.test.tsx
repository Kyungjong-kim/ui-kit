import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DateTimeCell } from "./date-time-cell";

// 상대시간 계산 기준 고정 시각
const NOW = new Date("2026-01-15T12:00:00");

describe("DateTimeCell", () => {
  it("절대 날짜를 YYYY-MM-DD로 렌더한다", () => {
    render(<DateTimeCell value="2026-01-15T09:30:00" />);
    expect(screen.getByText("2026-01-15")).toBeInTheDocument();
  });

  it("showTime이면 HH:mm까지 렌더한다", () => {
    render(<DateTimeCell value="2026-01-15T09:30:00" showTime />);
    expect(screen.getByText("2026-01-15")).toBeInTheDocument();
    expect(screen.getByText("09:30")).toBeInTheDocument();
  });

  it("relative이면 주입된 기준시각으로 상대시간을 계산한다", () => {
    render(<DateTimeCell value="2026-01-15T11:57:00" relative now={NOW} />);
    expect(screen.getByText("3분 전")).toBeInTheDocument();
  });

  it("relative에서 하루 이상 차이는 일 단위로 표시한다", () => {
    render(<DateTimeCell value="2026-01-13T12:00:00" relative now={NOW} />);
    expect(screen.getByText("2일 전")).toBeInTheDocument();
  });

  it("잘못된 값이면 '-'를 표시한다", () => {
    render(<DateTimeCell value="not-a-date" />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
