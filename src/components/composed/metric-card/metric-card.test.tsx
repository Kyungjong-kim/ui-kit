import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "./metric-card";

describe("MetricCard", () => {
  it("label과 value를 렌더한다", () => {
    render(<MetricCard label="활성 사용자" value="1,204" />);
    expect(screen.getByText("활성 사용자")).toBeInTheDocument();
    expect(screen.getByText("1,204")).toBeInTheDocument();
  });

  it("unit이 있으면 렌더한다", () => {
    render(<MetricCard label="응답률" value="98" unit="%" />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("상승 추세는 성공 색상 클래스를 적용한다", () => {
    render(<MetricCard label="매출" value="320" trend={{ direction: "up", value: "12%" }} />);
    const trend = screen.getByText("12%");
    expect(trend.className).toMatch(/success/);
  });

  it("하락 추세는 위험 색상 클래스를 적용한다", () => {
    render(<MetricCard label="이탈" value="45" trend={{ direction: "down", value: "3%" }} />);
    const trend = screen.getByText("3%");
    expect(trend.className).toMatch(/danger/);
  });
});
