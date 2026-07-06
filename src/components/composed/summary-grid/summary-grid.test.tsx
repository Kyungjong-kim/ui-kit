import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SummaryGrid } from "./summary-grid";

describe("SummaryGrid", () => {
  it("children을 렌더한다", () => {
    render(
      <SummaryGrid>
        <div>셀A</div>
        <div>셀B</div>
      </SummaryGrid>,
    );
    expect(screen.getByText("셀A")).toBeInTheDocument();
    expect(screen.getByText("셀B")).toBeInTheDocument();
  });

  it("loading 시 children 대신 스켈레톤을 렌더한다", () => {
    render(
      <SummaryGrid loading skeletonCount={3}>
        <div>셀A</div>
      </SummaryGrid>,
    );
    expect(screen.queryByText("셀A")).not.toBeInTheDocument();
  });

  it("columns에 따라 lg 열 클래스가 적용된다", () => {
    const { container } = render(
      <SummaryGrid columns={3}>
        <div>셀</div>
      </SummaryGrid>,
    );
    expect(container.firstChild).toHaveClass("lg:grid-cols-3");
  });
});
