import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComparisonBar } from "./comparison-bar";

describe("ComparisonBar", () => {
  it("두 세그먼트 라벨과 값을 렌더한다", () => {
    render(
      <ComparisonBar left={{ label: "성공", value: 75 }} right={{ label: "실패", value: 25 }} />,
    );
    expect(screen.getByText("성공")).toBeInTheDocument();
    expect(screen.getByText("실패")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("합 대비 비율로 세그먼트 폭을 나눈다", () => {
    const { container } = render(
      <ComparisonBar left={{ label: "A", value: 30 }} right={{ label: "B", value: 10 }} />,
    );
    const segs = container.querySelectorAll('[style*="width"]');
    expect((segs[0] as HTMLElement).style.width).toBe("75%");
    expect((segs[1] as HTMLElement).style.width).toBe("25%");
  });

  it("두 값 합이 0이면 세그먼트 폭이 0%가 된다", () => {
    const { container } = render(
      <ComparisonBar left={{ label: "A", value: 0 }} right={{ label: "B", value: 0 }} />,
    );
    const segs = container.querySelectorAll('[style*="width"]');
    expect((segs[0] as HTMLElement).style.width).toBe("0%");
    expect((segs[1] as HTMLElement).style.width).toBe("0%");
  });

  it("음수 값은 0으로 클램프한다", () => {
    const { container } = render(
      <ComparisonBar left={{ label: "A", value: -50 }} right={{ label: "B", value: 50 }} />,
    );
    const segs = container.querySelectorAll('[style*="width"]');
    expect((segs[0] as HTMLElement).style.width).toBe("0%");
    expect((segs[1] as HTMLElement).style.width).toBe("100%");
  });

  it("valueFormatter로 값 표기를 변환한다", () => {
    render(
      <ComparisonBar
        left={{ label: "A", value: 1000 }}
        right={{ label: "B", value: 500 }}
        valueFormatter={(v) => `${v}원`}
      />,
    );
    expect(screen.getByText("1000원")).toBeInTheDocument();
  });
});
