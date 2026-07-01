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
});
