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

import { PieChart } from "./pie-chart";

const data = [
  { name: "정상", value: 60 },
  { name: "주의", value: 25 },
  { name: "오류", value: 15 },
];

describe("PieChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(<PieChart data={data} height={220} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("220px");
  });

  it("className을 병합한다", () => {
    const { container } = render(<PieChart data={data} className="custom-cls" />);
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("recharts 차트를 마운트한다", () => {
    const { container } = render(<PieChart data={data} />);
    // jsdom에서 Pie sector는 측정 타이밍에 의존해 불안정하므로 래퍼 마운트까지만 검증한다.
    expect(container.querySelector(".recharts-wrapper")).toBeInTheDocument();
  });
});
