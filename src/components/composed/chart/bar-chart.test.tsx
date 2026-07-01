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

import { BarChart } from "./bar-chart";

const data = [
  { region: "서울", 방문: 120, 가입: 40 },
  { region: "부산", 방문: 90, 가입: 30 },
];

describe("BarChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(
      <BarChart data={data} xKey="region" series={[{ dataKey: "방문" }]} height={200} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("200px");
  });

  it("className을 병합한다", () => {
    const { container } = render(
      <BarChart data={data} xKey="region" series={[{ dataKey: "방문" }]} className="custom-cls" />,
    );
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("시리즈·데이터 개수만큼 막대를 그린다", () => {
    const { container } = render(
      <BarChart data={data} xKey="region" series={[{ dataKey: "방문" }, { dataKey: "가입" }]} />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    // 시리즈 2 × 데이터 2 = 막대 4개
    expect(container.querySelectorAll(".recharts-bar-rectangle").length).toBe(4);
  });
});
