import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DescriptionList } from "./description-list";

describe("DescriptionList", () => {
  it("children을 렌더한다", () => {
    render(
      <DescriptionList>
        <div>행 내용</div>
      </DescriptionList>,
    );
    expect(screen.getByText("행 내용")).toBeInTheDocument();
  });

  it("accordionTitle 지정 시 헤더를 렌더한다", () => {
    render(
      <DescriptionList accordionTitle="설정값">
        <div>행 내용</div>
      </DescriptionList>,
    );
    expect(screen.getByRole("button", { name: "설정값" })).toBeInTheDocument();
  });

  it("loading 시 children 대신 스켈레톤 행을 렌더한다", () => {
    render(
      <DescriptionList loading skeletonRows={3}>
        <div>행 내용</div>
      </DescriptionList>,
    );
    expect(screen.queryByText("행 내용")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton-row")).toHaveLength(3);
  });

  it("loading 기본 스켈레톤 행 수는 4개다", () => {
    render(<DescriptionList loading>{null}</DescriptionList>);
    expect(screen.getAllByTestId("skeleton-row")).toHaveLength(4);
  });
});
