import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heatmap } from "./heatmap";

const data = [
  [1, 2, 3],
  [4, 5, 6],
];

describe("Heatmap", () => {
  it("행렬 크기만큼 셀(rect)을 그린다", () => {
    const { container } = render(<Heatmap data={data} />);
    // 2행 × 3열 = 6 셀
    expect(container.querySelectorAll("rect").length).toBe(6);
  });

  it("className을 병합한다", () => {
    const { container } = render(<Heatmap data={data} className="custom-cls" />);
    expect(container.firstElementChild).toHaveClass("custom-cls");
  });

  it("축 라벨을 렌더한다", () => {
    const { getByText } = render(
      <Heatmap data={data} xLabels={["월", "화", "수"]} yLabels={["오전", "오후"]} />,
    );
    expect(getByText("월")).toBeInTheDocument();
    expect(getByText("오후")).toBeInTheDocument();
  });

  it("showValues=true면 셀 값 텍스트를 표시한다", () => {
    const { getByText } = render(<Heatmap data={data} showValues />);
    expect(getByText("6")).toBeInTheDocument();
  });

  it("빈 데이터에서도 크래시 없이 svg를 렌더한다", () => {
    const { container } = render(<Heatmap data={[]} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelectorAll("rect").length).toBe(0);
  });
});
