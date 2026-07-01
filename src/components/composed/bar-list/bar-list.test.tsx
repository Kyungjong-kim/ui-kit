import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BarList } from "./bar-list";

describe("BarList", () => {
  const items = [
    { label: "GPT-4", value: 120 },
    { label: "Claude", value: 60 },
    { label: "Gemini", value: 30 },
  ];

  it("모든 항목의 라벨과 값을 렌더한다", () => {
    render(<BarList items={items} />);
    expect(screen.getByText("GPT-4")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });

  it("최댓값 항목 막대 폭이 100%가 된다", () => {
    const { container } = render(<BarList items={items} />);
    const bars = container.querySelectorAll('[style*="width"]');
    expect((bars[0] as HTMLElement).style.width).toBe("100%");
    expect((bars[1] as HTMLElement).style.width).toBe("50%");
  });

  it("max 지정 시 해당 기준으로 비율을 계산한다", () => {
    const { container } = render(<BarList items={items} max={240} />);
    const bars = container.querySelectorAll('[style*="width"]');
    expect((bars[0] as HTMLElement).style.width).toBe("50%");
  });

  it("음수 값은 0%로 클램프한다", () => {
    const { container } = render(
      <BarList
        items={[
          { label: "음수", value: -10 },
          { label: "양수", value: 10 },
        ]}
      />,
    );
    const bars = container.querySelectorAll('[style*="width"]');
    expect((bars[0] as HTMLElement).style.width).toBe("0%");
  });

  it("valueFormatter로 값 표기를 변환한다", () => {
    render(<BarList items={items} valueFormatter={(v) => `${v}건`} />);
    expect(screen.getByText("120건")).toBeInTheDocument();
  });
});
