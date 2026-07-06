import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClusterResourceBar } from "./cluster-resource-bar";

describe("ClusterResourceBar", () => {
  const segments = [
    { label: "node-a", value: 50, tone: "brand" as const },
    { label: "node-b", value: 30, tone: "blue" as const },
    { label: "node-c", value: 20, tone: "green" as const },
  ];

  it("범례에 각 세그먼트 라벨과 값을 렌더한다", () => {
    render(<ClusterResourceBar segments={segments} />);
    expect(screen.getByText("node-a")).toBeInTheDocument();
    expect(screen.getByText("node-b")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("합 대비 비율로 세그먼트 폭을 누적한다", () => {
    const { container } = render(<ClusterResourceBar segments={segments} showLegend={false} />);
    const bars = container.querySelectorAll('[style*="width"]');
    expect((bars[0] as HTMLElement).style.width).toBe("50%");
    expect((bars[1] as HTMLElement).style.width).toBe("30%");
    expect((bars[2] as HTMLElement).style.width).toBe("20%");
  });

  it("showLegend=false 이면 범례를 렌더하지 않는다", () => {
    render(<ClusterResourceBar segments={segments} showLegend={false} />);
    expect(screen.queryByText("node-a")).not.toBeInTheDocument();
  });

  it("합이 0이면 모든 세그먼트 폭이 0%가 된다", () => {
    const { container } = render(
      <ClusterResourceBar
        segments={[{ label: "empty", value: 0, tone: "neutral" }]}
        showLegend={false}
      />,
    );
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe("0%");
  });

  it("valueFormatter로 범례 값 표기를 변환한다", () => {
    render(<ClusterResourceBar segments={segments} valueFormatter={(v) => `${v} vCPU`} />);
    expect(screen.getByText("50 vCPU")).toBeInTheDocument();
  });
});
