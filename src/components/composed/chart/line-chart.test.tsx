import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// jsdom은 ResponsiveContainer 부모 크기를 0으로 보고 차트를 렌더하지 않는다.
// 고정 크기를 자식에 주입해 SVG가 실제로 그려지게 한다.
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

import { LineChart } from "./line-chart";

const data = [
  { month: "1월", 매출: 100, 비용: 60 },
  { month: "2월", 매출: 140, 비용: 80 },
  { month: "3월", 매출: 120, 비용: 70 },
];

describe("LineChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(
      <LineChart data={data} xKey="month" series={[{ dataKey: "매출" }]} height={240} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("240px");
  });

  it("className을 병합한다", () => {
    const { container } = render(
      <LineChart data={data} xKey="month" series={[{ dataKey: "매출" }]} className="custom-cls" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("시리즈 개수만큼 line을 그린다", () => {
    const { container } = render(
      <LineChart data={data} xKey="month" series={[{ dataKey: "매출" }, { dataKey: "비용" }]} />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelectorAll("path.recharts-line-curve").length).toBe(2);
  });
});
