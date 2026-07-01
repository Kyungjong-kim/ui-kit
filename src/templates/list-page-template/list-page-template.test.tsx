import type { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListPageTemplate } from "./list-page-template";

interface Row {
  id: string;
  name: string;
}

const columns: ColumnDef<Row, unknown>[] = [{ accessorKey: "name", header: "이름" }];
const data: Row[] = [
  { id: "1", name: "김철수" },
  { id: "2", name: "이영희" },
];

describe("ListPageTemplate", () => {
  it("제목과 데이터 행을 렌더한다", () => {
    render(<ListPageTemplate title="사용자 목록" columns={columns} data={data} />);
    expect(screen.getByText("사용자 목록")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getByText("이영희")).toBeInTheDocument();
  });

  it("count 지정 시 ListControl에 개수를 표시한다", () => {
    render(<ListPageTemplate title="목록" count={42} columns={columns} data={data} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("검색·필터·정렬 슬롯을 렌더한다", () => {
    render(
      <ListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        search={<input data-testid="search" />}
        filter={<button type="button">필터</button>}
        sort={<button type="button">정렬</button>}
      />,
    );
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByText("필터")).toBeInTheDocument();
    expect(screen.getByText("정렬")).toBeInTheDocument();
  });

  it("headerActions 슬롯을 헤더에 렌더한다", () => {
    render(
      <ListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        headerActions={<button type="button">추가</button>}
      />,
    );
    expect(screen.getByText("추가")).toBeInTheDocument();
  });

  it("빈 데이터 시 emptyContent를 렌더한다", () => {
    render(
      <ListPageTemplate
        title="목록"
        columns={columns}
        data={[]}
        emptyContent={<div>데이터 없음</div>}
      />,
    );
    expect(screen.getByText("데이터 없음")).toBeInTheDocument();
  });
});
