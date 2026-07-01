import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  const { cloneElement } = await import("react");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <div style={{ width: 120, height: 40 }}>
        {cloneElement(children, { width: 120, height: 40 } as Record<string, unknown>)}
      </div>
    ),
  };
});

import { Sparkline } from "./sparkline";

const data = [4, 8, 6, 10, 7, 12];

describe("Sparkline", () => {
  it("크래시 없이 루트 컨테이너를 렌더하고 높이를 반영한다", () => {
    const { container } = render(<Sparkline data={data} height={48} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.style.height).toBe("48px");
  });

  it("className을 병합한다", () => {
    const { container } = render(<Sparkline data={data} className="custom-cls" />);
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("line variant에서 라인 곡선을 그린다", () => {
    const { container } = render(<Sparkline data={data} variant="line" />);
    expect(container.querySelector("path.recharts-line-curve")).toBeInTheDocument();
  });

  it("area variant에서 영역을 그린다", () => {
    const { container } = render(<Sparkline data={data} variant="area" />);
    expect(container.querySelector("path.recharts-area-area")).toBeInTheDocument();
  });
});
