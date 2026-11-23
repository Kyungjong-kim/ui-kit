import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table, type TableColumn } from "./table";

interface Row {
  name: string;
  age: number;
}

const columns: TableColumn<Row>[] = [
  { key: "name", header: "이름" },
  { key: "age", header: "나이" },
];

const data: Row[] = [
  { name: "홍길동", age: 30 },
  { name: "김철수", age: 25 },
];

describe("Table", () => {
  it("헤더를 렌더한다", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("나이")).toBeInTheDocument();
  });

  it("data 행을 렌더한다", () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2 body
  });

  it("render 함수로 셀을 커스터마이징한다", () => {
    const custom: TableColumn<Row>[] = [
      { key: "name", header: "이름", render: (row) => `Mr. ${row.name}` },
    ];
    render(<Table columns={custom} data={data} />);
    expect(screen.getByText("Mr. 홍길동")).toBeInTheDocument();
  });

  it("data가 비면 기본 빈 상태 메시지를 렌더한다", () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("emptyMessage로 빈 상태 문구를 재정의한다", () => {
    render(<Table columns={columns} data={[]} emptyMessage="결과 없음" />);
    expect(screen.getByText("결과 없음")).toBeInTheDocument();
  });

  it("DataTable 과 같은 규격: 테두리 12px 래퍼·회색 헤더·토큰 여백·typography (raw text-sm·px-4 없음)", () => {
    const { container } = render(<Table columns={columns} data={data} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("rounded-md", "border");
    const th = container.querySelector("th") as HTMLElement;
    expect(th).toHaveClass("typography-label-sm-medium", "px-inline-lg", "py-stack-md");
    expect(th.closest("tr")?.className).toMatch(/color-bg-secondary/);
    const td = container.querySelector("td") as HTMLElement;
    expect(td).toHaveClass("typography-body-sm-base", "px-inline-lg");
    expect(container.innerHTML).not.toMatch(/text-sm|px-4|font-semibold/);
  });
});
