import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  const { cloneElement } = await import("react");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <div style={{ width: 400, height: 300 }}>
        {cloneElement(children, { width: 400, height: 300 } as Record<string, unknown>)}
      </div>
    ),
  };
});

import { RadarChart } from "./radar-chart";

const data = [
  { 항목: "속도", A: 80, B: 60 },
  { 항목: "정확도", A: 70, B: 90 },
  { 항목: "안정성", A: 85, B: 75 },
];

describe("RadarChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(
      <RadarChart data={data} angleKey="항목" series={[{ dataKey: "A" }]} height={260} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("260px");
  });

  it("className을 병합한다", () => {
    const { container } = render(
      <RadarChart data={data} angleKey="항목" series={[{ dataKey: "A" }]} className="custom-cls" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("recharts 차트를 마운트한다", () => {
    const { container } = render(
      <RadarChart data={data} angleKey="항목" series={[{ dataKey: "A" }, { dataKey: "B" }]} />,
    );
    // jsdom에서 Radar polygon은 측정 타이밍에 의존해 불안정하므로 래퍼 마운트까지만 검증한다.
    expect(container.querySelector(".recharts-wrapper")).toBeInTheDocument();
  });
});
