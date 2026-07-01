import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResourceUsage } from "./resource-usage";

describe("ResourceUsage", () => {
  it("라벨과 단위 포함 사용량 텍스트를 렌더한다", () => {
    render(<ResourceUsage label="메모리" current={4} max={16} unit="GB" />);
    expect(screen.getByText("메모리")).toBeInTheDocument();
    expect(screen.getByText("4 / 16 GB")).toBeInTheDocument();
  });

  it("단위가 없으면 % 로 표시하고 progressbar 값을 반올림한다", () => {
    render(<ResourceUsage label="CPU" current={1} max={3} />);
    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "33");
  });

  it("임계값 초과 시 danger 색 막대를 사용한다", () => {
    const { container } = render(<ResourceUsage label="디스크" current={95} max={100} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.className).toContain("--color-bg-danger-default");
    expect(bar.style.width).toBe("95%");
  });

  it("max가 0이면 비율 0%로 처리한다", () => {
    const { container } = render(<ResourceUsage label="없음" current={10} max={0} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe("0%");
  });

  it("100% 초과 사용량은 100%로 클램프한다", () => {
    const { container } = render(<ResourceUsage label="초과" current={150} max={100} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe("100%");
  });
});
