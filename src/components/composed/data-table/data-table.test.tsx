import type { ColumnDef } from "@tanstack/react-table";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./data-table";

interface Row {
  id: string;
  name: string;
  age: number;
}

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "age", header: "나이" },
];

const data: Row[] = [
  { id: "1", name: "김철수", age: 30 },
  { id: "2", name: "이영희", age: 25 },
];

describe("DataTable", () => {
  it("헤더를 렌더한다", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("나이")).toBeInTheDocument();
  });

  it("행 데이터를 렌더한다", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getByText("이영희")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("데이터 개수만큼 바디 행을 렌더한다", () => {
    const { container } = render(<DataTable data={data} columns={columns} />);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(2);
  });

  it("빈 데이터면 데이터 행 대신 빈 상태 한 줄만 렌더한다", () => {
    const { container } = render(<DataTable data={[]} columns={columns} />);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("enableSorting이 없으면 헤더에 정렬 버튼이 없다", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("숫자 헤더 클릭 시 내림차순 정렬한다(desc-first)", () => {
    const { container } = render(<DataTable data={data} columns={columns} enableSorting />);
    fireEvent.click(screen.getByRole("button", { name: /나이/ }));
    const firstRow = container.querySelector("tbody tr") as HTMLElement;
    // 숫자 컬럼 desc-first → 첫 행 = 30(김철수)
    expect(within(firstRow).getByText("김철수")).toBeInTheDocument();
  });

  it("재클릭 시 오름차순으로 토글하고 aria-sort를 반영한다", () => {
    const { container } = render(<DataTable data={data} columns={columns} enableSorting />);
    const ageButton = screen.getByRole("button", { name: /나이/ });
    fireEvent.click(ageButton); // desc
    fireEvent.click(ageButton); // asc
    const ageHeader = screen.getByRole("columnheader", { name: /나이/ });
    expect(ageHeader).toHaveAttribute("aria-sort", "ascending");
    const firstRow = container.querySelector("tbody tr") as HTMLElement;
    expect(within(firstRow).getByText("이영희")).toBeInTheDocument();
  });

  it("pageSize 지정 시 페이지당 행 수를 제한한다", () => {
    const many: Row[] = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      name: `사용자${i}`,
      age: 20 + i,
    }));
    const { container } = render(<DataTable data={many} columns={columns} pageSize={2} />);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(2);
    expect(screen.getByRole("navigation", { name: "페이지 네비게이션" })).toBeInTheDocument();
  });

  it("다음 페이지로 이동하면 다음 행을 렌더한다", () => {
    const many: Row[] = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      name: `사용자${i}`,
      age: 20 + i,
    }));
    render(<DataTable data={many} columns={columns} pageSize={2} />);
    fireEvent.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByText("사용자2")).toBeInTheDocument();
    expect(screen.queryByText("사용자0")).not.toBeInTheDocument();
  });

  it("loading이면 스켈레톤 행을 렌더하고 데이터는 숨긴다", () => {
    const { container } = render(<DataTable data={data} columns={columns} loading />);
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
    expect(screen.queryByText("김철수")).not.toBeInTheDocument();
  });

  it("빈 데이터면 기본 EmptyState를 렌더한다", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("emptyContent를 지정하면 그것을 렌더한다", () => {
    render(<DataTable data={[]} columns={columns} emptyContent={<div>커스텀 빈 상태</div>} />);
    expect(screen.getByText("커스텀 빈 상태")).toBeInTheDocument();
    expect(screen.queryByText("데이터가 없습니다")).not.toBeInTheDocument();
  });

  it("enableRowSelection이면 선택 체크박스를 렌더한다", () => {
    render(<DataTable data={data} columns={columns} enableRowSelection />);
    expect(screen.getByLabelText("전체 선택")).toBeInTheDocument();
    expect(screen.getAllByLabelText("행 선택")).toHaveLength(2);
  });

  it("행 선택 시 onRowSelectionChange로 선택 행을 전달한다", () => {
    const onChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        enableRowSelection
        onRowSelectionChange={onChange}
      />,
    );
    fireEvent.click(screen.getAllByLabelText("행 선택")[0]);
    expect(onChange).toHaveBeenLastCalledWith([data[0]]);
  });

  it("전체 선택 시 모든 행을 전달한다", () => {
    const onChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        enableRowSelection
        onRowSelectionChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("전체 선택"));
    expect(onChange).toHaveBeenLastCalledWith(data);
  });
});
