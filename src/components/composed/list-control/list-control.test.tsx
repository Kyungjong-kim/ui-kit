import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListControl } from "./list-control";

describe("ListControl", () => {
  it("count를 '총 N건' 형태로 렌더한다", () => {
    render(<ListControl count={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("천 단위 구분 기호를 적용한다", () => {
    render(<ListControl count={1234} />);
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("countUnit으로 접미사를 바꾼다", () => {
    const { container } = render(<ListControl count={5} countUnit="개" />);
    expect(container.textContent).toContain("개");
    expect(container.textContent).not.toContain("건");
  });

  it("search 슬롯을 렌더한다", () => {
    render(<ListControl search={<input data-testid="search" />} />);
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("sort·filter 슬롯을 렌더한다", () => {
    render(
      <ListControl
        sort={<button type="button">정렬</button>}
        filter={<button type="button">필터</button>}
      />,
    );
    expect(screen.getByText("정렬")).toBeInTheDocument();
    expect(screen.getByText("필터")).toBeInTheDocument();
  });
});
