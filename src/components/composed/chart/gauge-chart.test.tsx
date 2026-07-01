import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  const { cloneElement } = await import("react");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <div style={{ width: 300, height: 300 }}>
        {cloneElement(children, { width: 300, height: 300 } as Record<string, unknown>)}
      </div>
    ),
  };
});

import { GaugeChart } from "./gauge-chart";

describe("GaugeChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(<GaugeChart value={40} height={200} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("200px");
  });

  it("className을 병합한다", () => {
    const { container } = render(<GaugeChart value={40} className="custom-cls" />);
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("value/max 비율을 백분율 텍스트로 표시한다", () => {
    const { getByText } = render(<GaugeChart value={30} max={120} />);
    // 30/120 = 25%
    expect(getByText("25%")).toBeInTheDocument();
  });

  it("showValue=false면 백분율 텍스트를 숨긴다", () => {
    const { queryByText } = render(<GaugeChart value={50} showValue={false} />);
    expect(queryByText("50%")).not.toBeInTheDocument();
  });

  it("value가 max를 넘어도 100%로 클램프한다", () => {
    const { getByText } = render(<GaugeChart value={150} max={100} />);
    expect(getByText("100%")).toBeInTheDocument();
  });
});
