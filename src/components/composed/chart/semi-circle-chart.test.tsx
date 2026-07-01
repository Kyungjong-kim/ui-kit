import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  const { cloneElement } = await import("react");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <div style={{ width: 300, height: 200 }}>
        {cloneElement(children, { width: 300, height: 200 } as Record<string, unknown>)}
      </div>
    ),
  };
});

import { SemiCircleChart } from "./semi-circle-chart";

describe("SemiCircleChart", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(<SemiCircleChart value={40} height={180} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("180px");
  });

  it("className을 병합한다", () => {
    const { container } = render(<SemiCircleChart value={40} className="custom-cls" />);
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("value/max 비율을 백분율 텍스트로 표시한다", () => {
    const { getByText } = render(<SemiCircleChart value={45} max={90} />);
    // 45/90 = 50%
    expect(getByText("50%")).toBeInTheDocument();
  });

  it("showValue=false면 백분율 텍스트를 숨긴다", () => {
    const { queryByText } = render(<SemiCircleChart value={50} showValue={false} />);
    expect(queryByText("50%")).not.toBeInTheDocument();
  });
});
